// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { AVMNetworkInformation } from '@/types';

type NetworkInfomration<Namespace = CAIP002Namespace> = Namespace extends CAIP002Namespace.Algorand
  ? AVMNetworkInformation
  : Namespace extends CAIP002Namespace.AVM
    ? AVMNetworkInformation
    : never;

export default NetworkInfomration;
