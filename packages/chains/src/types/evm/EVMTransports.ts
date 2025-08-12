// types
import type { RPCURLs } from '@/types';

/**
 * @property {RPCURLs} https - A collection of HTTPS URLs.
 * @property {RPCURLs} websockets - A collection of WebSocket URLs.
 */
interface EVMTransports {
  https: RPCURLs;
  websockets: RPCURLs;
}

export default EVMTransports;
