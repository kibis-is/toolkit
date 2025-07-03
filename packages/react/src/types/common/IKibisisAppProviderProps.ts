import type { ColorMode } from '@chakra-ui/color-mode';

// types
import type { ITranslations } from '@/types';
import type { ILogger } from '@kibisis/utilities';

interface IKibisisAppProviderProps {
  colorMode?: ColorMode;
  debug?: boolean;
  logger?: ILogger;
  translations?: ITranslations;
}

export default IKibisisAppProviderProps;
