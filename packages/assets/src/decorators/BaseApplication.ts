import { type ChainWithNetworkParameters, defaultNode } from '@kibisis/chains';
import { createLogger, type ILogger } from '@kibisis/utilities';
import { decode as decodeUTF8 } from '@stablelib/utf8';
import algosdk from 'algosdk';

// errors
import { ABIReadError } from '@/errors';

// types
import type {
  ABIResult,
  BaseApplicationCallParameters,
  BaseApplicationParameters,
  BuildWriteApplicationTransactionParameters,
  DetermineBoxReferenceParameters,
  ParseTransactionResponseParameters,
  SimulateTransaction,
} from '@/types';

export default class BaseApplication {
  // protected static variables
  protected static _simulationFee = 1000; // in microalgos
  // public static variables
  public static displayName = 'BaseApplication';
  // protected variables
  protected _algod: algosdk.Algodv2;
  protected _abi: algosdk.ABIContract;
  protected _appID: bigint;
  protected _chain: ChainWithNetworkParameters;
  protected readonly _logger: ILogger;

  protected constructor({ abi, appID, chain, debug = false }: BaseApplicationParameters) {
    const algod = defaultNode(chain.algods);

    this._abi = abi;
    this._algod = new algosdk.Algodv2(algod.token ?? '', algod.origin, algod.port);
    this._appID = appID;
    this._chain = chain;
    this._logger = createLogger(debug ? 'debug' : 'error');
  }

  /**
   * protected functions
   */

  /**
   * Builds a read transaction. This transaction is actually a dummy transaction that will be used in a simulate
   * transaction request to read the logs.
   * @param {BaseApplicationCallParameters} params - The ABI method, the app call args and any transaction params.
   * @returns {Promise<algosdk.Transaction>} A promise that resolves to a read transaction.
   * @protected
   */
  protected async _buildReadTransaction({
    args,
    abiMethod,
    transactionParams,
  }: BaseApplicationCallParameters): Promise<algosdk.Transaction> {
    const suggestedParams = transactionParams ?? (await this._algod.getTransactionParams().do());

    return algosdk.makeApplicationNoOpTxnFromObject({
      sender: this._chain.feeSinkAddress, // use the fee sink address as it is guaranteed to have a balance
      appArgs: [
        abiMethod.getSelector(), // the first argument is the method name
        ...(args ? args : []), // the method parameters
      ],
      appIndex: this._appID,
      suggestedParams: {
        ...suggestedParams,
        fee: BaseApplication._simulationFee,
        flatFee: true,
      },
    });
  }

  /**
   * Builds a write transaction.
   * @param {BaseApplicationCallParameters} params - The ABI method, the app call args, the sender, a note, any boxes
   * that will be accessed and any transaction params.
   * @returns {Promise<algosdk.Transaction>} A promise that resolves to a write transaction.
   * @protected
   */
  protected async _buildWriteTransaction({
    abiMethod,
    args,
    boxes,
    note,
    sender,
    transactionParams,
  }: BuildWriteApplicationTransactionParameters): Promise<algosdk.Transaction> {
    const suggestedParams = transactionParams ?? (await this._algod.getTransactionParams().do());

    return algosdk.makeApplicationNoOpTxnFromObject({
      appArgs: [
        abiMethod.getSelector(), // the first argument is the method name
        ...(args ? args : []), // the method parameters
      ],
      appIndex: this._appID,
      boxes,
      note,
      sender,
      suggestedParams,
    });
  }

  /**
   * Determines the required boxes that would need to be accessed for the application write call.
   *
   * It sends a simulate request, without any box references, and the response should contain the boxes that were
   * attempted to be accessed.
   * @param {DetermineBoxReferenceParameters} - The application call details, the sender, any authorized address (if
   * the sender's account was re-keyed) and transaction params.
   * @returns {Promise<algosdk.modelsv2.BoxReference[] | null>} A promise that resolves to the required box references.
   * @protected
   */
  protected async _determineBoxReferences({
    abiMethod,
    args,
    authAddress,
    sender,
    transactionParams,
  }: DetermineBoxReferenceParameters): Promise<algosdk.modelsv2.BoxReference[] | null> {
    const __logPrefix = `${BaseApplication.displayName}#_determineBoxReferences`;
    let response: algosdk.modelsv2.SimulateResponse;

    try {
      response = await this._simulateTransactions([
        {
          abiMethod,
          authAddress,
          transaction: await this._buildWriteTransaction({
            abiMethod,
            args,
            sender,
            transactionParams,
          }),
        },
      ]);

      return response.txnGroups[0].unnamedResourcesAccessed?.boxes || null;
    } catch (error) {
      this._logger.debug(`${__logPrefix}:`, error);

      throw error;
    }
  }

  /**
   * Extracts the log from the transaction response and parses it to the appropriate type.
   * @param {ParseTransactionResponseParameters} params -
   * @returns {ABIResult | null} The parsed response or null if the logs were not present, the method returns void or if
   * the return type is not recognized.
   * @protected
   */
  protected _parseTransactionResponse<Result = ABIResult>({
    abiMethod,
    response,
  }: ParseTransactionResponseParameters): Result | null {
    const __logPrefix = `${BaseApplication.name}#_parseTransactionResponse`;
    const log = response.logs?.pop() || null; // get the first log
    let trimmedLog: Uint8Array;
    let type: string;

    if (!log) {
      this._logger.debug(
        `${BaseApplication.name}#${__logPrefix}: no log found for application "${this._appID}" and method "${abiMethod.name}"`
      );

      return null;
    }

    trimmedLog = log.slice(4); // remove the prefix

    // if the abi is not expecting a return
    if (abiMethod.returns.type === 'void') {
      return null;
    }

    type = (abiMethod.returns.type as algosdk.ABIType).toString();

    // if we have an address, return as a string
    if (type.includes('address')) {
      return abiMethod.returns.type.decode(trimmedLog) as Result;
    }

    // if we have bytes, return as a string
    if (type.includes('byte')) {
      return decodeUTF8(trimmedLog) as Result;
    }

    // if we have a uint, decode as a bignumber
    if (type.includes('uint')) {
      return abiMethod.returns.type.decode(trimmedLog) as Result;
    }

    return null;
  }

  /**
   * Simulates app call transactions that read the logs and parses the responses. This is used to read data from an
   * application.
   * @param {SimulateTransaction[]} transactions - The transactions to simulate.
   * @returns {Promise<algosdk.modelsv2.SimulateResponse>} A promise that returns the simulated transactions.
   * @protected
   */
  protected async _simulateTransactions(
    transactions: SimulateTransaction[]
  ): Promise<algosdk.modelsv2.SimulateResponse> {
    const _transactions = transactions.map((value) => value.transaction);
    let request: algosdk.modelsv2.SimulateRequest;

    algosdk.assignGroupID(_transactions);

    request = new algosdk.modelsv2.SimulateRequest({
      allowUnnamedResources: true,
      allowEmptySignatures: true,
      txnGroups: [
        new algosdk.modelsv2.SimulateRequestTransactionGroup({
          txns: _transactions.map((value, index) => {
            const authAddress = transactions[index].authAddress;

            return new algosdk.SignedTransaction({
              txn: value,
              ...(authAddress && {
                sgnr: algosdk.decodeAddress(authAddress),
              }),
            });
          }),
        }),
      ],
    });

    return await this._algod.simulateTransactions(request).do();
  }

  /**
   * public functions
   */

  /**
   * Gets the account information for the account associated with the application.
   * @returns {Promise<algosdk.modelsv2.Account>} The application's account information.
   * @public
   */
  public async accountInformation(): Promise<algosdk.modelsv2.Account> {
    return await this._algod.accountInformation(this.address()).do();
  }

  /**
   * Gets the account address associated with the application.
   * @returns {string} The base32 encoded address for the application.
   * @public
   */
  public address(): string {
    return algosdk.getApplicationAddress(this._appID).toString();
  }

  /**
   * Gets the application ID.
   * @return {bigint} The application ID.
   * @public
   */
  public appID(): bigint {
    return this._appID;
  }

  public async boxByName(name: Uint8Array): Promise<algosdk.modelsv2.Box | null> {
    const __logPrefix = `${BaseApplication.displayName}#boxByName`;

    try {
      return await this._algod.getApplicationBoxByName(this._appID, name).do();
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      return null;
    }
  }

  /**
   * Reads a method and returns the result.
   *
   * This uses a simulated transaction to read the application logs for the method allowing read methods to be achieved
   * without paying a fee.
   * @param {BaseApplicationCallParameters} params - The ABI method and any arguments.
   * @returns {Promise<ABIResult | null>} A promise that resolves to the expected response or null.
   * @throws {ABIReadError} If there was error while simulating a transaction.
   * @public
   */
  public async read<Result = ABIResult>(params: BaseApplicationCallParameters): Promise<Result | null> {
    const __logPrefix = `${BaseApplication.displayName}#read`;
    let response: algosdk.modelsv2.SimulateResponse;
    let transaction: algosdk.Transaction;

    try {
      transaction = await this._buildReadTransaction(params);
      response = await this._simulateTransactions([
        {
          abiMethod: params.abiMethod,
          transaction,
        },
      ]);

      this._logger.debug(
        `${__logPrefix}: response from application "${this._appID}" and method "${params.abiMethod.name}" - `,
        response
      );

      if (response.txnGroups[0].failureMessage) {
        this._logger.debug(
          `${__logPrefix}: failed to send a simulate transaction for application "${this._appID}" and method "${params.abiMethod.name}"`
        );

        throw new ABIReadError(response.txnGroups[0].failureMessage);
      }

      return this._parseTransactionResponse({
        abiMethod: params.abiMethod,
        response: response.txnGroups[0].txnResults[0].txnResult,
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }
  }
}
