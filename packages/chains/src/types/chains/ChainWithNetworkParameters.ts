// types
import type { CAIP002, Chain } from '@/types';

/**
 * @property {CAIP002} caip002 - Identifies the network and conforms to CAIP-002.
 * @property {bigint} fee - The current fee for the network.
 * @property {string} feeSinkAddress - The fee sink address.
 * @property {string} genesisHash - A base64 encoded hash of the genesis block.
 * @property {string} genesisID - A human-readable identifier for the network.
 */
interface ChainWithNetworkParameters extends Chain {
  caip002: CAIP002;
  fee: bigint;
  feeSinkAddress: string;
  genesisHash: string;
  genesisID: string;
}

export default ChainWithNetworkParameters;
