import React, { Suspense } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const CardDisplay = ({ location }) => (
  <div className="container">

    <Suspense
      fallback={
        <Loader type="Ball-Triangle" color="#00BFFF" height="90" width="60" />
        }
    >
      <h2>{location}</h2>
    </Suspense>
  </div>
);

CardDisplay.propTypes = {
  location: PropTypes.string.isRequired,
};

export default CardDisplay;
