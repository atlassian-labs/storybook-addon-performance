module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  modulePathIgnorePatterns: ['/dist/'],
  transform: {
    '^.+.[tj]sx?$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
};
