import type { Meta, StoryObj } from '@storybook/react';
import { IoLockClosedOutline } from 'react-icons/io5';

// components
import CircularProgressWithIcon from './CircularProgressWithIcon';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { ICircularProgressWithIconProps } from '@/types';

const meta: Meta<typeof CircularProgressWithIcon> = {
  args: {
    icon: IoLockClosedOutline,
  },
  component: CircularProgressWithIcon,
  globals: {
    theme: 'dark',
  },
  title: 'Components/CircularProgressWithIcon',
};

export const WithDarkTheme: StoryObj<ICircularProgressWithIconProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <CircularProgressWithIcon {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<ICircularProgressWithIconProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <CircularProgressWithIcon {...props} />
    </KibisisAppProvider>
  ),
};

export const ProgressWithDarkTheme: StoryObj<ICircularProgressWithIconProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <CircularProgressWithIcon progress={[33, 100]} progressColor="green.500" {...props} />
    </KibisisAppProvider>
  ),
};

export const ProgressWithLightTheme: StoryObj<ICircularProgressWithIconProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <CircularProgressWithIcon progress={[33, 100]} progressColor="green.500" {...props} />
    </KibisisAppProvider>
  ),
};

export default meta;
