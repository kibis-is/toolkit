/**
 * Calculates the new minimum balance requirement (MBR), in microalgos, for an application's account for a given box.
 *
 * This is calculated using the formula:
 * `mbr = 2500 + 400 * (key size + value size)`
 * @param {bigint} keyByteSize - The byte size of the box's key.
 * @param {bigint} valueByteSize - The byte size of the box's value.
 * @returns {bigint} the increased MBR for an app's account for a given box.
 * @see {@link https://developer.algorand.org/articles/smart-contract-storage-boxes/}
 */
export default function calculateMBRForBox(keyByteSize: bigint, valueByteSize: bigint): bigint {
  return 2500n + 400n * (keyByteSize + valueByteSize);
}
