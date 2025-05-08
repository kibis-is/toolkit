import type { Meta, StoryObj } from '@storybook/react';

// components
import Button from './Button';

// containers
import { KibisisAppProvider } from '@/providers';

const meta: Meta<typeof Button> = {
  argTypes: {
    colorMode: {
      control: 'radio',
      description: 'Determines the color mode of the button.',
      options: ['dark', 'light'],
      table: {
        type: {
          summary: 'dark | light',
        },
      },
    },
    variant: {
      control: 'radio',
      description: 'Determines the style of the button.',
      options: ['outline', 'solid'],
      table: {
        defaultValue: {
          summary: 'solid',
        },
        type: {
          summary: 'outline | solid',
        },
      },
    },
  },
  component: Button,
  title: 'Components/Button',
};

export const SolidWithDarkTheme: StoryObj<typeof meta> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Button {...props}>
        Button
      </Button>
    </KibisisAppProvider>
  ),
};

export const SolidWithLightTheme: StoryObj<typeof meta> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Button {...props}>
        Button
      </Button>
    </KibisisAppProvider>
  ),
};

export const OutlineWithDarkTheme: StoryObj<typeof meta> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Button variant="outline" {...props}>
        Button
      </Button>
    </KibisisAppProvider>
  ),
};

export const OutlineWithLightTheme: StoryObj<typeof meta> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Button variant="outline" {...props}>
        Button
      </Button>
    </KibisisAppProvider>
  ),
};

export default meta;
