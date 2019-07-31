import React from 'react';
import PropTypes from 'prop-types';

import styles from './CardDisplay.module.scss';

const CardDisplay = ({ location, handleClick }) => (
  <div className={styles.CardDisplay} onClick={() => handleClick(`${location.city}, ${location.country}`)}>
    <h2>{location.city}</h2>
    <div>{location.country}</div>
  </div>
);

CardDisplay.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardDisplay;
