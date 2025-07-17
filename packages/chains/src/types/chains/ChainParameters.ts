// enums
import { CAIP002Namespace } from '@/enums';

// types
import type NetworkInformation from './NetworkInformation';

interface ChainParameters<Namespace = CAIP002Namespace> {
  networkInformation: NetworkInformation<Namespace>;
  reference: string;
}

export default ChainParameters;
