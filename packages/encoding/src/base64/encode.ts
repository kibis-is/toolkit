import { encodeBase64, encodeBase64NoPadding, encodeBase64url, encodeBase64urlNoPadding } from '@oslojs/encoding';

// types
import type EncodeOptions from './EncodeOptions';

/**
 * Encodes a given Uint8Array into a Base64 or Base64URL string based on the provided options.
 *
 * @param {Uint8Array} bytes - The input data to be encoded.
 * @param {EncodeOptions} [options] - Optional settings to modify the output format.
 * @param {boolean} [options.noPadding] - If true, omits padding characters ('=') from the output.
 * @param {boolean} [options.urlSafe] - If true, produces a Base64URL-safe string.
 * @return {string} The encoded string in either Base64 or Base64URL format, depending on the options provided.
 */
export default function encode(bytes: Uint8Array, options?: EncodeOptions): string {
  if (options?.noPadding && options?.urlSafe) {
    return encodeBase64urlNoPadding(bytes);
  }

  if (options?.noPadding) {
    return encodeBase64NoPadding(bytes);
  }

  if (options?.urlSafe) {
    return encodeBase64url(bytes);
  }

  return encodeBase64(bytes);
}
