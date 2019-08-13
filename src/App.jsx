import React, { useState } from 'react';
import Nav from './components/Nav';
import axios from 'axios';
import store from './utils/jwt-store';
import Profile from './views/Profile';
import Home from './views/Home';
import { Route } from 'react-router';

function App() {

  const [state, setState] = useState({
    loggedIn: false,
  });

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
    <>
      <Nav
        loggedIn={state.loggedIn}
        logout={logout}
        responseFail={responseFail}
        responseGoogle={responseGoogle}
      />

      <Route exact path='/' render={Home} />
      <Route exact path='/profile' render={Profile} />
    </>
  )
}

export default App;
