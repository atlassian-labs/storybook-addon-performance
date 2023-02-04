module.exports = {
  stories: ['../../stories/**/*.stories.*'],
  addons: ['storybook-addon-performance'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    docsPage: 'automatic'
  }
};
