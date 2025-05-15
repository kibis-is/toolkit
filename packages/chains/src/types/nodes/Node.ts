/**
 * @property {string} canonicalName - [optional] A human-readable name for the node.
 * @property {string} id - A unique identifier for the node. It is **RECOMMENDED** to use a UUID v4 compliant string.
 * @property {string} origin - The base URL of the node, this includes the protocol and the host (e.g., "https://example.com").
 * @property {string} port - [optional] The port of the node.
 * @property {string} token - [optional] A security token that will be used to authenticate requests.
 */
interface Node {
  canonicalName?: string;
  id: string;
  origin: string;
  port?: string;
  token?: string;
}

export default Node;
