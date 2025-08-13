interface RPCPayload<Params = []> {
  id: number | string | null;
  jsonrpc: '2.0';
  method: string;
  params: Params;
}

export default RPCPayload;
