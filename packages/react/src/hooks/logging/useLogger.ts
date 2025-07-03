import type { ILogger } from '@kibisis/utilities';
import { useContext } from 'react';

// contexts
import { KibisisContext } from '@/contexts';

export default function useLogger(): ILogger | null {
  return useContext(KibisisContext)?.logger ?? null;
}
