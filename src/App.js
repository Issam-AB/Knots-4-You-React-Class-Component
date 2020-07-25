import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './store';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';
import history from './services/history';
import './App.css';

function App() {
  return (
    <Provider store= {store}>
       <Router history={history}>
         <GlobalStyle />
         <Header />
         <Routes />
         <ToastContainer autoClose={3000} />
       </Router>
    </Provider>
  );
}

export default App;
