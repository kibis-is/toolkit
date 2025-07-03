import type { ColorMode } from '@chakra-ui/color-mode';
import { useContext } from 'react';

// contexts
import { KibisisContext } from '@/contexts';

export default function useColorMode(): ColorMode {
  return useContext(KibisisContext)?.colorMode ?? 'light';
}
