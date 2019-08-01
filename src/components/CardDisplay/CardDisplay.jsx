import React from 'react';
import PropTypes from 'prop-types';

const CardDisplay = ({ location, handleClick }) => (
  <div className="card-display" onClick={() => handleClick(`${location.city}, ${location.country}`)}>
    <h2>{location.city}</h2>
    <div>{location.country}</div>
  </div>
);

CardDisplay.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardDisplay;
