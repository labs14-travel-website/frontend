import React from 'react';
import PropTypes from 'prop-types';

import styles from './CardDisplay.module.scss';

const CardDisplay = ({ data, handleOnClick }) => (
  <div className={styles.CardDisplay} onClick={() => handleOnClick(data)}>
    <h2 className={styles.CardDisplay__city}>{data.title}</h2>
    <div className={styles.CardDisplay__country}>{data.body}</div>
  </div>
);

CardDisplay.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default CardDisplay;
