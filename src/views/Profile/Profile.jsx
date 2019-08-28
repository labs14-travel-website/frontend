import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Attractions from '../../components/Attractions';
import '../../config/interceptor';

const Profile = ({
  user,
  toggleModal,
  favorites,
  isLoading,
  removeFavorite,
  loggedIn,
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
              toggleModal={toggleModal}
              favorites={favorites}
              loggedIn={loggedIn}
              removeFavorite={removeFavorite}
            />
          )
      }

      </div>
    );
  }

  return <Redirect to="/" />;
};

Profile.defaultProps = {
  user: {
    name: '',
    email: '',
    googleId: '',
  },
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    googleId: PropTypes.string,
  }),
  loggedIn: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
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
