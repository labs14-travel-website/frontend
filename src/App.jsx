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
import auth from './utils/auth';

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
    awaitingFavorite: false,
    favorites: [],
    isLoading: false,
  });

  const [user, setUser] = useState({});

  const [features, setFeatures] = useState({
    loading: true,
    flags: {},
  });

  const Feature = feature(features.flags, features.loading);

  // TODO: abstract this into it's own file
  // const logout = () => {
  //   store.remove();

  //   setUser({});

  //   // DEPRECIATE THIS: use `user` on state instead of loggedIn
  //   setState(prevState => ({
  //     ...prevState,
  //     loggedIn: false,
  //     favorites: [],
  //   }));
  // };

  const getFavorites = async () => {
    try {
      const { data: { data: { favorites } } } = await axios({
        url: `${process.env.REACT_APP_ENDPOINT}/gql`,
        method: 'post',
        data: {
          query: `{ 
            favorites {
              name,
              place_id,
              rating,
              picture,
              price,
              id,
            },
          }`,
        },
      });
      setState(prevState => ({
        ...prevState,
        favorites: favorites.map(favorite => ({ ...favorite, placeId: favorite.place_id })),
        isLoading: false,
      }));
    } catch (error) {
      console.log(error) // eslint-disable-line
      if (error.status === 401) auth(setUser).logout();
    }
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

  const addFavorite = async (placeId) => {
    try {
      const { data: { data: { addFavorite: favorite } } } = await axios({
        url: `${process.env.REACT_APP_ENDPOINT}/gql`,
        method: 'post',
        data: {
          query: ` 
          mutation {
           addFavorite (id: "${placeId}") {
              id,
              name,
              picture,
              place_id,
              price,
              rating,
            },
          }`,
        },
      });
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        awaitingFavorite: false,
        favorites: [
          ...state.favorites,
          {
            ...favorite,
            placeId: favorite.place_id,
          },
        ],
      }));
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  const removeFavorite = async (favId) => {
    try {
      await axios({
        url: `${process.env.REACT_APP_ENDPOINT}/gql`,
        method: 'post',
        data: {
          query: `
          mutation {
            removeFavorite (id: ${favId}) {
              id,
              user_id,
              attraction_id
            },
          }`,
        },
      });
      setState(prevState => ({
        ...prevState,
        favorites: state.favorites.filter(favorite => favorite.id !== favId),
      }));
      closeModal();
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
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
          axios.defaults.headers.common['Authorization'] = token; //eslint-disable-line

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
          const initialFavorites = async () => {
            try {
              const { data: { data: { favorites } } } = await axios({
                url: `${process.env.REACT_APP_ENDPOINT}/gql`,
                method: 'post',
                data: {
                  query: `{ 
                    favorites {
                      name,
                      place_id,
                      rating,
                      picture,
                      price,
                      id,
                    },
                  }`,
                },
              });
              setState(prevState => ({
                ...prevState,
                favorites: favorites.map(favorite => ({ ...favorite, placeId: favorite.place_id })),
                isLoading: false,
              }));
            } catch (error) {
              console.log(error) // eslint-disable-line
              if (error.status === 401) auth(setUser).logout();
            }
          };
          initialFavorites();
        } else {
          throw Error('Not Authorized');
        }
      } catch (error) {
        auth(setUser).logout();
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
            profile: true,
            'heart-fav': true,
            'more-button': true,
            cta: true,
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

    axios.defaults.headers.common['Authorization'] = res.tokenId; //eslint-disable-line


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
      getFavorites();
    }
  };

  const responseFail = (res) => {
    console.log(res); // eslint-disable-line
  };

  const showCTA = (favId) => {
    setState({
      ...state,
      awaitingFavorite: favId,
      cta: {
        show: true,
      },
    });
  };

  const hideCTA = () => {
    setState({
      ...state,
      awaitingFavorite: false,
      cta: {
        show: false,
      },
    });
  };


  const wrapper = !(state.modal.show || state.cta.show) ? styles.App : `${styles.App} ${styles.blur}`;

  return (
    <>
      <Nav
        loggedIn={!!user.name}
        logout={auth(setUser).logout}
        responseFail={responseFail}
        responseGoogle={responseGoogle}
        Feature={Feature}
      />
      <div className={wrapper}>
        <Route
          exact
          path="/"
          render={props => (
            <Home
              {...props}
              showModal={showModal}
              Feature={Feature}
              showCTA={showCTA}
              hideCTA={hideCTA}
              loggedIn={!!user.name}
              awaitingFavorite={state.awaitingFavorite}
              addFavorite={addFavorite}
              favorites={state.favorites}
              removeFavorite={removeFavorite}
            />
          )}
        />
        <Route
          exact
          path="/profile"
          render={props => (
            <Profile
              {...props}
              loggedIn={!!user.name}
              user={user}
              showModal={showModal}
              Feature={Feature}
              favorites={state.favorites}
              isLoading={state.isLoading}
              removeFavorite={removeFavorite}
            />
          )}
        />
      </div>

      {state.modal.show && (
        <Modal
          attraction={state.modal.attraction}
          onClose={closeModal}
          showModal={showModal}
          show={state.modal.show}
          Feature={Feature}
          loggedIn={!!user.name}
          showCTA={showCTA}
          hideCTA={hideCTA}
          awaitingFavorite={state.awaitingFavorite}
          favorites={state.favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}
      {state.cta.show && (
        <FavCTA
          responseFail={responseFail}
          responseGoogle={responseGoogle}
          hideCTA={hideCTA}
        />
      )}
    </>
  );
}

export default App;
