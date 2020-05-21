import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from "react-cookie";


import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById('root')
);


serviceWorker.unregister();
