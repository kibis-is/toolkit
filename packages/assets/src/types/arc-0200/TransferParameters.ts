/**
 * @property {bigint} amount - The amount to transfer. This **MUST** be in the atomic form of the asset.
 * @property {string} authAddress - [optional] For re-keyed accounts, this is the address of the account that was
 * re-keyed to - the authorized address.
 * @property {string} note - [optional] A note that will appear on the application call transfer transaction.
 * @property {string} receiver - The address of the account that will receive the asset.
 * @property {string} sender - The address of the account that will send the asset.
 * @property {Uint8Array} signer - The private key of the signer. This **SHOULD** be the private key of the sender, but
 * if the authAddress is provided, this **MUST** be the private key of the authorized address.
 */
interface TransferParameters {
  amount: bigint;
  authAddress?: string;
  note?: string;
  receiver: string;
  sender: string;
  signer: Uint8Array;
}

export default TransferParameters;
