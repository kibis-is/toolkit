import { encode as decodeUTF8 } from '@stablelib/utf8';

/**
 * Decodes a UTF-8 encoded string into a Uint8Array.
 *
 * @param {string} encoded - The UTF-8 encoded string to decode.
 * @return {Uint8Array} The decoded data as a Uint8Array.
 */
export default function decode(encoded: string): Uint8Array {
  return decodeUTF8(encoded);
}
