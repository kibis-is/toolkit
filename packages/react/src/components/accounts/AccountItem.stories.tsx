import type { Meta, StoryObj } from '@storybook/react';

// components
import AccountItem from './AccountItem';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TAccountItemProps } from '@/types';

const meta: Meta<typeof AccountItem> = {
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
  component: AccountItem,
  globals: {
    theme: 'dark',
  },
  title: 'Components/AccountItem',
};

export const WithDarkTheme: StoryObj<TAccountItemProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <AccountItem {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TAccountItemProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <AccountItem {...props} />
    </KibisisAppProvider>
  ),
};

export const WithName: StoryObj<TAccountItemProps> = {
  render: ({ account, ...otherProps }) => (
    <KibisisAppProvider>
      <AccountItem
        account={{
          ...account,
          name: 'Main',
        }}
       {...otherProps}
      />
    </KibisisAppProvider>
  ),
};

export const WithDomain: StoryObj<TAccountItemProps> = {
  render: ({ account, ...otherProps }) => (
    <KibisisAppProvider>
      <AccountItem
        account={{
          ...account,
          domainName: {
            names: ['magnetartare.voi'],
            primary: 'magnetartare.voi',
          },
        }}
        {...otherProps}
      />
    </KibisisAppProvider>
  ),
};

export const WithNameAndDomain: StoryObj<TAccountItemProps> = {
  render: ({ account, ...otherProps }) => (
    <KibisisAppProvider>
      <AccountItem
        account={{
          ...account,
          domainName: {
            names: ['magnetartare.voi'],
            primary: 'magnetartare.voi',
          },
          name: 'Main',
        }}
        {...otherProps}
      />
    </KibisisAppProvider>
  ),
};

export const WithColorAndIcon: StoryObj<TAccountItemProps> = {
  render: ({ account, ...otherProps }) => (
    <KibisisAppProvider>
      <AccountItem
        account={{
          ...account,
          color: 'teal.500',
          icon: 'home',
        }}
        {...otherProps}
      />
    </KibisisAppProvider>
  ),
};

export default meta;
