// constants
import { DEFAULT_AVM_DECIMALS, VOI_CHAIN_LOGO_URI, VOI_CURRENCY_ICON_URI } from '@/constants';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { Chain } from '@/types';

const chain: Chain<CAIP002Namespace.AVM> = {
  displayName: 'Voi Network',
  iconURI: VOI_CHAIN_LOGO_URI,
  namespace: CAIP002Namespace.AVM,
  nativeCurrency: {
    decimals: DEFAULT_AVM_DECIMALS,
    iconURI: VOI_CURRENCY_ICON_URI,
    name: 'Voi',
    symbol: 'VOI',
  },
  network: {
    algods: {
      default: 0,
      nodes: [
        {
          canonicalName: 'Nodely',
          id: 'nodely',
          origin: 'https://mainnet-api.voi.nodely.dev',
        },
      ],
    },
    indexers: {
      default: 0,
      nodes: [
        {
          canonicalName: 'Nodely',
          id: 'nodely',
          origin: 'https://mainnet-idx.voi.nodely.dev',
        },
      ],
    },
  },
  reference: 'r20fSQI8gWe_kFZziNonSPCXLwcQmH_n',
  testnet: false,
};

export default chain;
