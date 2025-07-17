import { encodeHexLowerCase, encodeHexUpperCase } from '@oslojs/encoding';

// types
import type EncodeOptions from './EncodeOptions';

/**
 * Encodes a given Uint8Array into a hexadecimal string representation.
 *
 * @param {Uint8Array} bytes - The input byte array to be encoded.
 * @param {EncodeOptions} [options] - Optional encoding options.
 * @param {boolean} [options.uppercase] - If true, encodes the hexadecimal string in uppercase format.
 * @return {string} The hexadecimal string representation of the input byte array.
 */
export default function encode(bytes: Uint8Array, options?: EncodeOptions): string {
  if (options?.uppercase) {
    return encodeHexUpperCase(bytes);
  }

  return encodeHexLowerCase(bytes);
}
