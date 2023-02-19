/**
 * @type {import('@storybook/react-vite').StorybookConfig}
 */
const config = {
  stories: ['../../stories/*.stories.*'],
  addons: ['storybook-addon-performance'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
