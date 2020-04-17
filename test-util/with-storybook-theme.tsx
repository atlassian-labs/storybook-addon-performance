import { convert, createGlobal, Global, Theme, ThemeProvider, themes } from '@storybook/theming';
import React from 'react';

export default function WithStorybookTheme({
  children,
  mode = 'normal',
}: {
  children: React.ReactNode;
  mode?: 'normal' | 'dark';
}) {
  const theme: Theme = convert(mode === 'dark' ? themes.dark : themes.normal);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={createGlobal(theme)} />
        {children}
      </ThemeProvider>
    </>
  );
}
