import { defaultNode } from '@kibisis/chains';
import { createLogger } from '@kibisis/utilities';
import { decode as decodeBase64 } from '@stablelib/base64';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import algosdk from 'algosdk';
import { sign, type SignKeyPair } from 'tweetnacl';

// abis
import abi from '@/abis/arc0200.abi.json';

// artifacts
import approvalProgram from '@/artifacts/arc-0200/approval.teal?raw';
import clearProgram from '@/artifacts/arc-0200/clear.teal?raw';

// contracts
import BaseApplication from './BaseApplication';

// errors
import {
  FailedToCompileError,
  InvalidABIError,
  InvalidBoxReferenceError,
  InsufficientBalanceError,
  SendTransactionError,
  SigningError,
} from '@/errors';

// types
import type { AllowanceParameters, CreateParameters, InitializeParameters, TransferParameters } from '@/types';

// utilities
import { calculateMBRForBox, trimNullBytes } from '@/utilities';

export default class ARC0200Asset extends BaseApplication {
  // public static variables
  public static displayName = 'ARC0200Asset';

  /**
   * public static functions
   */

  /**
   *
   * @param {CreateParameters} params - The chain configuration, the signer, the name, the symbol, the decimals,
   * the total supply and the debug flag.
   * @returns {Promise<ARC0200Asset>} A promise that resolves to an instance of the asset.
   * @throws {FailedToCompileError} If there was an issue compiling the TEAL code.
   * @throws {SigningError} If there was an issue signing the transaction.
   * @throws {SendTransactionError} If the create application transaction was rejected by the network or no application
   * ID was returned from the transaction response.
   * @public
   * @static
   */
  public static async create({
    chain,
    debug = false,
    decimals,
    name,
    signer,
    symbol,
    totalSupply,
  }: CreateParameters): Promise<ARC0200Asset> {
    const __logPrefix = `${ARC0200Asset.displayName}#create`;
    const node = defaultNode(chain.algods);
    const algod = new algosdk.Algodv2(node.token ?? '', node.origin, node.port);
    const logger = createLogger(debug ? 'debug' : 'error');
    let compiledApprovalProgramResponse: algosdk.modelsv2.CompileResponse;
    let compiledClearProgramResponse: algosdk.modelsv2.CompileResponse;
    let keyPair: SignKeyPair;
    let signedTransaction: Uint8Array;
    let transaction: algosdk.Transaction;
    let transactionResponse: algosdk.modelsv2.PendingTransactionResponse;

    try {
      compiledApprovalProgramResponse = await algod.compile(approvalProgram).do();
      compiledClearProgramResponse = await algod.compile(clearProgram).do();
    } catch (error) {
      logger.error(`${__logPrefix}:`, error);

      throw new FailedToCompileError('failed to compile the teal code');
    }

    keyPair = sign.keyPair.fromSeed(signer);
    transaction = algosdk.makeApplicationCreateTxnFromObject({
      approvalProgram: decodeBase64(compiledApprovalProgramResponse.result),
      appArgs: [
        encodeUTF8(name),
        encodeUTF8(symbol),
        algosdk.bigIntToBytes(decimals, 1), // uint8
        algosdk.bigIntToBytes(totalSupply, 32), // uint256
      ],
      clearProgram: decodeBase64(compiledClearProgramResponse.result),
      extraPages: 1, // required for box storage used by balances/approvals
      numGlobalByteSlices: 3, // name, symbol, totalSupply
      numGlobalInts: 1, // decimals
      numLocalByteSlices: 0,
      numLocalInts: 0,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      sender: new algosdk.Address(keyPair.publicKey),
      suggestedParams: await algod.getTransactionParams().do(),
    });

    try {
      signedTransaction = transaction.signTxn(keyPair.secretKey);
    } catch (error) {
      logger.error(`${__logPrefix}:`, error);

      throw new SigningError(`failed to sign create application transaction`);
    }

    try {
      await algod.sendRawTransaction(signedTransaction).do();

      transactionResponse = await algosdk.waitForConfirmation(algod, transaction.txID(), 4);
    } catch (error) {
      logger.error(`${__logPrefix}:`, error);

      throw new SendTransactionError(`failed to send transaction`);
    }

    if (!transactionResponse.applicationIndex) {
      throw new SendTransactionError(`no application index returned from transaction response`);
    }

    return new ARC0200Asset({
      abi: new algosdk.ABIContract(abi),
      appID: transactionResponse.applicationIndex,
      approvalProgram: encodeUTF8(approvalProgram),
      chain,
      clearProgram: encodeUTF8(clearProgram),
      logger,
    });
  }

  /**
   * Initializes the asset using the provided application ID and the chain configuration.
   * @param {InitializeParameters} params - The application ID, chain configuration and debug flag.
   * @returns {ARC0200Asset} An instance of the asset.
   * @public
   * @static
   */
  public static initialize({ appID, chain, debug = false }: InitializeParameters): ARC0200Asset {
    return new ARC0200Asset({
      abi: new algosdk.ABIContract(abi),
      appID,
      approvalProgram: encodeUTF8(approvalProgram),
      chain,
      clearProgram: encodeUTF8(clearProgram),
      logger: createLogger(debug ? 'debug' : 'error'),
    });
  }

  /**
   * public functions
   */

  /**
   * Gets the amount that a given spender is authorized to spend of an owner's account.
   * @param {AllowanceParameters} params - The address of owner and the address of the spender.
   * @returns {Promise<bigint>} A promise that resolves to the balance of the account.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @throws {InvalidABIError} If the application didn't return any results.
   * @public
   */
  public async allowance({ owner, spender }: AllowanceParameters): Promise<bigint> {
    const __logPrefix = `${ARC0200Asset.displayName}#allowance`;
    let abiMethod: algosdk.ABIMethod;
    let result: bigint | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_allowance');

      result = await this.read<bigint>({
        abiMethod,
        args: [
          (abiMethod.args[0]?.type as algosdk.ABIAddressType).encode(owner),
          (abiMethod.args[1]?.type as algosdk.ABIAddressType).encode(spender),
        ],
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }

    if (!result) {
      throw new InvalidABIError(`application "${this._appID}" not valid because the result returned "null"`);
    }

    return result;
  }

  /**
   * Gets the balance of the asset for a given address.
   * @param {string} address - The address of the account to check.
   * @returns {Promise<bigint>} A promise that resolves to the balance of the account.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @throws {InvalidABIError} If the application didn't return any results.
   * @public
   */
  public async balanceOf(address: string): Promise<bigint> {
    const __logPrefix = `${ARC0200Asset.displayName}#balanceOf`;
    let abiMethod: algosdk.ABIMethod;
    let result: bigint | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_balanceOf');

      result = await this.read<bigint>({
        abiMethod,
        args: [(abiMethod.args[0]?.type as algosdk.ABIAddressType).encode(address)],
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }

    if (!result) {
      throw new InvalidABIError(`application "${this._appID}" not valid because the result returned "null"`);
    }

    return result;
  }

  /**
   * Builds all the transactions necessary to perform a transfer. If it is the receiver's first time receiving the
   * asset i.e., they have a balance of 0; a payment transaction **MUST** be sent with the application call transaction
   * to pay for the box storage.
   * @param {TransferParameters} params - The amount to transfer, the sender & receiver, the authAddress if the sender
   * has re-keyed and an optional not to send in the application call transaction.
   * @returns {Promise<algosdk.Transaction[]>} A promise that resolves 1-2 transaction. If required, the first
   * transaction will be a payment transaction to pay for the box storage for the receiver account. The last transaction
   * will be the application call to transfer the assets.
   * @throws {InvalidBoxReferenceError} If the box reference for the sender and receiver could not be determined.
   * @public
   */
  public async buildTransferTransactions({
    amount,
    authAddress,
    note,
    receiver,
    sender,
  }: Omit<TransferParameters, 'signer'>): Promise<algosdk.Transaction[]> {
    const __logPrefix = `${ARC0200Asset.displayName}#buildTransferTransactions`;
    let abiMethod: algosdk.ABIMethod;
    let args: Uint8Array[];
    let boxReferences: algosdk.modelsv2.BoxReference[] | null;
    let boxStorageCost: bigint;
    let encodedAmount: Uint8Array;
    let paymentTransaction: algosdk.Transaction | null = null;
    let receiverBalance: bigint;
    let suggestedParams: algosdk.SuggestedParams;
    let transactions: algosdk.Transaction[];
    let writeTransaction: algosdk.Transaction;

    try {
      abiMethod = this._abi.getMethodByName('arc200_transfer');

      encodedAmount = (abiMethod.args[1].type as algosdk.ABIUintType).encode(amount);
      args = [(abiMethod.args[0].type as algosdk.ABIAddressType).encode(receiver), encodedAmount];
      receiverBalance = await this.balanceOf(receiver);
      suggestedParams = await this._algod.getTransactionParams().do();
      boxReferences = await this._determineBoxReferences({
        abiMethod,
        args,
        authAddress,
        sender,
        transactionParams: suggestedParams,
      });

      if (!boxReferences) {
        throw new InvalidBoxReferenceError(
          `failed to get box references for sender "${sender}" and recipient "${receiver}"`
        );
      }

      // if the balance is zero, we will need to create a payment transaction to fund a write operation to the box
      if (receiverBalance <= BigInt(0)) {
        this._logger.debug(`${__logPrefix}: no balance detected, adding payment for box for "${receiver}"`);

        boxStorageCost = calculateMBRForBox(BigInt(boxReferences[0].name.length), BigInt(encodedAmount.length));
        paymentTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          amount: boxStorageCost,
          note: encodeUTF8(`arc-0200:${this._appID}: funding for initial box storage`),
          receiver: this.address(), // send funds to the application account
          sender,
          suggestedParams,
        });
      }

      // create the app write application based on the box storage
      writeTransaction = await this._buildWriteTransaction({
        abiMethod,
        args,
        boxes: boxReferences.map(({ name }: algosdk.modelsv2.BoxReference) => ({
          appIndex: this._appID,
          name,
        })),
        sender,
        transactionParams: suggestedParams,
        ...(note && {
          note: encodeUTF8(note),
        }),
      });
      transactions = [...(paymentTransaction ? [paymentTransaction] : []), writeTransaction];

      // if there is a payment transaction, group them together
      if (transactions.length > 1) {
        algosdk.assignGroupID(transactions);
      }

      return transactions;
    } catch (error) {
      this._logger.debug(`${__logPrefix}:`, error);

      throw error;
    }
  }

  /**
   * Gets the decimals of the asset.
   * @returns {Promise<bigint>} A promise that resolves to the decimals of asset.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @throws {InvalidABIError} If the application didn't return any results.
   * @public
   */
  public async decimals(): Promise<bigint> {
    const __logPrefix = `${ARC0200Asset.displayName}#decimals`;
    let abiMethod: algosdk.ABIMethod;
    let result: bigint | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_decimals');
      result = await this.read<bigint>({
        abiMethod,
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }

    if (!result) {
      throw new InvalidABIError(`application "${this._appID}" not valid because the result returned "null"`);
    }

    return result;
  }

  /**
   * Gets the name of the asset.
   * @returns {Promise<string>} A promise that resolves to the name of the asset.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @throws {InvalidABIError} If the application didn't return any results.
   * @public
   */
  public async name(): Promise<string> {
    const __logPrefix = `${ARC0200Asset.displayName}#name`;
    let abiMethod: algosdk.ABIMethod;
    let result: string | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_name');
      result = await this.read<string>({
        abiMethod,
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }

    if (!result) {
      throw new InvalidABIError(`application "${this._appID}" not valid because the result returned "null"`);
    }

    return trimNullBytes(result);
  }

  /**
   * Gets the symbol of the asset.
   * @returns {Promise<string>} A promise that resolves to the symbol of the asset.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @throws {InvalidABIError} If the application didn't return any results.
   * @public
   */
  public async symbol(): Promise<string> {
    const __logPrefix = `${ARC0200Asset.displayName}#symbol`;
    let abiMethod: algosdk.ABIMethod;
    let result: string | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_symbol');
      result = await this.read<string>({
        abiMethod,
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }

    if (!result) {
      throw new InvalidABIError(`application "${this._appID}" not valid because the result returned "null"`);
    }

    return trimNullBytes(result);
  }

  /**
   * Gets the total supply of the asset.
   * @returns {bigint} A promise that resolves to the total supply of the asset.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @throws {InvalidABIError} If the application didn't return any results.
   * @public
   */
  public async totalSupply(): Promise<bigint> {
    const __logPrefix = `${ARC0200Asset.displayName}#totalSupply`;
    let abiMethod: algosdk.ABIMethod;
    let result: bigint | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_totalSupply');
      result = await this.read<bigint>({
        abiMethod,
      });
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw error;
    }

    if (!result) {
      throw new InvalidABIError(`application "${this._appID}" not valid because the result returned "null"`);
    }

    return result;
  }

  /**
   * Transfers the specified amount from the sender to the receiver.
   * @param {TransferParameters} params - The amount to transfer, the sender & receiver, the
   * authAddress if the sender has re-keyed and an optional not to send in the application call transaction.
   * @returns {Promise<[string, ...string[]]>} A promise that resolves 1-2 transaction IDs. If required, the first
   * transaction will be a payment transaction to pay for the box storage for the receiver account. The last transaction
   * will be the application call to transfer the assets.
   * @throws {InsufficientBalanceError} If the sender is attempting to send more than their balance.
   * @throws {InvalidABIError} If the application didn't return any results from the balance operation.
   * @throws {InvalidBoxReferenceError} If the box reference for the sender and receiver could not be determined.
   * @throws {SigningError} If there was an issue signing the transaction(s).
   * @throws {SendTransactionError} If the transaction(s) failed to be accepted by the network.
   * @public
   */
  public async transfer({ signer, ...transactionParams }: TransferParameters): Promise<[string, ...string[]]> {
    const __logPrefix = `${ARC0200Asset.displayName}#transfer`;
    const balance = await this.balanceOf(transactionParams.sender);
    const transactions: algosdk.Transaction[] = await this.buildTransferTransactions(transactionParams);
    let keyPair: SignKeyPair;
    let signedTransactions: Uint8Array[];

    if (balance < transactionParams.amount) {
      throw new InsufficientBalanceError(
        `sender "${transactionParams.sender}" has insufficient balance to complete transfer, trying to send "${transactionParams.amount}" but only has "${balance}"`
      );
    }

    try {
      keyPair = sign.keyPair.fromSeed(signer);
      signedTransactions = transactions.map((transaction) => transaction.signTxn(keyPair.secretKey));
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw new SigningError(`failed to sign "${transactions.length}" transaction(s)`);
    }

    try {
      await this._algod.sendRawTransaction(signedTransactions).do();
      await algosdk.waitForConfirmation(this._algod, transactions[transactions.length - 1].txID(), 4);
    } catch (error) {
      this._logger.error(`${__logPrefix}:`, error);

      throw new SendTransactionError(`failed to send "${transactions.length}" transaction(s)`);
    }

    return transactions.map((transaction) => transaction.txID()) as [string, ...string[]];
  }
}
