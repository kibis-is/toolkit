// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { ChainParameters, NativeCurrency, NetworkInformation, Transports } from '@/types';

/**
 * Provides a base abstraction for a blockchain chain, containing properties and methods
 * to define and interact with chain-specific information. It is designed as an abstract
 * class and should be extended to represent specific blockchains.
 *
 * The class supports [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2} (Chain Agnostic Improvement Proposals)
 * for chain identification.
 *
 * **Implementation Requirements: **
 * - Subclasses **MUST** implement a static `initialize()` method.
 * - The method **MUST** return Promise<InstanceOfSubclass>.
 * - The method should handle all necessary setup and return a ready-to-use instance.
 *
 * @abstract
 */
export default abstract class AbstractChain {
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
   * The [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2} namespace of the chain. It acts as a resolution to the
   * chain's reference.
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
   * Transport configuration that facilitates communication to the network.
   * @static
   * @readonly
   */
  public static readonly transports: Transports<CAIP002Namespace>;
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
   * A unique identifier for the chain within the [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2} namespace.
   * @readonly
   */
  public readonly reference: string;

  protected constructor({ networkInformation, reference }: ChainParameters) {
    this.networkInformation = networkInformation;
    this.reference = reference;
  }

  /**
   * public abstract methods
   */

  /**
   * Retrieves the [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2} namespace associated with the current implementation.
   *
   * @return {CAIP002Namespace} An instance representing the [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2}
   * namespace.
   * @public
   * @abstract
   */
  public abstract namespace(): CAIP002Namespace;

  /**
   * Gets the transport configuration to communicate with the chain for the specified
   * [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2} namespace.
   *
   * This method must be implemented to define how the chain is communicated to.
   *
   * @return {Transports<CAIP002Namespace>} The transport configuration associated with the given namespace.
   * @public
   * @abstract
   */
  public abstract transports(): Transports<CAIP002Namespace>;

  /**
   * public methods
   */

  /**
   * Generates the [CAIP-002]{@link https://chainagnostic.org/CAIPs/caip-2} chain identifier by combining the namespace
   * and reference with a colon.
   *
   * @return {string} The CAIP-002 chain identifier as "namespace:reference".
   * @public
   */
  public chainID(): string {
    return (this.constructor as typeof AbstractChain).namespace + ':' + this.reference;
  }

  /**
   * Retrieves the display name of the chain.
   *
   * @return {string} The display name of the chain.
   * @public
   */
  public displayName(): string {
    return (this.constructor as typeof AbstractChain).displayName;
  }

  /**
   * Retrieves the URI of the icon associated with the chain.
   *
   * @return {string} The URI of the chain icon.
   * @public
   */
  public iconURI(): string {
    return (this.constructor as typeof AbstractChain).iconURI;
  }

  /**
   * Retrieves the native currency associated with the chain.
   *
   * @return {NativeCurrency} The native currency of the chain as an instance of NativeCurrency.
   * @public
   */
  public nativeCurrency(): NativeCurrency {
    return (this.constructor as typeof AbstractChain).nativeCurrency;
  }

  /**
   * Determines whether the current instance is operating on a testnet or not.
   *
   * @return {boolean} Returns true if the instance is associated with a testnet, otherwise false.
   * @public
   */
  public testnet(): boolean {
    return (this.constructor as typeof AbstractChain).testnet;
  }
}
