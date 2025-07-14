// constants
import { ALGORAND_CHAIN_LOGO_URI, ALGORAND_CURRENCY_ICON_URI, DEFAULT_AVM_DECIMALS } from '@/constants';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { Chain } from '@/types';

const chain: Chain<CAIP002Namespace.Algorand> = {
  displayName: 'Algorand Betanet',
  iconURI: ALGORAND_CHAIN_LOGO_URI,
  namespace: CAIP002Namespace.Algorand,
  nativeCurrency: {
    decimals: DEFAULT_AVM_DECIMALS,
    iconURI: ALGORAND_CURRENCY_ICON_URI,
    name: 'Algo',
    symbol: 'ALGO',
  },
  network: {
    algods: {
      default: 0,
      nodes: [
        {
          canonicalName: 'Nodely',
          id: 'nodely',
          origin: 'https://betanet-api.4160.nodely.dev',
        },
      ],
    },
    indexers: {
      default: 0,
      nodes: [
        {
          canonicalName: 'Nodely',
          id: 'nodely',
          origin: 'https://betanet-idx.4160.nodely.dev',
        },
      ],
    },
  },
  reference: 'mFgazF-2uRS1tMiL9dsj01hJGySEmPN2',
  testnet: true,
};

export default chain;
