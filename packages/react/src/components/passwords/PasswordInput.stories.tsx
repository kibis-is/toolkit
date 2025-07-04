import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

// components
import PasswordInput from './PasswordInput';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TPasswordInputProps } from '@/types';

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  decorators: [
    (Story) => <Story />,
  ],
  globals: {
    theme: 'dark',
  },
  title: 'Components/PasswordInput',
};

export const WithDarkTheme: StoryObj<TPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <PasswordInput {...props} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TPasswordInputProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Box w="80">
        <PasswordInput {...props} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const Disabled: StoryObj<TPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <PasswordInput {...props} disabled={true} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithRequired: StoryObj<TPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <PasswordInput {...props} required={true} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithHint: StoryObj<TPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <PasswordInput {...props} hint="Your password must be at least 8 characters" />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithError: StoryObj<TPasswordInputProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <PasswordInput {...props} required={true} error="This field is required" />
      </Box>
    </KibisisAppProvider>
  ),
};

export default meta;
