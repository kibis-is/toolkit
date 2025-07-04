import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['./fonts'],
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [tsconfigPaths()],
    }),
};

export default config;
