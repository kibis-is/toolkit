import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

// components
import StrengthMeter from './StrengthMeter';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TStrengthMeterProps } from '@/types';

const meta: Meta<typeof StrengthMeter> = {
  args: {
    score: 2,
  },
  component: StrengthMeter,
  decorators: [
    (Story) => <Story />,
  ],
  globals: {
    theme: 'dark',
  },
  title: 'Components/StrengthMeter',
};

export const WithDarkTheme: StoryObj<TStrengthMeterProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <Box w="80">
        <StrengthMeter {...props} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TStrengthMeterProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <Box w="80">
        <StrengthMeter {...props} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithHighestStrength: StoryObj<TStrengthMeterProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider>
      <Box w="80">
        <StrengthMeter {...props} score={5} />
      </Box>
    </KibisisAppProvider>
  ),
};

export const WithLowestStrength: StoryObj<TStrengthMeterProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider>
      <Box w="80">
        <StrengthMeter {...props} score={0} />
      </Box>
    </KibisisAppProvider>
  ),
};

export default meta;
