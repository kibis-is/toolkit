import algosdk from 'algosdk';

interface SimulateTransaction {
  abiMethod: algosdk.ABIMethod;
  authAddress?: string;
  transaction: algosdk.Transaction;
}

export default SimulateTransaction;
