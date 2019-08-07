import React, { useState, useEffect } from 'react';
import axios from 'axios';
import track from './utils/analytics';
import store from './utils/jwt-store';
import styles from './App.module.scss';
import Search from './components/Search';
// import PopularDestinations from './components/PopularDestinations';
// import TestModal from './components/Modal/modalTest';
// import CardDisplay from './components/CardDisplay';
import Nav from './components/Nav';
import PopularDestinations from './components/PopularDestinations';
import Attractions from './components/Attractions';
import Hero from './components/Hero/Hero';
import Modal from './components/Modal/Modal';

axios.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      env: process.env.REACT_APP_ENV || 'development',
    },
  };

  return newConfig;
});

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    clientId: process.env.REACT_APP_OAUTH_GOOGLE_ID,
    attractions: [],
    destination: '',
    isLoading: false,
    modal: {
      show: false,
      attraction: {},
    },
    noResults: false,
  });

  useEffect(() => {
    const token = store.get();
    if (token) {
      setState(prevState => ({
        ...prevState,
        loggedIn: true,
      }));
    }

    // TODO: This is temporary tracking to validate setup
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
      destination,
    }));
    // request to backend that will request to API and send back the data
    axios.get(`${process.env.REACT_APP_ENDPOINT}/places/details/${destination}`)
      .then(({ data: { places } }) => {
        if (places) {
          setState(prevState => ({
            ...prevState,
            attractions: places,
            isLoading: false,
            noResults: false,
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            attractions: [],
            isLoading: false,
            noResults: true,
          }));
        }
      })
      .catch((error) => {
        console.log(error, 'here');  // eslint-disable-line
      });
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

  const classTest = !state.modal.show ? styles.App : `${styles.App} ${styles.blur}`;

  return (
    <>
      <div className={classTest}>
        <Nav
          loggedIn={state.loggedIn}
          logout={logout}
          responseFail={responseFail}
          responseGoogle={responseGoogle}
        />
        <Hero background="/images/hero.jpg">
          {
            !state.noResults && state.destination
              ? <span className={styles.App__destination}>{state.destination}</span>
              : <Search handleSearch={handleSearch} noResults={state.noResults} />
          }
        </Hero>
        {
          !state.attractions.length > 0 && !state.isLoading
            ? <PopularDestinations handleSearch={handleSearch} noResults={state.noResults} />
            : (
              <Attractions
                attractions={state.attractions}
                isLoading={state.isLoading}
                showModal={showModal}
              />
            )
        }
      </div>

      {state.modal.show && (
        <Modal
          attraction={state.modal.attraction}
          onClose={closeModal}
          showModal={showModal}
          show={state.modal.show}
        >
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, eum! Impedit distinctio,
            laudantium, deleniti similique dolores mollitia, atque labore vero unde porro velit
            sint. Distinctio ab perspiciatis enim temporibus debitis!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, eum! Impedit distinctio,
            laudantium, deleniti similique dolores mollitia, atque labore vero unde porro velit
            sint. Distinctio ab perspiciatis enim temporibus debitis!
          </p>
        </Modal>
      )}
    </>
  );
}

export default App;
