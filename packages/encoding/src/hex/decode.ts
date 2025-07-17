import { decodeHex } from '@oslojs/encoding';

/**
 * Decodes a hexadecimal-encoded string into a Uint8Array.
 *
 * @param {string} encoded - The hexadecimal-encoded string to be decoded.
 * @return {Uint8Array} The decoded byte array.
 */
export default function decode(encoded: string): Uint8Array {
  return decodeHex(encoded);
}
