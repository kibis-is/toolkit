import { decode as decodeBase64, encodeURLSafe as encodeBase64URL } from '@stablelib/base64';

/**
 * Creates the CAIP-002 chain reference from an AVM genesis hash.
 *
 * The reference, for AVM chains, is the first 32 bytes, converted to URL-safe base64.
 * @param {string} genesisHash - An AVM genesis hash.
 * @returns {string} The AVM genesis hash converted to the CAIP-002 chain reference.
 * @see {@link https://chainagnostic.org/CAIPs/caip-2}
 */
export default function caip002ReferenceFromGenesisHash(genesisHash: string): string {
  const decodedGenesisHash = decodeBase64(genesisHash);

  return encodeBase64URL(decodedGenesisHash).slice(0, 32);
}
