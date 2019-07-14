import React from 'react';
import ReactDOM from 'react-dom';
import * as sentry from '@sentry/browser';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const env = process.env.REACT_APP_ENV;

if (env === 'production' || env === 'staging') {
  sentry.init({ dsn: 'https://519400a20ade4cad917f9c8b45c6788d@sentry.io/1504297' });
}

ReactDOM.render((
  <App />
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
