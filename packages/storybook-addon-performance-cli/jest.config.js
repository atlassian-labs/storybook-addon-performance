module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  modulePathIgnorePatterns: ['/dist/'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
