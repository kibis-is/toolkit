/**
 * @property {number} default - The index of the default URL.
 * @property {[string, ...string[]]} rpcURLs - A list of RPC URLs.
 */
interface RPCURLs {
  default: number;
  rpcURLs: [string, ...string[]];
}

export default RPCURLs;
