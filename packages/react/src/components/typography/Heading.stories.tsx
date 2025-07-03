import type { Meta, StoryObj } from '@storybook/react';

// components
import Heading from './Heading';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { THeadingProps } from '@/types';

const meta: Meta<typeof Heading> = {
  component: Heading,
  globals: {
    theme: 'dark',
  },
  title: 'Components/Heading',
};

export const WithDarkTheme: StoryObj<THeadingProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Heading {...props}>
        Hello humie
      </Heading>
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<THeadingProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Heading {...props}>
        Hello humie
      </Heading>
    </KibisisAppProvider>
  ),
};

export default meta;
