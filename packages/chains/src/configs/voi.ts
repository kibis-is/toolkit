// constants
import { DEFAULT_AVM_DECIMALS, VOI_ICON_URI } from '@/constants';

// types
import type { Chain } from '@/types';

const chain: Chain = {
  algods: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://mainnet-api.voi.nodely.dev',
      }
    ],
  },
  displayName: 'Voi Network',
  indexers: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://mainnet-idx.voi.nodely.dev',
      }
    ],
  },
  isTestnet: false,
  nativeCurrency: {
    decimals: DEFAULT_AVM_DECIMALS,
    iconURI: VOI_ICON_URI,
    name: 'Voi',
    symbol: 'VOI',
  },
};

export default chain;
