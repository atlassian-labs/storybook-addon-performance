module.exports = {
  stories: ['../examples/**/*.stories.*'],
  addons: ['../dist/esm/register.js'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    docsPage: 'automatic'
  }
};