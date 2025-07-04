import type { ColorMode } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import { createLogger, type ILogger } from '@kibisis/utilities';
import I18next, { type i18n as I18n } from 'i18next';
import { type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// contexts
import { KibisisContext } from '@/contexts';

// themes
import defaultTheme from '@/theme';

// translations
import { en } from '@/translations';

// types
import type { IKibisisAppProviderProps } from '@/types';

const KibisisAppProvider: FC<PropsWithChildren<IKibisisAppProviderProps>> = ({ children, colorMode = 'dark', debug = false, logger, translations }) => {
  // states
  const [_colorMode, setColorMode] = useState<ColorMode>(colorMode);
  const [_logger, setLogger] = useState<ILogger>(logger ?? createLogger(debug ? 'debug' : 'error'));
  const [i18n, setI18n] = useState<I18n | null>(null);
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

  useEffect(() => {
    (async () => {
      const _i18n = I18next.use(initReactI18next);

      await _i18n.init({
        fallbackLng: 'en',
        debug,
        defaultNS: ['default'],
        interpolation: {
          escapeValue: false,
        },
        ns: ['default', 'kibisis_react'],
        resources: Object.entries(translations || {}).reduce((acc, [language, resource]) => ({
          ...acc,
          [language]: {
            default: resource,
          }
        }), {}),
      });

      _i18n.addResourceBundle('en', 'kibisis_react', en, true);

      setI18n(_i18n);
    })();
  }, []);
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
