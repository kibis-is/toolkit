// constants
import { ALGORAND_ICON_URI, DEFAULT_AVM_DECIMALS } from '@/constants';

// types
import type { Chain } from '@/types';

const chain: Chain = {
  algods: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://mainnet-api.4160.nodely.dev',
      }
    ],
  },
  displayName: 'Algorand',
  indexers: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://mainnet-idx.4160.nodely.dev',
      }
    ],
  },
  isTestnet: false,
  nativeCurrency: {
    decimals: DEFAULT_AVM_DECIMALS,
    iconURI: ALGORAND_ICON_URI,
    name: 'Algo',
    symbol: 'ALGO',
  },
};

export default chain;
