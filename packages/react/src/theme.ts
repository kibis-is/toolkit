import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

export default createSystem(
  defaultConfig,
  defineConfig({
    globalCss: {
      html: {
        bg: 'bg',
        colorPalette: {
          _dark: 'primaryDark',
          _light: 'primaryLight',
        },
        lineHeight: '1.5',
      },
    },
    theme: {
      semanticTokens: {
        colors: {
          backgroundDark: {
            bg: {
              value: '{colors.backgroundDark.500}',
            },
            contrast: {
              value: '{colors.whiteAlpha.800}', // text on solid bg
            },
            emphasized: {
              value: '{colors.backgroundDark.700}', // hover/active
            },
            fg: {
              value: '{colors.backgroundDark.500}', // text color
            },
            focusRing: {
              value: '{colors.backgroundDark.500}', // focus ring
            },
            muted: {
              value: '{colors.backgroundDark.500}', // muted bg
            },
            solid: {
              value: '{colors.backgroundDark.500}', // main button bg
            },
            subtle: {
              value: '{colors.backgroundDark.200}', // subtle bg
            },
          },
          backgroundLight: {
            bg: {
              value: '{colors.backgroundLight.500}',
            },
            contrast: {
              value: '{colors.gray.600}', // text on solid bg
            },
            emphasized: {
              value: '{colors.backgroundLight.700}', // hover/active
            },
            fg: {
              value: '{colors.backgroundLight.500}', // text color
            },
            focusRing: {
              value: '{colors.backgroundLight.500}', // focus ring
            },
            muted: {
              value: '{colors.backgroundLight.500}', // muted bg
            },
            solid: {
              value: '{colors.backgroundLight.500}', // main button bg
            },
            subtle: {
              value: '{colors.backgroundLight.200}', // subtle bg
            },
          },
          primaryDark: {
            contrast: {
              value: '{colors.gray.800}', // text on solid bg
            },
            emphasized: {
              value: '{colors.primaryDark.700}', // hover/active
            },
            fg: {
              value: '{colors.primaryDark.500}', // text color
            },
            focusRing: {
              value: '{colors.primaryDark.500}', // focus ring
            },
            muted: {
              value: '{colors.primaryDark.500}', // muted bg
            },
            solid: {
              value: '{colors.primaryDark.500}', // main button bg
            },
            subtle: {
              value: '{colors.primaryDark.200}', // subtle bg
            },
          },
          primaryLight: {
            contrast: {
              value: 'white',
            },
            emphasized: {
              value: '{colors.primaryLight.700}',
            },
            fg: {
              value: '{colors.primaryLight.100}',
            },
            focusRing: {
              value: '{colors.primaryLight.500}',
            },
            muted: {
              value: '{colors.primaryLight.100}',
            },
            solid: {
              value: '{colors.primaryLight.500}',
            },
            subtle: {
              value: '{colors.primaryLight.200}',
            },
          },
        },
      },
      tokens: {
        colors: {
          backgroundDark: {
            50: { value: '#83878e' },
            100: { value: '#6c7079' },
            200: { value: '#565b65' },
            300: { value: '#414651' },
            400: { value: '#2d333e' },
            500: { value: '#1a202c' },
            600: { value: '#151a25' },
            700: { value: '#10151e' },
            800: { value: '#0c0f17' },
            900: { value: '#070a11' },
          },
          backgroundLight: {
            50: { value: '#fcfbfa' },
            100: { value: '#fbfbfa' },
            200: { value: '#fbfaf9' },
            300: { value: '#faf9f8' },
            400: { value: '#faf9f7' },
            500: { value: '#f9f8f6' },
            600: { value: '#d9d8d6' },
            700: { value: '#b9b8b7' },
            800: { value: '#9a9a98' },
            900: { value: '#7d7c7b' },
          },
          primaryDark: {
            50: { value: '#F6E9FF' },
            100: { value: '#F2DEFF' },
            200: { value: '#EED3FF' },
            300: { value: '#E9C8FF' },
            400: { value: '#E5BDFF' },
            500: { value: '#E0B0FF' }, // mauve
            600: { value: '#C875FF' },
            700: { value: '#AF37FF' },
            800: { value: '#9500F8' },
            900: { value: '#6F00BA' },
          },
          primaryLight: {
            50: { value: '#F59CFD' },
            100: { value: '#F16AFD' },
            200: { value: '#EC39FC' },
            300: { value: '#E707FB' },
            400: { value: '#BC03CD' },
            500: { value: '#8D029B' }, // mauveine
            600: { value: '#7B0285' },
            700: { value: '#66026F' },
            800: { value: '#520159' },
            900: { value: '#3D0143' },
          },
          fonts: {
            heading: {
              value: '"Nunito", sans-serif',
            },
            body: {
              value: '"Nunito", sans-serif',
            },
            mono: {
              value: '"SourceCodePro", monospace',
            },
          },
        },
      },
    },
  })
);
