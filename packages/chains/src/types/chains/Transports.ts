// enums
import { CAIP002Namespace } from '@/enums';

// types
import type { AVMTransports, EVMTransports } from '@/types';

type Transports<Namespace = CAIP002Namespace> = Namespace extends CAIP002Namespace.Algorand
  ? AVMTransports
  : Namespace extends CAIP002Namespace.AVM
    ? AVMTransports
    : Namespace extends CAIP002Namespace.EIP155
      ? EVMTransports
      : never;

export default Transports;
