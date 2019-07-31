import React from 'react';
import PropTypes from 'prop-types';

import styles from './CardDisplay.module.scss';

const CardDisplay = ({ location, handleClick }) => (
  <div className={styles.CardDisplay} onClick={() => handleClick(`${location.city}, ${location.country}`)}>
    <h2 className={styles.CardDisplay__city}>{location.city}</h2>
    <div className={styles.CardDisplay__country}>{location.country}</div>
  </div>
);

CardDisplay.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardDisplay;
