// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { AVMNetworkInformation, NativeCurrency } from '@/types';

/**
 * @property {string} displayName - A human-readable name for the chain.
 * @property {string} iconURI - A data URI of the chain that conforms to RFC-2397 or a URL that points to an image. The
 * **RECOMMENDED** image format should be lossless or vector-based such as a PNG, WebP or SVG.
 * @property {string} namespace - The CAIP-002 namespace of the chain. It acts as a resolution to the chain's reference.
 * @property {NativeCurrency} nativeCurrency - Details relating to the native currency of the chain.
 * @property {string} reference - A unique identifier for the chain within the CAIP-002 namespace.
 * * `algorand`/`avm`: This is the first 32 characters of the base64 encoded genesis hash.
 * @property {boolean} testnet - Whether this chain is considered a testnet.
 */
interface Chain<Namespace = CAIP002Namespace> {
  displayName: string;
  iconURI: string;
  namespace: Namespace;
  nativeCurrency: NativeCurrency;
  network: Namespace extends CAIP002Namespace.Algorand
    ? AVMNetworkInformation
    : Namespace extends CAIP002Namespace.AVM
      ? AVMNetworkInformation
      : never;
  reference: string;
  testnet: boolean;
}

export default Chain;
