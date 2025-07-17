import {
  decodeBase64,
  decodeBase64IgnorePadding,
  decodeBase64url,
  decodeBase64urlIgnorePadding,
} from '@oslojs/encoding';

// types
import type DecodeOptions from './DecodeOptions';

/**
 * Decodes a given encoded string into a Uint8Array based on the specified options.
 *
 * @param {string} encoded - The encoded string to be decoded.
 * @param {DecodeOptions} [options] - Optional decoding options.
 * @param {boolean} [options.ignorePadding] - Whether to ignore padding ('=') in the encoded input.
 * @param {boolean} [options.urlSafe] - Whether the supplied input is a Base64URL-safe string.
 * @return {Uint8Array} The resulting decoded data as a Uint8Array.
 */
export default function decode(encoded: string, options?: DecodeOptions): Uint8Array {
  if (options?.ignorePadding && options?.urlSafe) {
    return decodeBase64urlIgnorePadding(encoded);
  }

  if (options?.ignorePadding) {
    return decodeBase64IgnorePadding(encoded);
  }

  if (options?.urlSafe) {
    return decodeBase64url(encoded);
  }

  return decodeBase64(encoded);
}
