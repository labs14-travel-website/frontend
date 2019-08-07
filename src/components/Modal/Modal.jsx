import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import Ratings from '../Ratings';
import PriceRating from '../PriceRating';

/**
 * @description Displays a modal that pulls individual place and
 * attraction data from the API. Includes price and rating
 * indicators, along with the place name, a description, and a photo.
 * Also includes a button to close the modal.
 * @param {function} onClose function that closes the modal
 * @param {boolean} show true or false value that will show or not show the modal
 * @param {element} children could be any element to display inside modal
 * @param {object[]} attraction array of attraction data for modal to display
 */
const Modal = (props) => {
  const [description, setDescription] = useState('');
  const {
    onClose,
    show,
    // children,
    attraction,
  } = props;

  useEffect(() => {
    const getDescription = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/places/info/${attraction.name}`);
        setDescription(data.description || `${attraction.name} is a Tourist Attraction.`);
      } catch (error) {
        setDescription(`${attraction.name} is a Tourist Attraction.`);
      }
    };

    getDescription();
  }, [attraction.name]);

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
          <div className={styles.Modal__information__content}>
            {
              description
                ? <p>{description}</p>
                : <Loader type="Puff" color="#00BFFF" height="100" width="100" />
            }
          </div>
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
  // children: PropTypes.element.isRequired,
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
