/**
 * @type {import('@storybook/react-vite').StorybookConfig}
 */
module.exports = {
  stories: ['../../stories/**/*.stories.*'],
  addons: ['storybook-addon-performance'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
