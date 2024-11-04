module.exports = {
  stories: ['../../stories/**/*.stories.*'],
  addons: ['@storybook/addon-webpack5-compiler-babel', 'storybook-addon-performance'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    docsPage: 'automatic',
  },
};
