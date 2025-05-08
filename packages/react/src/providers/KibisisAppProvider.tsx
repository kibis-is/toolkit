import type { ColorMode } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import { createLogger, type ILogger } from '@kibisis/utilities';
import { type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

// contexts
import { KibisisContext } from '@/contexts';

// themes
import defaultTheme from '@/theme';

// types
import type { IKibisisAppProviderProps } from '@/types';

const KibisisAppProvider: FC<PropsWithChildren<IKibisisAppProviderProps>> = ({ children, colorMode = 'light', debug = false, i18n, logger }) => {
  // states
  const [_colorMode, setColorMode] = useState<ColorMode>(colorMode);
  const [_logger, setLogger] = useState<ILogger>(logger ?? createLogger(debug ? 'debug' : 'error'));
  // memos
  const innerProviders = useMemo(() => (
    <ChakraProvider value={defaultTheme}>
      <KibisisContext.Provider value={{
        colorMode: _colorMode,
        debug,
        logger: _logger,
      }}>
        {children}
      </KibisisContext.Provider>
    </ChakraProvider>
  ), [_colorMode, _logger, children, debug]);

  useEffect(() => setColorMode(colorMode), [colorMode]);
  useEffect(() => logger && setLogger(logger), [logger]);

  if (!i18n) {
    return innerProviders;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {innerProviders}
    </I18nextProvider>
  );
};

export default KibisisAppProvider;
