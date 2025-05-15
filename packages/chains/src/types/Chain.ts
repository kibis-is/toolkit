// types
import type NativeCurrency from './NativeCurrency';
import type NodeCollection from './NodeCollection';

/**
 * @property {NodeCollection} algods - A collection of Algod nodes.
 * @property {string} displayName - A human-readable name for the chain.
 * @property {NodeCollection} indexers - [optional] A collection of Indexer nodes.
 * @property {boolean} isTestnet - Whether this chain is considered a testnet.
 * @property {NativeCurrency} nativeCurrency - [optional] Details relating to the native currency of the chain.
 */
interface Chain {
  algods: NodeCollection;
  displayName: string;
  indexers?: NodeCollection;
  isTestnet: boolean;
  nativeCurrency?: NativeCurrency;
}

export default Chain;
