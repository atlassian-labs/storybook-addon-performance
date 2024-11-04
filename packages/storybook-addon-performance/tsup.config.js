import { globalPackages } from '@storybook/manager/globals';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/!(*.d).(ts|tsx)'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: false,
  platform: 'browser',
  external: globalPackages,
});
