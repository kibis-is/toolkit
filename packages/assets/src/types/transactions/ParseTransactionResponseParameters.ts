import algosdk from 'algosdk';

interface ParseTransactionResponseParameters {
  abiMethod: algosdk.ABIMethod;
  response: algosdk.modelsv2.PendingTransactionResponse;
}

export default ParseTransactionResponseParameters;
