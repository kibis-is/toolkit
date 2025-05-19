import type { ChainWithNetworkParameters } from '@kibisis/chains';

/**
 * @property {ChainWithNetworkParameters} chain - The chain configuration.
 * @property {boolean} debug - [optional] Logs debug information. Defaults to `false`.
 * @property {bigint} decimals - The number of decimals for this asset.
 * @property {string} name - The name of the asset.
 * @property {Uint8Array} signer - The private key of the account that will be used to deploy the asset.
 * @property {string} symbol - The symbol of the asset.
 * @property {bigint} totalSupply - The total supply of the asset.
 */
interface CreateParameters {
  chain: ChainWithNetworkParameters;
  debug?: boolean;
  decimals: bigint;
  name: string;
  signer: Uint8Array;
  symbol: string;
  totalSupply: bigint;
}

export default CreateParameters;
