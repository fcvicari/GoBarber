import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
