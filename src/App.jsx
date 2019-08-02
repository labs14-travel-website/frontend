import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import track from './utils/analytics';
import store from './utils/jwt-store';
import style from './App.module.scss';
import Search from './components/Search';
// import PopularDestinations from './components/PopularDestinations';
// import TestModal from './components/Modal/modalTest';
// import CardDisplay from './components/CardDisplay';
import PopularDestinations from './components/PopularDestinations';
import Attractions from './components/Attractions';


function App() {
  const [state, setState] = useState({
    loggedIn: false,
    clientId: process.env.REACT_APP_OAUTH_GOOGLE_ID,
    attractions: [],
    isLoading: false,
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

  // performs action when user clicks the ROAM button
  const handleSearch = (destination) => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
    }));
    // request to backend that will request to API and send back the data
    axios.get(`${process.env.REACT_APP_ENDPOINT}/a?q=${destination}`)
      .then(({ data: { places } }) => {
        setState(prevState => ({
          ...prevState,
          attractions: places,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);  // eslint-disable-line
      });
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
      <Search handleSearch={handleSearch} />
      {
        !state.attractions.length > 0 && !state.isLoading
          ? <PopularDestinations />
          : <Attractions attractions={state.attractions} isLoading={state.isLoading} />
      }
    </div>
  );
}

export default App;
