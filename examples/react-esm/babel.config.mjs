const config = {
  presets: [
    ['@babel/preset-typescript'],
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
};
export default config;
