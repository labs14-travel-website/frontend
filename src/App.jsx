import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Mixpanel as mp } from './utils/mixpanel';
import ga from 'react-ga';
import axios from "axios";

import Users from "./Users";
import store from "./utils/jwt-store";
import style from "./App.module.scss";

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    clientId: process.env.REACT_APP_OAUTH_GOOGLE_ID,
  });

  useEffect(() => {
    const token = store.get();
    if (!!token) {
      setState(state => ({
        ...state,
        loggedIn: true
      }));
    }
    
    // DISCUSSION: Should this be moved to env vars? E.g. ga.initialize(process.env.GA_ID)
    /*
    Alternatively we could just run in production--if there is no benefit to getting analytics on staging
    if (process.env.DB_ENV === 'production') {
      ga.initialize('UA-143824465-1');
      
    }
    */
   ga.initialize('UA-143824465-1', { debug: true });
   ga.pageview('/');
   mp.track('Page View', {
     path: '/',
   });
  }, []);

  const responseGoogle = res => {
    store.add(res.tokenId);
    setState(state => ({
      ...state,
      loggedIn: true
    }));
    axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/auth`,
        {},
        {
          headers: {
            Authorization: res.tokenId
          }
        }
      ).then(data => {
        console.log(data);
      });
  };

  const responseFail = res => {
    console.log(res);
  }

  const logout =() => {
    store.remove();   
    setState(state => ({
      ...state,
      loggedIn: false
    }));
  };

  return (
    <div className={style.App}>
      <Users />
      {
        !state.loggedIn
          ? (<GoogleLogin
            clientId={state.clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseFail}
            cookiePolicy={"single_host_origin"}
          />)
          : (<GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />)
      }
    </div>
  );
}

export default App;
