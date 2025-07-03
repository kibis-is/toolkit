import type { Meta, StoryObj } from '@storybook/react';

// components
import Label from './Label';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TLabelProps } from '@/types';

const meta: Meta<typeof Label> = {
  args: {
    label: 'Label',
  },
  component: Label,
  globals: {
    theme: 'dark',
  },
  title: 'Components/Label',
};

export const WithDarkTheme: StoryObj<TLabelProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Label {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TLabelProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Label {...props} />
    </KibisisAppProvider>
  ),
};

export const Required: StoryObj<TLabelProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <Label required={true} {...props} />
    </KibisisAppProvider>
  ),
};

export const WithError: StoryObj<TLabelProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <Label error="Something is not quite right" {...props} />
    </KibisisAppProvider>
  ),
};

export default meta;
