// constants
import { ETHEREUM_CHAIN_LOGO_URI, ETHEREUM_CURRENCY_ICON_URI } from '@/constants';

// decorators
import { EVMChain } from '@/decorators';

// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { Transports } from '@/types';

export default class EthereumSepolia extends EVMChain {
  // public static variables
  public static readonly displayName = 'Ethereum Sepolia';
  public static readonly iconURI = ETHEREUM_CHAIN_LOGO_URI;
  public static readonly namespace = CAIP002Namespace.EIP155;
  public static readonly nativeCurrency = {
    decimals: 18,
    iconURI: ETHEREUM_CURRENCY_ICON_URI,
    name: 'Ether',
    symbol: 'ETH',
  };
  public static readonly shortName = 'eth';
  public static readonly transports: Transports<CAIP002Namespace.EIP155> = {
    https: {
      default: 0,
      rpcURLs: ['https://eth-sepolia.public.blastapi.io'],
    },
    websockets: {
      default: 0,
      rpcURLs: ['wss://eth-sepolia.public.blastapi.io'],
    },
  };
  public static readonly testnet = true;
}
