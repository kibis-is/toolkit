import { decode as encodeUTF8 } from '@stablelib/utf8';

/**
 * Encodes a given Uint8Array of bytes into a UTF-8 string.
 *
 * @param {Uint8Array} bytes - The input byte array to be encoded.
 * @return {string} The UTF-8 encoded string representation of the input bytes.
 */
export default function encode(bytes: Uint8Array): string {
  return encodeUTF8(bytes);
}
