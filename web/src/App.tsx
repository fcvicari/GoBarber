import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
