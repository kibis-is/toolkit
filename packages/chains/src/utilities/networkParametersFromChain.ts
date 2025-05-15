import axios, { type AxiosError } from 'axios';

// types
import type {
  ChainWithNetworkParameters,
  GenesisResponse,
  NetworkParametersFromChainParameters,
  TransactionParamsResponse,
} from '@/types';

// utilities
import caip002FromGenesisHash from './caip002FromGenesisHash';
import defaultNode from './defaultNode';

/**
 * Fetches network parameters for a given chain.
 * @param {NetworkParametersFromChainParameters} params - The chain information and a CAIP-002 namespace.
 * @returns {Promise<ChainWithNetworkParameters>} A promise that resolves to the chain details enriched with network
 * parameters such as fee, genesis hash, and CAIP-002 identifier.
 * @throws {Error} Throws an error if unable to fetch network parameters from the supplied chain algod.
 */
export default async function networkParametersFromChain({
  chain,
  namespace,
}: NetworkParametersFromChainParameters): Promise<ChainWithNetworkParameters> {
  try {
    const algod = defaultNode(chain.algods);
    const [{ data: transactionParams }, { data: genesis }] = await Promise.all([
      axios.get<TransactionParamsResponse>(`${algod.origin}/v2/transactions/params`),
      axios.get<GenesisResponse>(`${algod.origin}/genesis`),
    ]);
    const genesisHash = transactionParams['genesis-hash'];

    return {
      ...chain,
      caip002: caip002FromGenesisHash({
        genesisHash,
        namespace,
      }),
      fee: BigInt(transactionParams.fee),
      feeSinkAddress: genesis.fees,
      genesisHash,
      genesisID: transactionParams['genesis-id'],
    };
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw new Error('unable to fetch network parameters');
    }

    throw error;
  }
}
