// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { AVMNetworkConfiguration } from '@/types';

type NetworkConfiguration<Namespace = CAIP002Namespace> = Namespace extends CAIP002Namespace.Algorand
  ? AVMNetworkConfiguration
  : Namespace extends CAIP002Namespace.AVM
    ? AVMNetworkConfiguration
    : never;

export default NetworkConfiguration;
