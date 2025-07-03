import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// components
import AccountSelect from './AccountSelect';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { IAccount, TAccountSelectProps } from '@/types';

const meta: Meta<typeof AccountSelect> = {
  args: {
    accounts: [
      {
        address: 'XKGAAAH6CEEJLYYR5FYT6YAKH4CGEG4CCWMWACVX7666ACVZRSUNQD5KFQ',
        color: null,
        domainName: {
          names: [
            'magnetartare.voi'
          ],
          primary: 'magnetartare.voi',
        },
        icon: null,
        name: 'Account 1',
      },
      {
        address: 'XKGAAAH6CEEJLYYR5FYT6YAKH4CGEG4CCWMWACVX7666ACVZRSUNQD5KFQ',
        color: null,
        domainName: {
          names: [],
          primary: null,
        },
        icon: null,
        name: 'Account 1',
      },
    ],
  },
  component: AccountSelect,
  decorators: [
    (Story, parameters) => {
      // const [account, setAccount] = useState<IAccount>(parameters.args.accounts[0]);
      // console.log(account);

      return <Story />;
    },
  ],
  globals: {
    theme: 'dark',
  },
  title: 'Components/AccountSelect',
};

export const WithDarkTheme: StoryObj<TAccountSelectProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <AccountSelect {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TAccountSelectProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <AccountSelect {...props} />
    </KibisisAppProvider>
  ),
};

export default meta;
