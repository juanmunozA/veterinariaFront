import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            paper: mode === 'dark' ? '#121212' : '#fff',
            gradient: mode === 'dark' ? 'linear-gradient(135deg,#0f1724,#02111a)' : 'linear-gradient(135deg,#e6f7ff,#ffffff)'
          }
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppThemeProvider;
