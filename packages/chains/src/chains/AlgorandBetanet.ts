// constants
import { ALGORAND_CHAIN_LOGO_URI, ALGORAND_CURRENCY_ICON_URI } from '@/constants';

// decorators
import { AVMChain } from '@/decorators';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { NetworkConfiguration } from '@/types';

export default class AlgorandBetanet extends AVMChain {
  // public static variables
  public static readonly displayName = 'Algorand Betanet';
  public static readonly iconURI = ALGORAND_CHAIN_LOGO_URI;
  public static readonly namespace = CAIP002Namespace.Algorand;
  public static readonly nativeCurrency = {
    decimals: 6,
    iconURI: ALGORAND_CURRENCY_ICON_URI,
    name: 'Algo',
    symbol: 'ALGO',
  };
  public static readonly networkConfiguration: NetworkConfiguration<CAIP002Namespace.Algorand> = {
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
  };
  public static readonly testnet = true;
}
