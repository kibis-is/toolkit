import type { ColorMode } from '@chakra-ui/color-mode';
import type { ILogger } from '@kibisis/utilities';

interface IKibisisContextState {
  colorMode: ColorMode;
  debug: boolean;
  logger: ILogger;
}

export default IKibisisContextState;
