import type { ColorMode } from '@chakra-ui/color-mode';
import { useColorMode } from '@/hooks';

export default function usePrimaryColor(colorMode?: ColorMode): string {
  let _colorMode = useColorMode();

  if (colorMode) {
    _colorMode = colorMode;
  }

  if (_colorMode === 'dark') {
    return 'primaryDark.500';
  }

  return 'primaryLight.500';
}
