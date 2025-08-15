// decorators
import { AVMChain, EVMChain } from '@/decorators';

// enums
import { CAIP002Namespace } from '@/enums';

type Chain<Namespace = CAIP002Namespace> = Namespace extends CAIP002Namespace.Algorand
  ? AVMChain
  : Namespace extends CAIP002Namespace.AVM
    ? AVMChain
    : Namespace extends CAIP002Namespace.EIP155
      ? EVMChain
      : never;

export default Chain;
