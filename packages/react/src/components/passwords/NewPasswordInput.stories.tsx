import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

// components
import NewPasswordInput from './NewPasswordInput';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TNewPasswordInputProps } from '@/types';

const meta: Meta<typeof NewPasswordInput> = {
  args: {
    score: 2,
  },
  component: NewPasswordInput,
  decorators: [
    (Story) => <Story />,
  ],
  globals: {
    theme: 'dark',
  },
  title: 'Components/NewPasswordInput',
};

export const WithDarkTheme: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <NewPasswordInput {...props} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Box w="80">
        <NewPasswordInput {...props} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const Disabled: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <NewPasswordInput {...props} disabled={true} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithRequired: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <NewPasswordInput {...props} required={true} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithPasswordLink: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <NewPasswordInput {...props} passwordPolicyLink="https://kibis.is/strong-password-policy" />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithError: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <NewPasswordInput
          {...props}
          error="Must be more than 8 characters in length."
          required={true}
        />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithPasswordLinkAndError: StoryObj<TNewPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <NewPasswordInput
          {...props}
          error="Must be more than 8 characters in length."
          passwordPolicyLink="https://kibis.is/strong-password-policy"
          required={true}
        />
      </Box>
    </KibisisAppProvider>
  ),
};

export default meta;
