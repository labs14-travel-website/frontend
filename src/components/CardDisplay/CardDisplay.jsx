import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardDisplay.module.scss';

/** @description CardDisplay takes in props and
* returns a card with the city and country of the given location
*/

const CardDisplay = ({ location, handleClick }) => {
  const style = {
    background: `url(${location.img})`,
  };
  return (
    <div style={style} className={styles.card_display} onClick={() => handleClick(`${location.city}, ${location.country}`)}>
      <h2 className="city">{location.city}</h2>
      <div>{location.country}</div>
    </div>
  );
};

CardDisplay.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardDisplay;
