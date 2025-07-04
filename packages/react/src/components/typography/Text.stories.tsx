import type { Meta, StoryObj } from '@storybook/react';

// components
import Text from './Text';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TTextProps } from '@/types';

const meta: Meta<typeof Text> = {
  component: Text,
  globals: {
    theme: 'dark',
  },
  title: 'Components/Text',
};

export const WithDarkTheme: StoryObj<TTextProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Text {...props}>
        Hello humie
      </Text>
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TTextProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Text {...props}>
        Hello humie
      </Text>
    </KibisisAppProvider>
  ),
};

export default meta;
