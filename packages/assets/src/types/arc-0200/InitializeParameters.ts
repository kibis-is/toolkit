import type { ChainWithNetworkParameters } from '@kibisis/chains';

/**
 * @property {bigint} appID - The application ID.
 * @property {ChainWithNetworkParameters} chain - The chain configuration.
 * @property {boolean} debug - [optional] Logs debug information. Defaults to `false`.
 */
interface InitializeParameters {
  appID: bigint;
  chain: ChainWithNetworkParameters;
  debug?: boolean;
}

export default InitializeParameters;
