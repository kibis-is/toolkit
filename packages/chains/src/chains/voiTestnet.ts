// constants
import { DEFAULT_AVM_DECIMALS, VOI_CHAIN_LOGO_URI, VOI_CURRENCY_ICON_URI } from '@/constants';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { Chain } from '@/types';

const chain: Chain<CAIP002Namespace.AVM> = {
  displayName: 'Voi Network Testnet',
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
          origin: 'https://testnet-api.voi.nodely.dev',
        },
      ],
    },
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
  },
  reference: 'mufvzhECYAe3WaU075v0z4k1_SNUIuUP',
  testnet: true,
};

export default chain;
