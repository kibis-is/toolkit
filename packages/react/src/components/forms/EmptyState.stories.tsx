import type { Meta, StoryObj } from '@storybook/react';
import { IoSearchOutline } from 'react-icons/io5';

// components
import EmptyState from './EmptyState';

// containers
import { KibisisAppProvider } from '@/providers';

// types
import type { TEmptyStateProps } from '@/types';

const meta: Meta<typeof EmptyState> = {
  args: {
    title: 'No accounts available',
  },
  component: EmptyState,
  globals: {
    theme: 'dark',
  },
  title: 'Components/EmptyState',
};

export const WithDarkTheme: StoryObj<TEmptyStateProps> = {
  globals: {
    theme: 'dark',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="dark">
      <EmptyState {...props} />
    </KibisisAppProvider>
  ),
};

export const WithLightTheme: StoryObj<TEmptyStateProps> = {
  globals: {
    theme: 'light',
  },
  render: (props) => (
    <KibisisAppProvider colorMode="light">
      <EmptyState {...props} />
    </KibisisAppProvider>
  ),
};

export const WithDescription: StoryObj<TEmptyStateProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <EmptyState description="Add an account to view accounts" {...props} />
    </KibisisAppProvider>
  ),
};

export const WithDescriptionAndIcon: StoryObj<TEmptyStateProps> = {
  render: (props) => (
    <KibisisAppProvider>
      <EmptyState
        description="Add an account to view accounts"
        icon={IoSearchOutline}
        {...props}
      />
    </KibisisAppProvider>
  ),
};

export default meta;
