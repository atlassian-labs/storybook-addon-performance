import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/!(*.d).(ts|tsx)'],
  format: ['cjs'],
  dts: true,
  clean: true,
  minify: false,
  platform: 'node',
});
