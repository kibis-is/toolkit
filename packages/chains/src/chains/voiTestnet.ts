// constants
import { DEFAULT_AVM_DECIMALS, VOI_ICON_URI } from '@/constants';

// types
import type { Chain } from '@/types';

const chain: Chain = {
  caip002: {
    namespace: 'avm',
  },
  algods: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://testnet-api.voi.nodely.dev',
      },
    ],
  },
  displayName: 'Voi Network Testnet',
  indexers: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://testnet-idx.voi.nodely.dev',
      },
    ],
  },
  isTestnet: true,
  nativeCurrency: {
    decimals: DEFAULT_AVM_DECIMALS,
    iconURI: VOI_ICON_URI,
    name: 'Voi',
    symbol: 'VOI',
  },
};

export default chain;
