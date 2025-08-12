interface RPCResponse<Result> {
  id: number | string | null;
  jsonrpc: '2.0';
  result: Result;
}

export default RPCResponse;
