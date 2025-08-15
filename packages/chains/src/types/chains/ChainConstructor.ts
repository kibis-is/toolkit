// decorators
import { AVMChain, EVMChain } from '@/decorators';

type ChainConstructor = typeof AVMChain | typeof EVMChain;

export default ChainConstructor;
