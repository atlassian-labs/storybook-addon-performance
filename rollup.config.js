// @ts-check
import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const input = 'src/storybook-addon-performance.ts';
const umdName = 'storybookAddonPerformance';

export default [
  // Universal module definition (UMD) build
  {
    input,
    output: {
      file: 'dist/storybook-addon-performance.js',
      format: 'umd',
      name: umdName,
    },
    plugins: [
      // Setting development env before running other steps
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      typescript(),
    ],
  },
  // Universal module definition (UMD) build (production)
  {
    input,
    output: {
      file: 'dist/storybook-addon-performance.min.js',
      format: 'umd',
      name: umdName,
    },
    plugins: [
      // Setting production env before running other steps
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      typescript(),
      terser(),
    ],
  },
  // ESM build
  {
    input,
    output: {
      file: 'dist/storybook-addon-performance.esm.js',
      format: 'esm',
    },
    plugins: [typescript()],
  },
  // CommonJS build
  {
    input,
    output: {
      file: 'dist/storybook-addon-performance.cjs.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
];
