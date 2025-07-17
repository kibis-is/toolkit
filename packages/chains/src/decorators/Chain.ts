// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { ChainParameters, NativeCurrency, NetworkConfiguration, NetworkInformation } from '@/types';

/**
 * Provides a base abstraction for a blockchain chain, containing properties and methods
 * to define and interact with chain-specific information. It is designed as an abstract
 * class and should be extended to represent specific blockchains.
 *
 * The class supports CAIP-002 (Chain Agnostic Improvement Proposals) for chain identification.
 *
 * @abstract
 */
export default abstract class Chain {
  /**
   * public static variables
   */

  /**
   * A human-readable name for the chain (e.g., "Algorand", "Ethereum").
   * @static
   * @readonly
   */
  public static readonly displayName: string;
  /**
   * A data URI of the chain that conforms to RFC-2397 or a URL that points to an image.
   * The **RECOMMENDED** image format should be lossless or vector-based such as a PNG, WebP or SVG.
   * @static
   * @readonly
   */
  public static readonly iconURI: string;
  /**
   * The CAIP-002 namespace of the chain. It acts as a resolution to the chain's reference.
   * @static
   * @readonly
   */
  public static readonly namespace: CAIP002Namespace;
  /**
   * Details relating to the native currency of the chain.
   * @static
   * @readonly
   */
  public static readonly nativeCurrency: NativeCurrency;
  /**
   * Network configuration containing node information and settings for the chain.
   * @static
   * @readonly
   */
  public static readonly networkConfiguration: NetworkConfiguration<CAIP002Namespace>;
  /**
   * Whether this chain is considered a testnet.
   * @static
   * @readonly
   */
  public static readonly testnet: boolean;

  /**
   * public variables
   */

  /**
   * Network-specific information retrieved from the blockchain, such as genesis hash and network ID.
   * @readonly
   */
  public readonly networkInformation: NetworkInformation<CAIP002Namespace>;
  /**
   * A unique identifier for the chain within the CAIP-002 namespace.
   * @readonly
   */
  public readonly reference: string;

  protected constructor({ networkInformation, reference }: ChainParameters) {
    this.networkInformation = networkInformation;
    this.reference = reference;
  }

  /**
   * public methods
   */

  /**
   * Generates the CAIP-002 chain identifier by combining the namespace and reference with a colon.
   *
   * @return {string} The CAIP-002 chain identifier as "namespace:reference".
   * @see {@link https://chainagnostic.org/CAIPs/caip-2}
   * @public
   */
  public chainID(): string {
    return (this.constructor as typeof Chain).namespace + ':' + this.reference;
  }
}
