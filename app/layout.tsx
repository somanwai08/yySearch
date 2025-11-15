import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { theme } from './theme';
import { CartProvider } from './(services)/CartContext';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>{props.children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
