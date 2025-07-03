import type { ColorMode } from '@chakra-ui/color-mode';
import { useColorMode } from '@/hooks';

// constants
import { BACKGROUND_COLOR_DARK, BACKGROUND_COLOR_LIGHT } from '@/constants';

export default function useBackgroundColorCode(colorMode?: ColorMode): string {
  let _colorMode = useColorMode();

  if (colorMode) {
    _colorMode = colorMode;
  }

  if (_colorMode === 'dark') {
    return BACKGROUND_COLOR_DARK;
  }

  return BACKGROUND_COLOR_LIGHT;
}
