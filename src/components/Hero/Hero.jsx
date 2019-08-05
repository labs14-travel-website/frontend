import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.scss';

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
