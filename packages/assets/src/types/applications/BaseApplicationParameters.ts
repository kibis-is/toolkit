import type { ChainWithNetworkParameters } from '@kibisis/chains';
import type { ILogger } from '@kibisis/utilities';
import algosdk from 'algosdk';

/**
 * @property {algosdk.ABIContract} abi - The transformed ABI.
 * @property {bigint} appID - The application ID.
 * @property {Uint8Array} approvalProgram - The application approval TEAL code.
 * @property {ChainWithNetworkParameters} chain - The chain configuration.
 * @property {Uint8Array} clearProgram - The application clear TEAL code.
 * @property {ILogger} logger - An initialized logger.
 */
interface BaseApplicationParameters {
  abi: algosdk.ABIContract;
  appID: bigint;
  approvalProgram: Uint8Array;
  chain: ChainWithNetworkParameters;
  clearProgram: Uint8Array;
  logger: ILogger;
}

export default BaseApplicationParameters;
