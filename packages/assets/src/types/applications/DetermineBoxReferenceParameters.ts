// types
import type BaseApplicationCallParameters from './BaseApplicationCallParameters';

interface DetermineBoxReferenceParameters extends BaseApplicationCallParameters {
  authAddress?: string;
  sender: string;
}

export default DetermineBoxReferenceParameters;
