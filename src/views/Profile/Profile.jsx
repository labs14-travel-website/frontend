import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
// import FavoritesDisplay from '../../components/FavoritesDisplay';
import Attractions from '../../components/Attractions';
import '../../config/interceptor';

const Profile = ({ user, showModal, Feature }) => {
  const [state, setState] = useState({
    clientId: process.env.REACT_APP_OAUTH_GOOGLE_ID,
    attractions: [],
    isLoading: false,
    noResults: false,
  });


  const getFavorites = async () => {
    try {
      const { data: { places } } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/places/details/Hawaii`);
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
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  if (user.name) {
    return (
      <div>
        <h1>{user.name}</h1>

        {
        !state.attractions.length > 0 && !state.isLoading
          ? <h1>Hello, I am Loading...</h1>
          : (
            <Attractions
              attractions={state.attractions}
              isLoading={state.isLoading}
              showModal={showModal}
              Feature={Feature}
            />
          )
      }

      </div>
    );
  }

  return <Redirect to="/profile" />;
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    googleId: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  Feature: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
};

export default Profile;
