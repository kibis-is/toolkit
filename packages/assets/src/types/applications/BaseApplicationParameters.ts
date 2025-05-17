import type { ChainWithNetworkParameters } from '@kibisis/chains';
import algosdk from 'algosdk';

/**
 * @property {algosdk.ABIContract} abi - The transformed ABI.
 * @property {bigint} appID - The application ID.
 * @property {ChainWithNetworkParameters} chain - The chain configuration.
 * @property {boolean} debug - [optional] Logs debug information. Defaults to `false`.
 */
interface BaseApplicationParameters {
  abi: algosdk.ABIContract;
  appID: bigint;
  chain: ChainWithNetworkParameters;
  debug?: boolean;
}

export default BaseApplicationParameters;
