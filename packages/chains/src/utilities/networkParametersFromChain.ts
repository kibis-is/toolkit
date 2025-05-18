import axios, { type AxiosRequestConfig } from 'axios';

// types
import type { Chain, ChainWithNetworkParameters, GenesisResponse, TransactionParamsResponse } from '@/types';

// utilities
import caip002FromGenesisHash from './caip002FromGenesisHash';
import defaultNode from './defaultNode';

/**
 * Fetches network parameters for a given chain.
 * @param {Chain} chain - The chain information.
 * @returns {Promise<ChainWithNetworkParameters>} A promise that resolves to the chain details enriched with network
 * parameters such as fee, genesis hash, and CAIP-002 identifier.
 * @throws {AxiosError} If the default algod node in the supplied chain is unreachable.
 */
export default async function networkParametersFromChain(chain: Chain): Promise<ChainWithNetworkParameters> {
  const algod = defaultNode(chain.algods);
  const baseURL = `${algod.origin}${algod.port ? `:${algod.port}` : ''}`;
  const config: AxiosRequestConfig | undefined = algod.token
    ? {
        headers: {
          ['X-Algo-API-Token']: algod.token,
        },
      }
    : undefined;
  const [{ data: transactionParams }, { data: genesis }] = await Promise.all([
    axios.get<TransactionParamsResponse>(`${baseURL}/v2/transactions/params`, config),
    axios.get<GenesisResponse>(`${baseURL}/genesis`, config),
  ]);
  const genesisHash = transactionParams['genesis-hash'];

  return {
    ...chain,
    caip002: caip002FromGenesisHash({
      genesisHash,
      namespace: chain.caip002.namespace,
    }),
    fee: BigInt(transactionParams.fee),
    feeSinkAddress: genesis.fees,
    genesisHash,
    genesisID: transactionParams['genesis-id'],
  };
}
