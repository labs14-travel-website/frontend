import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.scss';

/**
 * @description Styled div containing background image for search.
 * @param {element} children search bar component that is displayed
 * @param {string} background url of the background image displayed
 */

const Hero = ({ children, background }) => {
  const style = {
    background: `url('${background}') 50% 50% / cover`,
  };

  return (
    <div className={styles.Hero} style={style}>
      <div className={styles.container}>
        <div className={styles.Hero__destination}>{children}</div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  children: PropTypes.element.isRequired,
  background: PropTypes.string.isRequired,
};

export default Hero;
