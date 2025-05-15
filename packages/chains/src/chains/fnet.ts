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
        origin: 'https://fnet-api.4160.nodely.dev',
      },
    ],
  },
  displayName: 'Algorand FNet',
  indexers: {
    default: 0,
    nodes: [
      {
        canonicalName: 'Nodely',
        id: 'nodely',
        origin: 'https://fnet-idx.4160.nodely.dev',
      },
    ],
  },
  isTestnet: true,
  nativeCurrency: {
    decimals: DEFAULT_AVM_DECIMALS,
    iconURI: ALGORAND_ICON_URI,
    name: 'Algo',
    symbol: 'ALGO',
  },
};

export default chain;
