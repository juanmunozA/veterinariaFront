import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa la nueva API de React 18
import App from './App';
import AppThemeProvider from './theme/AppTheme';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot en lugar de render
root.render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
