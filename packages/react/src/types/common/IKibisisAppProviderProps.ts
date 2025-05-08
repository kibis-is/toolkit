import type { ColorMode } from '@chakra-ui/color-mode';
import type { i18n as I18n } from 'i18next';

// types
import type { ILogger } from '@kibisis/utilities';

interface IKibisisAppProviderProps {
  colorMode?: ColorMode;
  debug?: boolean;
  i18n?: I18n;
  logger?: ILogger;
}

export default IKibisisAppProviderProps;
