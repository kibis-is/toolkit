import bs58 from 'bs58';

/**
 * Decodes a given Base58 encoded string into a Uint8Array.
 *
 * @param {string} encoded - The Base58 encoded string to decode.
 * @return {Uint8Array} The decoded data as a Uint8Array.
 */
export default function decode(encoded: string): Uint8Array {
  return bs58.decode(encoded);
}
