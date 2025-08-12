import { uuid } from '@stablelib/uuid';
import axios, { type AxiosResponse } from 'axios';

// enums
import { CAIP002Namespace } from '@/enums';

// decorators
import AbstractChain from './AbstractChain';

// types
import type { ChainParameters, RPCPayload, RPCResponse, RPCURLs, Transports } from '@/types';

export default class EVMChain extends AbstractChain {
  /**
   * public static variables
   */

  public static readonly namespace: CAIP002Namespace.EIP155;
  public static readonly transports: Transports<CAIP002Namespace.EIP155>;

  protected constructor(params: ChainParameters<CAIP002Namespace.EIP155>) {
    super(params);
  }

  /**
   * protected static methods
   */

  /**
   * Returns the default RPC URL from the provided list.
   *
   * @param {RPCURLs} value - The list of RPC URLs containing a default identifier.
   * @returns {string} The default RPC URL from the list.
   * @protected
   * @static
   */
  protected static _defaultRPCURL(value: RPCURLs): string {
    return value.rpcURLs[value.default];
  }

  /**
   * public static methods
   */

  public static async initialize<T extends typeof EVMChain>(this: T): Promise<EVMChain> {
    const rpcURL = this._defaultRPCURL(this.transports.https);
    const id = uuid();
    const { data } = await axios.post<RPCResponse<string>, AxiosResponse<RPCResponse<string>, RPCPayload>, RPCPayload>(
      rpcURL,
      {
        id,
        jsonrpc: '2.0',
        method: 'net_version',
        params: [],
      }
    );

    return new this({
      reference: data.result,
      networkInformation: {
        networkID: data.result,
      },
    });
  }

  /**
   * public methods
   */

  public namespace(): CAIP002Namespace.EIP155 {
    return (this.constructor as typeof EVMChain).namespace;
  }

  public transports(): Transports<CAIP002Namespace.EIP155> {
    return (this.constructor as typeof EVMChain).transports;
  }
}
