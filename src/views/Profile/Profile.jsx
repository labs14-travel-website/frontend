import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Attractions from '../../components/Attractions';
import '../../config/interceptor';

const Profile = ({
  user,
  showModal,
  Feature,
  favorites,
  isLoading,
  removeFavorite,
}) => {
  if (user.name) {
    return (
      <div>
        <h1>{user.name}</h1>

        {
        isLoading
          ? <h1>Hello, I am Loading...</h1>
          : (
            <Attractions
              attractions={favorites}
              isLoading={isLoading}
              showModal={showModal}
              Feature={Feature}
              favorites={favorites}
              removeFavorite={removeFavorite}
            />
          )
      }

      </div>
    );
  }

  return <Redirect to="/" />;
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
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default Profile;
