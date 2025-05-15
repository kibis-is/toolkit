// types
import type Node from './Node';

/**
 * @property {number} default - The index of the default node.
 * @property {[Node, ...Node[]]} nodes - A list of nodes.
 */
interface NodeCollection {
  default: number;
  nodes: [Node, ...Node[]];
}

export default NodeCollection;
