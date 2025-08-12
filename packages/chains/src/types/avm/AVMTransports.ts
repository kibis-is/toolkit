// types
import type AVMNodeCollection from './AVMNodeCollection';

/**
 * @property {AVMNodeCollection} algods - A collection of Algod nodes.
 * @property {AVMNodeCollection} indexers - [optional] A collection of Indexer nodes.
 */
interface AVMTransports {
  algods: AVMNodeCollection;
  indexers?: AVMNodeCollection;
}

export default AVMTransports;
