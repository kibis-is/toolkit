import type { ColorMode } from '@chakra-ui/color-mode';

// hooks
import { useColorMode } from '@/hooks';

export default function useBackgroundColor(colorMode?: ColorMode): string {
  let _colorMode = useColorMode();

  if (colorMode) {
    _colorMode = colorMode;
  }

  if (_colorMode === 'dark') {
    return 'backgroundDark.500';
  }

  return 'backgroundLight.500';
}
