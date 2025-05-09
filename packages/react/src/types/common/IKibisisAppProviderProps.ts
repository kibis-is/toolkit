import type { ColorMode } from '@chakra-ui/color-mode';

// types
import type { ILogger } from '@kibisis/utilities';

interface IKibisisAppProviderProps {
  colorMode?: ColorMode;
  debug?: boolean;
  logger?: ILogger;
}

export default IKibisisAppProviderProps;
