import { base64 } from '@kibisis/encoding';
import axios, { type AxiosRequestConfig } from 'axios';

// enums
import { CAIP002Namespace } from '@/enums';

// decorators
import AbstractChain from './AbstractChain';

// types
import type {
  ChainParameters,
  AVMGenesisResponse,
  AVMNode,
  AVMNodeCollection,
  AVMTransactionParamsResponse,
  Transports,
} from '@/types';

export default class AVMChain extends AbstractChain {
  /**
   * public static variables
   */

  public static readonly namespace: CAIP002Namespace.Algorand | CAIP002Namespace.AVM;
  public static readonly shortName: string;
  public static readonly transports: Transports<CAIP002Namespace.Algorand>;

  protected constructor(params: ChainParameters<CAIP002Namespace.Algorand | CAIP002Namespace.AVM>) {
    super(params);
  }

  /**
   * protected static methods
   */

  /**
   * Returns the default node from the provided node collection.
   *
   * @param {AVMNodeCollection} nodeCollection - The collection of nodes containing a default node identifier.
   * @returns {AVMNode} The default node from the node collection.
   * @protected
   * @static
   */
  protected static _defaultNode(nodeCollection: AVMNodeCollection): AVMNode {
    return nodeCollection.nodes[nodeCollection.default];
  }

  /**
   * public static methods
   */

  public static async initialize<T extends typeof AVMChain>(this: T): Promise<AVMChain> {
    const algod = this._defaultNode(this.transports.algods);
    const baseURL = `${algod.origin}${algod.port ? `:${algod.port}` : ''}`;
    const config: AxiosRequestConfig | undefined = algod.token
      ? {
          headers: {
            ['X-Algo-API-Token']: algod.token,
          },
        }
      : undefined;
    const [{ data: transactionParams }, { data: genesis }] = await Promise.all([
      axios.get<AVMTransactionParamsResponse>(`${baseURL}/v2/transactions/params`, config),
      axios.get<AVMGenesisResponse>(`${baseURL}/genesis`, config),
    ]);
    const genesisHash = transactionParams['genesis-hash'];

    return new this({
      reference: this.referenceFromGenesisHash(genesisHash),
      networkInformation: {
        feeSinkAddress: genesis.fees,
        genesisHash,
        genesisID: transactionParams['genesis-id'],
      },
    });
  }

  /**
   * Creates the CAIP-002 chain reference from an AVM genesis hash.
   *
   * The reference, for AVM chains, is the first 32 bytes, converted to URL-safe base64.
   * @param {string} genesisHash - An AVM genesis hash.
   * @returns {string} The AVM genesis hash converted to the CAIP-002 chain reference.
   * @see {@link https://namespaces.chainagnostic.org/algorand/caip2}
   */
  public static referenceFromGenesisHash(genesisHash: string): string {
    return base64.encode(base64.decode(genesisHash).slice(0, 32), {
      noPadding: true,
      urlSafe: true,
    });
  }

  /**
   * public methods
   */

  public namespace(): CAIP002Namespace.Algorand | CAIP002Namespace.AVM {
    return (this.constructor as typeof AVMChain).namespace;
  }

  public shortName(): string {
    return (this.constructor as typeof AVMChain).shortName;
  }

  public transports(): Transports<CAIP002Namespace.Algorand> {
    return (this.constructor as typeof AVMChain).transports;
  }
}
