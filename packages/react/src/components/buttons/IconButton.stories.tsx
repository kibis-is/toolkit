import type { Meta, StoryObj } from '@storybook/react';
import { IoSearchOutline } from 'react-icons/io5';

// components
import IconButton from './IconButton';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TIconButtonProps } from '@/types';

const meta: Meta<typeof IconButton> = {
  args: {
    icon: IoSearchOutline,
  },
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
  component: IconButton,
  globals: {
    theme: 'dark',
  },
  title: 'Components/IconButton',
};

export const WithDarkTheme: StoryObj<TIconButtonProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <IconButton {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TIconButtonProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <IconButton {...props} />
    </KibisisAppProvider>
  ),
};

export default meta;
