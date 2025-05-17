import algosdk from 'algosdk';

// types
import { BaseApplicationCallParameters } from '@/types';

interface BuildWriteApplicationTransactionParameters extends BaseApplicationCallParameters {
  boxes?: algosdk.BoxReference[];
  sender: string;
  note?: Uint8Array;
}

export default BuildWriteApplicationTransactionParameters;
