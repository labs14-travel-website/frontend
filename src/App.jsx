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
import FavCTA from './components/FavCTA/FavCTA';
import auth from './utils/auth';

function App() {
  const [state, setState] = useState({
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

  // TODO: Shouldn't need a loading here !Object.keys(flags).length
  const [features, setFeatures] = useState({
    loading: true,
    flags: {},
  });

  const Feature = feature(features.flags, features.loading);

  // TODO: This should be toggleModal
  // const showModal = async (place) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     modal: {
  //       ...prevState.modal,
  //       show: true,
  //       attraction: place,
  //     },
  //   }));
  // };

  // const closeModal = () => {
  //   setState(prevState => ({
  //     ...prevState,
  //     modal: {
  //       ...prevState.modal,
  //       show: false,
  //       attraction: {},
  //     },
  //   }));
  // };

  const toggleModal = async (attraction = {}) => {
    setState(prevState => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        show: !prevState.modal.show,
        attraction,
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
      toggleModal();
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  useEffect(() => {
    const getUserInfo = async (token) => {
      try {
        await auth(setUser).login({ tokenId: token });
      } catch (error) {
        // Inform user auth failed
      }
    };

    const token = store.get();

    if (token) {
      getUserInfo(token);
    }

    // TODO: This is temporary tracking to validate setup
    track.pageview('/');

    // TODO: LOL Remove this, it is giving us 0% bounce
    track.event({
      category: 'Main',
      action: 'Generic Action',
    });
  }, []);

  // Handles loading feature flags
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

  // Handles getting user favorites if they are logged in.
  useEffect(() => {
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
          cta: {
            ...prevState.cta,
            show: false,
          },
        }));
      } catch (error) {
        console.log(error) // eslint-disable-line
        if (error.status === 401) auth(setUser).logout();
      }
    };

    if (user.googleId) {
      getFavorites();
    } else {
      setState(prevState => ({
        ...prevState,
        favorites: [],
      }));
    }
  }, [user.googleId]);

  /**
   * Handles toggling a login CTA with an optional favorite ID to add once logged in
   * @param {number} [favId] Optional favorite id to add for the loginCTA
   */
  const toggleCTA = (favId = false) => {
    setState(prevState => ({
      ...prevState,
      awaitingFavorite: favId,
      cta: {
        ...prevState.cta,
        show: !prevState.cta.show,
      },
    }));
  };

  const AppClasses = !(state.modal.show || state.cta.show)
    ? styles.App
    : `${styles.App} ${styles.blur}`;

  return (
    <>
      <Nav
        loggedIn={!!user.name}
        logout={auth(setUser).logout}
        responseFail={auth().fail}
        responseGoogle={auth(setUser).login}
        Feature={Feature}
      />
      <div className={AppClasses}>
        <Route
          exact
          path="/"
          render={props => (
            <Home
              {...props}
              toggleModal={toggleModal}
              toggleCTA={toggleCTA}
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
              toggleModal={toggleModal}
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
          onClose={toggleModal}
          showModal={toggleModal}
          show={state.modal.show}
          loggedIn={!!user.name}
          toggleCTA={toggleCTA}
          awaitingFavorite={state.awaitingFavorite}
          favorites={state.favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}
      {state.cta.show && (
        <FavCTA
          responseFail={auth().fail}
          responseGoogle={auth(setUser).login}
          hideCTA={toggleCTA}
        />
      )}
    </>
  );
}

export default App;
