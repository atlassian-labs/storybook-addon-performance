import {
  background,
  color,
  convert,
  createGlobal,
  Global,
  ThemeProvider,
  themes,
  typography,
} from '@storybook/theming';
import React from 'react';

export default function WithStorybookTheme(props: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={createGlobal({ color, typography, background })} />
      <ThemeProvider theme={convert(themes.normal)}>{props.children}</ThemeProvider>
    </>
  );
}
