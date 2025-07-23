import { decodeBase32, decodeBase32IgnorePadding } from '@oslojs/encoding';

// types
import type DecodeOptions from './DecodeOptions';

/**
 * Decodes a given base32 encoded string into a Uint8Array.
 *
 * @param {string} encoded - The base32 encoded input string to decode.
 * @param {DecodeOptions} [options] - Optional decoding options.
 * @param {boolean} [options.ignorePadding] - Whether to ignore padding in the encoded input.
 * @return {Uint8Array} The decoded data as a Uint8Array.
 */
export default function decode(encoded: string, options?: DecodeOptions): Uint8Array {
  if (options?.ignorePadding) {
    return decodeBase32IgnorePadding(encoded);
  }

  return decodeBase32(encoded);
}
