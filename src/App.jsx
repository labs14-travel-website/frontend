import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import track from './utils/analytics';
import store from './utils/jwt-store';
import style from './App.module.scss';
import Search from './components/Search';
// import PopularDestinations from './components/PopularDestinations';
import Users from './Users';
// import TestModal from './components/Modal/modalTest';

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    clientId: process.env.REACT_APP_OAUTH_GOOGLE_ID,
  });

  useEffect(() => {
    const token = store.get();
    if (token) {
      setState(prevState => ({
        ...prevState,
        loggedIn: true,
      }));
    }

    // TODO: This is temporary tracking to validate setup.
    track.pageview('/');
    track.event({
      category: 'Main',
      action: 'Generic Action',
    });
  }, []);

  const responseGoogle = (res) => {
    store.add(res.tokenId);
    setState(prevState => ({
      ...prevState,
      loggedIn: true,
    }));
    axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/api/auth`,
        {},
        {
          headers: {
            Authorization: res.tokenId,
          },
        },
      )
      .then((data) => {
        console.log(data); // eslint-disable-line
      });
  };

  const responseFail = (res) => {
    console.log(res); // eslint-disable-line
  };

  const logout = () => {
    store.remove();
    setState(prevState => ({
      ...prevState,
      loggedIn: false,
    }));
  };

  return (
    <div className={style.App}>
      {
        !state.loggedIn
          ? (
            <GoogleLogin
              clientId={state.clientId}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseFail}
              cookiePolicy="single_host_origin"
            />
          )
          : (<GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />)
      }

      <Search />
      {/* <PopularDestinations /> */}
      <Users />
      {/* <TestModal /> */}
    </div>
  );
}

export default App;
