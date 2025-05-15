/**
 * @property {string} chainID - The concatenation of the namespace and the reference (namespace + ":" + reference).
 * @property {string} namespace - The class of chain. It acts as a resolution to the chain's reference.
 * @property {string} reference - A unique identifier for the chain within the namespace. For AVM chains, this is the
 * first 32 characters of the base64 encoded genesis hash.
 * @see {@link https://chainagnostic.org/CAIPs/caip-2}
 */
interface CAIP002 {
  chainID: string;
  namespace: string;
  reference: string;
}

export default CAIP002;
