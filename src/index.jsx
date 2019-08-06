import React from 'react';
import ReactDOM from 'react-dom';
import * as sentry from '@sentry/browser';
// TODO This should probably be updated to similar init as react/mixpanel
import FullStory from 'react-fullstory';

import './index.module.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const env = process.env.REACT_APP_ENV;

if (env === 'production' || env === 'staging') {
  sentry.init({ dsn: 'https://519400a20ade4cad917f9c8b45c6788d@sentry.io/1504297' });
}

ReactDOM.render((
  <>
    <FullStory org={process.env.REACT_APP_FS_TOKEN} />
    <App />
  </>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
