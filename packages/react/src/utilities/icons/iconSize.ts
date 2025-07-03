// types
import type { TSizes } from '@/types';

/**
 * Converts a size to a pixel number.
 * @param {TSizes} size - [optional] The size to convert. Defaults to 'md'.
 * @returns {number} The pixel number for the given size.
 */
export default function iconSize(size?: TSizes): number {
  switch (size) {
    case 'lg':
      return 10;
    case 'xl':
      return 16;
    case 'sm':
      return 4;
    case 'xs':
      return 3;
    case 'md':
    default:
      return 6;
  }
}
