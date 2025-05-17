/**
 * Removes the null bytes ("\x00") from a decoded string.
 * @param {string} input - The string to trim.
 * @returns {string} The string with the null bytes trimmed.
 */
export default function trimNullBytes(input: string): string {
  return input.replaceAll('\x00', '');
}
