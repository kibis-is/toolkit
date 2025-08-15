// enums
import { CAIP002Namespace } from '@/enums';

// types
import { AVMNetworkInformation, EVMNetworkInformation } from '@/types';

type NetworkInformation<Namespace = CAIP002Namespace> = Namespace extends CAIP002Namespace.Algorand
  ? AVMNetworkInformation
  : Namespace extends CAIP002Namespace.AVM
    ? AVMNetworkInformation
    : Namespace extends CAIP002Namespace.EIP155
      ? EVMNetworkInformation
      : never;

export default NetworkInformation;
