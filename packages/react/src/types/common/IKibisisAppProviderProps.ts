import type { ColorMode } from '@chakra-ui/color-mode';
import type { Resource } from 'i18next';

// types
import type { ILogger } from '@kibisis/utilities';

interface IKibisisAppProviderProps {
  colorMode?: ColorMode;
  debug?: boolean;
  logger?: ILogger;
  translations?: Resource;
}

export default IKibisisAppProviderProps;
