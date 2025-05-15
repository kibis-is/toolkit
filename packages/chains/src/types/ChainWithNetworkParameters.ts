// types
import type CAIP002 from './CAIP002';
import type Chain from './Chain';

/**
 * @property {CAIP002} caip002 - Identifies the chain that conforms to CAIP-002.
 * @property {string} feeSinkAddress - The fee sink address.
 * @property {string} genesisHash - A base64 encoded hash of the genesis block.
 * @property {string} genesisID - A human-readable identifier for the network.
 */
interface ChainWithNetworkParameters extends Chain {
  caip002: CAIP002;
  feeSinkAddress: string;
  genesisHash: string;
  genesisID: string;
}

export default ChainWithNetworkParameters;
