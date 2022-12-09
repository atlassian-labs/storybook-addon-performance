const config = {
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

export default config;