module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./test/env-setup.ts'],
  // node_modules is default.
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
