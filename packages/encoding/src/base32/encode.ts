import {
  encodeBase32,
  encodeBase32NoPadding,
  encodeBase32UpperCase,
  encodeBase32UpperCaseNoPadding,
} from '@oslojs/encoding';

// types
import type EncodeOptions from './EncodeOptions';

/**
 * Encodes the given byte array into a Base32-encoded string based on the specified options.
 *
 * @param {Uint8Array} bytes - The byte array to be encoded.
 * @param {EncodeOptions} [options] - Optional encoding options.
 * @param {boolean} [options.noPadding] - When true, the encoded string will not have padding characters.
 * @param {boolean} [options.uppercase] - When true, the output will be in uppercase.
 * @return {string} The Base32-encoded string.
 */
export default function encode(bytes: Uint8Array, options?: EncodeOptions): string {
  if (options?.noPadding && options?.uppercase) {
    return encodeBase32UpperCaseNoPadding(bytes);
  }

  if (options?.noPadding) {
    return encodeBase32NoPadding(bytes);
  }

  if (options?.uppercase) {
    return encodeBase32UpperCase(bytes);
  }

  return encodeBase32(bytes);
}
