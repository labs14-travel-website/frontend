import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const Profile = ({ user }) => {
  console.log('abc'); // eslint-disable-line
  if (user.name) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Favorites</h2>
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
};

export default Profile;
