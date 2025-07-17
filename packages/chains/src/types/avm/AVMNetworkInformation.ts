/**
 * @property {string} feeSinkAddress - The fee sink address.
 * @property {string} genesisHash - A base64 encoded hash of the genesis block.
 * @property {string} genesisID - A human-readable identifier for the network.
 */
interface AVMNetworkInformation {
  feeSinkAddress: string;
  genesisHash: string;
  genesisID: string;
}

export default AVMNetworkInformation;
