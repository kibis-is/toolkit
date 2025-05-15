/**
 * @property {string} namespace - The class of chain. It acts as a resolution to the chain's reference.
 * @property {string} reference - A unique identifier for the chain within the namespace. For AVM chains, this is the
 * first 32 characters of the base64 encoded genesis hash.
 * @see {@link https://chainagnostic.org/CAIPs/caip-2}
 */
interface CAIP002FromGenesisHashParameters {
  genesisHash: string;
  namespace: string;
}

export default CAIP002FromGenesisHashParameters;
