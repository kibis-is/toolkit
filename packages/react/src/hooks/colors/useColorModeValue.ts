import type { ColorMode } from '@chakra-ui/color-mode';

// hooks
import { useColorMode } from '@/hooks';

export default function useColorModeValue<LightValue = string, DarkValue = string>(
  lightValue: LightValue,
  darkValue: DarkValue,
  colorMode?: ColorMode
): LightValue | DarkValue {
  let _colorMode = useColorMode();

  if (colorMode) {
    _colorMode = colorMode;
  }

  if (_colorMode === 'dark') {
    return darkValue;
  }

  return lightValue;
}
