import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import Nav from './components/Nav';
import Profile from './views/Profile';
import styles from './App.module.scss';
import Home from './views/Home';
import Modal from './components/Modal';
import track from './utils/analytics';
import store from './utils/jwt-store';
import feature from './utils/flaggie';

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    modal: {
      show: false,
      attraction: {},
    },
  });

  const [user, setUser] = useState({});

  const [features, setFeatures] = useState({
    loading: true,
    flags: {},
  });

  const Feature = feature(features.flags, features.loading);

  useEffect(() => {
    const getUserInfo = async (token) => {
      try {
        const userInfo = await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/auth`,
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        );

        console.log('userInfo :', userInfo.data.message);
        // if auth success, decode token and store user info to state
        // check userInfo response, if valid set logged in
        setState(prevState => ({
          ...prevState,
          loggedIn: true,
        }));

        setUser(userInfo);
      } catch (error) {
        // logout
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
            'heart-fav': false,
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
    console.log('removing token');
    store.remove();
    setState(prevState => ({
      ...prevState,
      loggedIn: false,
    }));
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
        <Route exact path="/" render={props => (<Home {...props} showModal={showModal} Feature={Feature} />)} />
        <Route exact path="/profile" render={Profile} />
      </div>

      {state.modal.show && (
        <Modal
          attraction={state.modal.attraction}
          onClose={closeModal}
          showModal={showModal}
          show={state.modal.show}
          Feature={Feature}
        />
      )}
    </>
  );
}

export default App;
