import bs58 from 'bs58';

/**
 * Encodes a given Uint8Array into a Base58 string representation.
 *
 * @param {Uint8Array} bytes - The byte array to be encoded.
 * @return {string} The Base58-encoded string representation of the input byte array.
 */
export default function encode(bytes: Uint8Array): string {
  return bs58.encode(bytes);
}
