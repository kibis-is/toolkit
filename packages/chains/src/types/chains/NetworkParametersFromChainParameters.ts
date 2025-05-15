// types
import type Chain from './Chain';

/**
 * @property {Chain} chain - The chain information.
 * @property {string} namespace - The class of chain. It acts as a resolution to the chain's reference.
 */
interface NetworkParametersFromChainParameters {
  chain: Chain;
  namespace: string;
}

export default NetworkParametersFromChainParameters;
