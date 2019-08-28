import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardDisplay.module.scss';

/** @description CardDisplay takes in props and
* returns a card with the city and country of the given location
*/
const CardDisplay = ({ data, handleOnClick }) => {
  const style = {
    background: `url(${data.place.picture}) no-repeat 50% 50% / cover`,
  };
  const titleStyle = (data.title.length < 40) && { alignItems: 'center' };
  return (
    <div className={styles.CardDisplay} style={style} onClick={() => handleOnClick(data)}>
      <div className={styles.CardDisplay__info_wrapper}>
        <h2
          className={styles.CardDisplay__city}
          style={{ ...titleStyle }}
        >
          {data.title}
        </h2>
        <div className={styles.CardDisplay__country}>{data.body}</div>
      </div>
    </div>
  );
};

CardDisplay.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default CardDisplay;
