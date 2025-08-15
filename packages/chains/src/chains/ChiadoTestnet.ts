// constants
import { GNOSIS_CHAIN_LOGO_URI, GNOSIS_CURRENCY_ICON_URI } from '@/constants';

// decorators
import { EVMChain } from '@/decorators';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { Transports } from '@/types';

export default class ChiadoTestnet extends EVMChain {
  // public static variables
  public static readonly displayName = 'Chiado Testnet';
  public static readonly iconURI = GNOSIS_CHAIN_LOGO_URI;
  public static readonly namespace = CAIP002Namespace.EIP155;
  public static readonly nativeCurrency = {
    decimals: 18,
    iconURI: GNOSIS_CURRENCY_ICON_URI,
    name: 'Testnet xDai',
    symbol: 'xDAI',
  };
  public static readonly shortName = 'gno';
  public static readonly transports: Transports<CAIP002Namespace.EIP155> = {
    https: {
      default: 0,
      rpcURLs: ['https://rpc.chiadochain.net'],
    },
    websockets: {
      default: 0,
      rpcURLs: ['wss://rpc.chiadochain.net/wss'],
    },
  };
  public static readonly testnet = true;
}
