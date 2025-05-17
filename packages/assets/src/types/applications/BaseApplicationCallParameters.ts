import algosdk from 'algosdk';

interface BaseApplicationCallParameters {
  abiMethod: algosdk.ABIMethod;
  args?: Uint8Array[];
  transactionParams?: algosdk.SuggestedParams;
}

export default BaseApplicationCallParameters;
