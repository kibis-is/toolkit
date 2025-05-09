import type { Meta, StoryObj } from '@storybook/react';

// components
import AccountAvatar from './AccountAvatar';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TAccountAvatarProps } from '@/types';

const meta: Meta<typeof AccountAvatar> = {
  args: {
    account: {
      address: 'XKGAAAH6CEEJLYYR5FYT6YAKH4CGEG4CCWMWACVX7666ACVZRSUNQD5KFQ',
      color: null,
      domainName: {
        names: [],
        primary: null,
      },
      icon: null,
      name: null,
    },
  },
  component: AccountAvatar,
  globals: {
    theme: 'dark',
  },
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
  render: ({ account, ...otherProps }) => (
    <KibisisAppProvider>
      <AccountAvatar
          account={{
          ...account,
          icon: 'beer',
        }}
        {...otherProps}
      />
    </KibisisAppProvider>
  ),
};

export const WithColor: StoryObj<TAccountAvatarProps> = {
  render: ({ account, ...otherProps }) => (
    <KibisisAppProvider>
      <AccountAvatar
        account={{
          ...account,
          color: 'green.500',
          icon: 'voi',
        }}
        {...otherProps}
      />
    </KibisisAppProvider>
  ),
};

export const WithBadges: StoryObj<TAccountAvatarProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <AccountAvatar
        badges={{
          rekeyed: true,
          watch: true,
        }}
        {...props}
      />
    </KibisisAppProvider>
  ),
};

export default meta;
