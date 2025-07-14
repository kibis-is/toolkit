// types
import type { Chain } from '@/types';

/**
 * Generates the CAIP-002 chain identifier by combining the namespace and reference with a colon.
 * @param {chain} Chain - The chain.
 * @return {string} The CAIP-002 chain identifier as "namespace:reference".
 * @see {@link https://chainagnostic.org/CAIPs/caip-2}
 */
export default function chainID({ namespace, reference }: Chain): string {
  return `${namespace}:${reference}`;
}
