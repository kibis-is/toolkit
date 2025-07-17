import { defineConfig, mergeConfig } from 'vitest/config';

// configs
import defaultConfig from './vite.default.config';

export default mergeConfig(
  defaultConfig,
  defineConfig({
    test: {
      dir: 'src',
      passWithNoTests: true,
      testTimeout: 60000,
    },
  })
);
