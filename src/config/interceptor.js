import axios from 'axios';

axios.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      env: process.env.REACT_APP_ENV || 'production',
    },
  };

  return newConfig;
});
