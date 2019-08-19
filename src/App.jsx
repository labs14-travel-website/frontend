import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import decode from 'jwt-decode';
import Nav from './components/Nav';
import Profile from './views/Profile';
import styles from './App.module.scss';
import Home from './views/Home';
import Modal from './components/Modal';
import track from './utils/analytics';
import store from './utils/jwt-store';
import feature from './utils/flaggie';
import FavCTA from './components/FavCTA/FavCTA';

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    modal: {
      show: false,
      attraction: {},
    },
    cta: {
      show: false,
    },
  });

  const [user, setUser] = useState({});

  const [features, setFeatures] = useState({
    loading: true,
    flags: {},
  });

  const Feature = feature(features.flags, features.loading);

  // TODO: abstract this into it's own file
  const logout = () => {
    store.remove();

    setUser({});

    // DEPRECIATE THIS: use `user` on state instead of loggedIn
    setState(prevState => ({
      ...prevState,
      loggedIn: false,
    }));
  };

  useEffect(() => {
    const getUserInfo = async (token) => {
      try {
        const { data: { message: authorization } } = await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/auth`,
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        );

        // if auth success, decode token and store user info to state
        // TODO: Update this response message
        if (authorization === 'success auth') {
          const { name, email, sub: googleId } = decode(token);

          // check userInfo response, if valid set user info
          setUser({
            name,
            email,
            googleId,
          });

          // DEPRECIATE THIS: use `user` on state instead of loggedIn
          setState(prevState => ({
            ...prevState,
            loggedIn: true,
          }));
        } else {
          throw Error('Not Authorized');
        }
      } catch (error) {
        // logout
        logout();
      }
    };

    const token = store.get();

    if (token) {
      getUserInfo(token);
    }

    // TODO: This is temporary tracking to validate setup
    track.pageview('/');
    track.event({
      category: 'Main',
      action: 'Generic Action',
    });
  }, []);

  // For loading feature flags
  useEffect(() => {
    const getFlags = async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            profile: false,
            'heart-fav': true,
            'more-button': true,
          });
        }, 500);
      });

      const flags = await promise;

      setFeatures({
        flags,
        loading: false,
      });
    };

    getFlags();
  }, []);

  const responseGoogle = async (res) => {
    // TODO: Abstract this out to it's own file
    const { data: { message: authorization } } = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/auth`,
      {},
      {
        headers: {
          Authorization: res.tokenId,
        },
      },
    );

    if (authorization === 'success auth') {
      store.add(res.tokenId);
      setState(prevState => ({
        ...prevState,
        loggedIn: true,
        cta: {
          show: false,
        },
      }));
      const { name, email, sub: googleId } = decode(res.tokenId);

      setUser({
        name,
        email,
        googleId,
      });
    }
  };

  const responseFail = (res) => {
    console.log(res); // eslint-disable-line
  };

  const showModal = async (place) => {
    setState(prevState => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        show: true,
        attraction: place,
      },
    }));
  };

  const closeModal = () => {
    setState(prevState => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        show: false,
        attraction: {},
      },
    }));
  };

  const showCTA = () => {
    setState({
      ...state,
      cta: {
        show: true,
      },
    });
  };

  const wrapper = !state.modal.show ? styles.App : `${styles.App} ${styles.blur}`;

  return (
    <>
      <Nav
        loggedIn={state.loggedIn}
        logout={logout}
        responseFail={responseFail}
        responseGoogle={responseGoogle}
        Feature={Feature}
      />
      <div className={wrapper}>
        <Route exact path="/" render={props => (<Home {...props} showModal={showModal} Feature={Feature} showCTA={showCTA} loggedIn={state.loggedIn} />)} />
        <Route exact path="/profile" render={props => (<Profile {...props} user={user} />)} />
      </div>

      {state.modal.show && (
        <Modal
          attraction={state.modal.attraction}
          onClose={closeModal}
          showModal={showModal}
          show={state.modal.show}
          Feature={Feature}
          loggedIn={state.loggedIn}
          showCTA={showCTA}
        />
      )}
      {state.cta.show && (
        <FavCTA
          responseFail={responseFail}
          responseGoogle={responseGoogle}
        />
      )}
    </>
  );
}

export default App;
