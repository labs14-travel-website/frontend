import React, { useState, useEffect } from "react";
import Users from "./Users";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";
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
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />)
          : (<GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />)
      }
    </div>
  );
}

export default App;
