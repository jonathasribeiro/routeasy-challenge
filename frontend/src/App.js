import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyle from './styles/global';

import './config/ReactotronConfig';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position="top-center" />
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
