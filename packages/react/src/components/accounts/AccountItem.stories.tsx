import type { Meta, StoryObj } from '@storybook/react';

// components
import AccountItem from './AccountItem';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TAccountItemProps } from '@/types';

const meta: Meta<typeof AccountItem> = {
  args: {
    address: 'XKGAAAH6CEEJLYYR5FYT6YAKH4CGEG4CCWMWACVX7666ACVZRSUNQD5KFQ',
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
  render: (props) => (
    <KibisisAppProvider>
      <AccountItem name="Main" {...props} />
    </KibisisAppProvider>
  ),
};

export const WithDomain: StoryObj<TAccountItemProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <AccountItem domainName="magnetartare.voi" {...props} />
    </KibisisAppProvider>
  ),
};

export const WithNameAndDomain: StoryObj<TAccountItemProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <AccountItem domainName="magnetartare.voi" name="Main" {...props} />
    </KibisisAppProvider>
  ),
};

export const WithColorAndIcon: StoryObj<TAccountItemProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <AccountItem color="teal.500" icon="home" {...props} />
    </KibisisAppProvider>
  ),
};

export default meta;
