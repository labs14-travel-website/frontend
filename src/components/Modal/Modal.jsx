import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import Ratings from '../Ratings';
import PriceRating from '../PriceRating';

const Modal = (props) => {
  const {
    onClose,
    show,
    children,
    attraction,
  } = props;

  if (!show) {
    return null;
  }

  const modalPicture = `${attraction.picture.split('-w400')[0]}-w1200`; // eslint-disable-line

  const style = {
    background: `url('${modalPicture}') 50% 50% / cover`,
  };

  return (
    <div className={styles.Modal_wrapper} onClick={e => onClose(e)}>
      <div className={styles.Modal} id="modal">
        <div className={styles.Modal__image} style={style} />
        <div className={styles.Modal__information}>
          <h2>{attraction.name}</h2>
          <div className={styles.Ratings}>
            <Ratings rating={attraction.rating} />
          </div>
          <div className={styles.PriceRating}>
            <PriceRating price={attraction.price ? attraction.price : 1} />
          </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.toggleButton}
              onClick={e => onClose(e)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  attraction: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      price: PropTypes.number,
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default Modal;
