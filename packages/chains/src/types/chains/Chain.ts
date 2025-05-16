// types
import type { NativeCurrency, NodeCollection } from '@/types';

/**
 * @property {Record<'namespace', string>} caip002 - The CAIP-002 identifier for the family of chains.
 * @property {NodeCollection} algods - A collection of Algod nodes.
 * @property {string} displayName - A human-readable name for the chain.
 * @property {NodeCollection} indexers - [optional] A collection of Indexer nodes.
 * @property {boolean} isTestnet - Whether this chain is considered a testnet.
 * @property {NativeCurrency} nativeCurrency - [optional] Details relating to the native currency of the chain.
 */
interface Chain {
  caip002: Record<'namespace', string>;
  algods: NodeCollection;
  displayName: string;
  indexers?: NodeCollection;
  isTestnet: boolean;
  nativeCurrency?: NativeCurrency;
}

export default Chain;
