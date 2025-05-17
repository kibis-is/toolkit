import { encode as encodeUTF8 } from '@stablelib/utf8';
import algosdk from 'algosdk';

// abis
import abi from '@/abis/arc0200.abi.json';

// contracts
import BaseApplication from './BaseApplication';

// errors
import { InvalidABIError, InvalidBoxReferenceError, SendTransactionError, SigningError } from '@/errors';

// types
import type { BaseApplicationParameters, TransferParameters } from '@/types';

// utilities
import { calculateMBRForBox, trimNullBytes } from '@/utilities';

export default class ARC0200Asset extends BaseApplication {
  // public static variables
  public static displayName = 'ARC0200Asset';

  private constructor(params: Omit<BaseApplicationParameters, 'abi'>) {
    super({
      ...params,
      abi: new algosdk.ABIContract(abi),
    });
  }

  /**
   * public static functions
   */

  /**
   * Initializes the asset using the provided application ID and the chain configuration.
   * @param params
   */
  public static initialize(params: Omit<BaseApplicationParameters, 'abi'>): ARC0200Asset {
    return new ARC0200Asset(params);
  }

  /**
   * public functions
   */

  /**
   * Gets the balance of the asset for a given address.
   * @param {string} address - The address of the account to check.
   * @returns {Promise<bigint>} A promise that resolves to the balance of the account.
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
   * @public
   */
  public async balanceOf(address: string): Promise<bigint> {
    const __logPrefix = `${ARC0200Asset.displayName}#balanceOf`;
    let abiAddressArgType: algosdk.ABIType | null;
    let abiMethod: algosdk.ABIMethod;
    let result: bigint | null;

    try {
      abiMethod = this._abi.getMethodByName('arc200_balanceOf');
      abiAddressArgType = abiMethod.args[0]?.type as algosdk.ABIType;

      // if the first arg, owner, is not an address
      if (!abiAddressArgType || abiAddressArgType.toString() !== 'address') {
        throw new InvalidABIError(
          `application "${this._appID}" not valid as method "${abiMethod.name}" has an invalid "owner" parameter`
        );
      }

      result = await this.read<bigint>({
        abiMethod,
        args: [abiAddressArgType.encode(address)],
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
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {InvalidBoxReferenceError} If the box reference for the sender and receiver could not be determined.
   * @public
   */
  public async buildTransferTransactions({
    amount,
    authAddress,
    note,
    receiver,
    sender,
  }: Omit<TransferParameters, 'privateKey'>): Promise<algosdk.Transaction[]> {
    const __logPrefix = `${ARC0200Asset.displayName}#buildTransferTransactions`;
    let abiMethod: algosdk.ABIMethod;
    let args: Uint8Array[];
    let boxReferences: algosdk.modelsv2.BoxReference[] | null;
    let boxStorageCost: bigint;
    let encodedAmount: Uint8Array;
    let encodedReceiver: Uint8Array;
    let paymentTransaction: algosdk.Transaction | null = null;
    let receiverBalance: bigint;
    let suggestedParams: algosdk.SuggestedParams;
    let transactions: algosdk.Transaction[];
    let writeTransaction: algosdk.Transaction;

    try {
      abiMethod = this._abi.getMethodByName('arc200_transfer');

      // check the "to" arg
      if (!abiMethod.args[0] || abiMethod.args[0].type.toString() !== 'address') {
        throw new InvalidABIError(
          `application "${this._appID}" not valid as method "${abiMethod.name}" has an invalid "to" type`
        );
      }

      // check the "value" arg
      if (!abiMethod.args[1] || abiMethod.args[1].type.toString() !== 'uint256') {
        throw new InvalidABIError(
          `application "${this._appID}" not valid as method "${abiMethod.name}" has an invalid "value" type`
        );
      }

      encodedAmount = (abiMethod.args[1].type as algosdk.ABIType).encode(amount);
      encodedReceiver = (abiMethod.args[0].type as algosdk.ABIType).encode(receiver);
      args = [encodedReceiver, encodedAmount];
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
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
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
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
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
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
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
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {ABIReadError} If there was error while simulating a transaction to read.
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
   * @throws {InvalidABIError} If the ABI is invalid or the method does not conform to the ABI.
   * @throws {InvalidBoxReferenceError} If the box reference for the sender and receiver could not be determined.
   * @throws {SigningError} If there was an issue signing the transaction(s).
   * @public
   */
  public async transfer({ privateKey, ...transactionParams }: TransferParameters): Promise<[string, ...string[]]> {
    const __logPrefix = `${ARC0200Asset.displayName}#transfer`;
    const transactions: algosdk.Transaction[] = await this.buildTransferTransactions(transactionParams);
    let signedTransactions: Uint8Array[];

    try {
      signedTransactions = transactions.map((transaction) => transaction.signTxn(privateKey));
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
