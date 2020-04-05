module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./test/env-setup.ts'],

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
