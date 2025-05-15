// types
import type { Node, NodeCollection } from '@/types';

/**
 * Returns the default node from the provided node collection.
 * @param {NodeCollection} nodeCollection - The collection of nodes containing a default node identifier.
 * @returns {Node} The default node from the node collection.
 */
export default function defaultNode(nodeCollection: NodeCollection): Node {
  return nodeCollection.nodes[nodeCollection.default];
}
