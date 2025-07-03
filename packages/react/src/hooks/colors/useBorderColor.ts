import type { ColorMode } from '@chakra-ui/color-mode';
import { useColorMode } from '@/hooks';

export default function useBorderColor(colorMode?: ColorMode): string {
  let _colorMode = useColorMode();

  if (colorMode) {
    _colorMode = colorMode;
  }

  if (_colorMode === 'dark') {
    return 'whiteAlpha.400';
  }

  return 'gray.300';
}
