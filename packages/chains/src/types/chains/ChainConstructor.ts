// decorators
import { AVMChain, EVMChain } from '@/decorators';

// enums
import { CAIP002Namespace } from '@/enums';

type ChainConstructor<Namespace = CAIP002Namespace> = Namespace extends CAIP002Namespace.Algorand
  ? typeof AVMChain
  : Namespace extends CAIP002Namespace.AVM
    ? typeof AVMChain
    : Namespace extends CAIP002Namespace.EIP155
      ? typeof EVMChain
      : never;

export default ChainConstructor;
