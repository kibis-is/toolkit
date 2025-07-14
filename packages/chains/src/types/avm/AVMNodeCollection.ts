// types
import type AVMNode from './AVMNode';

/**
 * @property {number} default - The index of the default node.
 * @property {[AVMNode, ...AVMNode[]]} nodes - A list of nodes.
 */
interface AVMNodeCollection {
  default: number;
  nodes: [AVMNode, ...AVMNode[]];
}

export default AVMNodeCollection;
