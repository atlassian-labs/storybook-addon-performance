module.exports = {
  stories: ['../examples/**/*.stories.*'],
  addons: ['../dist/esm/register.js'],
  core: {
    builder: 'webpack5',
  },
};
