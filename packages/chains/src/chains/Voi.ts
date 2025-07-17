// constants
import { VOI_CHAIN_LOGO_URI, VOI_CURRENCY_ICON_URI } from '@/constants';

// decorators
import { AVMChain } from '@/decorators';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { NetworkConfiguration } from '@/types';

export default class Voi extends AVMChain {
  // public static variables
  public static readonly displayName = 'Voi Network';
  public static readonly iconURI = VOI_CHAIN_LOGO_URI;
  public static readonly namespace = CAIP002Namespace.AVM;
  public static readonly nativeCurrency = {
    decimals: 6,
    iconURI: VOI_CURRENCY_ICON_URI,
    name: 'Voi',
    symbol: 'VOI',
  };
  public static readonly networkConfiguration: NetworkConfiguration<CAIP002Namespace.AVM> = {
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
  };
  public static readonly testnet = false;
}
