/**
 * @property {bigint} amount - The amount to transfer. This **MUST** be in the atomic form of the asset.
 * @property {string} authAddress - [optional] For re-keyed accounts, this is the address of the account that was
 * re-keyed to - the authorized address.
 * @property {string} note - [optional] A note that will appear on the application call transfer transaction.
 * @property {string} receiver - The address of the account that will receive the asset.
 * @property {string} sender - The address of the account that will send the asset.
 */
interface TransferParameters {
  amount: bigint;
  authAddress?: string;
  note?: string;
  receiver: string;
  sender: string;
  privateKey: Uint8Array;
}

export default TransferParameters;
