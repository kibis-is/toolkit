// types
import type { CAIP002, CAIP002FromGenesisHashParameters } from '@/types';

// utilities
import caip002ReferenceFromGenesisHash from './caip002ReferenceFromGenesisHash';

/**
 * Creates a CAIP-002 from a genesis hash and namespace.
 * @param {CAIP002FromGenesisHashParameters} params - The chain genesis hash and the namespace.
 * @returns {CAIP002} A CAIP-002 that contains the namespace, reference and chain ID.
 */
export default function caip002FromGenesisHash({ genesisHash, namespace }: CAIP002FromGenesisHashParameters): CAIP002 {
  const reference = caip002ReferenceFromGenesisHash(genesisHash);

  return {
    chainID: `${namespace}:${reference}`,
    namespace,
    reference,
  };
}
