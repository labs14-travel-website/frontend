import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';
import Search from '../../components/Search';
import PopularDestinations from '../../components/PopularDestinations';
import Attractions from '../../components/Attractions';
import Hero from '../../components/Hero';
import '../../config/interceptor';

function Home({
  showModal,
  // showCTA,
  // hideCTA,
  toggleCTA,
  loggedIn,
  awaitingFavorite,
  addFavorite,
  favorites,
  removeFavorite,
}) {
  const [state, setState] = useState({
    clientId: process.env.REACT_APP_OAUTH_GOOGLE_ID,
    attractions: [],
    destination: '',
    isLoading: false,
    noResults: false,
  });

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


  return (
    <>
      <Hero background="/images/hero.jpg">
        {
          !state.noResults && state.destination
            ? <span className={styles.Hero__basic}>{state.destination}</span>
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
              // showCTA={toggleCTA}
              // hideCTA={toggleCTA}
              toggleCTA={toggleCTA}
              loggedIn={loggedIn}
              awaitingFavorite={awaitingFavorite}
              addFavorite={addFavorite}
              favorites={favorites}
              removeFavorite={removeFavorite}
            />
          )
      }
    </>
  );
}

Home.propTypes = {
  showModal: PropTypes.func.isRequired,
  // showCTA: PropTypes.func.isRequired,
  // hideCTA: PropTypes.func.isRequired,
  toggleCTA: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  awaitingFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  addFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      place_id: PropTypes.string,
      rating: PropTypes.number,
      picture: PropTypes.string,
      price: PropTypes.number,
      id: PropTypes.number,
    }),
  ).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default Home;
