import type { Meta, StoryObj } from '@storybook/react';

// components
import AccountAvatar from './AccountAvatar';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TAccountAvatarProps } from '@/types';

const meta: Meta<typeof AccountAvatar> = {
  component: AccountAvatar,
  title: 'Components/AccountAvatar',
};

export const WithDarkTheme: StoryObj<TAccountAvatarProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <AccountAvatar {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TAccountAvatarProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <AccountAvatar {...props} />
    </KibisisAppProvider>
  ),
};

export const WithIcon: StoryObj<TAccountAvatarProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <AccountAvatar icon="beer" {...props} />
    </KibisisAppProvider>
  ),
};

export const WithColor: StoryObj<TAccountAvatarProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <AccountAvatar color="green.500" icon="airplane" {...props} />
    </KibisisAppProvider>
  ),
};

export default meta;
