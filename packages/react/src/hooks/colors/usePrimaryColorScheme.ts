import type { ColorMode } from '@chakra-ui/color-mode';
import { useColorMode } from '@/hooks';

export default function usePrimaryColorScheme(colorMode?: ColorMode): string {
  let _colorMode = useColorMode();

  if (colorMode) {
    _colorMode = colorMode;
  }

  if (colorMode === 'dark') {
    return 'primaryDark';
  }

  return 'primaryLight';
}
