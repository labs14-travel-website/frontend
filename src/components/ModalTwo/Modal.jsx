import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import Ratings from '../Ratings';
import PriceRating from '../PriceRating';
import Favorite from '../Favorites';

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
const PlaceDetails = (props) => {
  const [description, setDescription] = useState('');
  const {
    attraction,
    loggedIn,
    toggleCTA,
    awaitingFavorite,
    favorites,
    addFavorite,
    removeFavorite,
  } = props;

  // BUG: Console throwing invalid prop type awaitingFavorite in following flow:
  // Be logged out > Favorite via modal > Login

  // useEffect(() => {
  //   const getDescription = async () => {
  //     try {
  //       const { data } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/places/info/${attraction.name}`);
  //       setDescription(data.description || `${attraction.name} is a Tourist Attraction.`);
  //     } catch (error) {
  //       setDescription(`${attraction.name} is a Tourist Attraction.`);
  //     }
  //   };

  //   getDescription();
  // }, [attraction.name]);

  const { match: { params: { placeid: placeId } } } = props;
  const [place, setPlace] = useState({
    name: 'Loading...',
    price: 0,
    rating: 0,
    description: '',
  });

  useEffect(() => {
    const getPlaceDetails = async (id) => {
      const details = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id,
            name: 'The Awesome Place',
            rating: 3.8,
            price: 2,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, maiores, officia molestias quos at repellendus magni unde laborum dolores, impedit numquam? Illum soluta porro consequuntur aliquid eos quam similique veniam?',
          });
        }, 3500);
      });

      setPlace(details);
    };

    getPlaceDetails(placeId);
  }, [placeId]);

  const handleOnClose = () => {
    props.history.push(props.match.url.split('/place/')[0]);
  };

  useEffect(() => {
    document.addEventListener('keyup', handleOnClose);
    return () => {
      document.removeEventListener('keyup', handleOnClose);
    };
  });

  const [heart, setHeart] = useState(false);
  useEffect(() => {
    if (favorites.filter(favorite => favorite.placeId === placeId).length) {
      setHeart(true);
    }
  }, [favorites, placeId]);

  // const modalPicture = `${attraction.picture.split('-w400')[0]}-w1200`; // eslint-disable-line

  const style = {
    // background: `url('${modalPicture}') 50% 50% / cover`,
  };

  return (
    <div className={styles.Modal_wrapper}>
      <div className={styles.Modal_overlay} onClick={handleOnClose} />
      <div className={styles.Modal} id="modal">
        <div className={styles.Modal__image} style={style} />
        <div className={styles.Modal__information}>
          <h2>{place.name}</h2>
          {
            heart ? (<span>&lt;3</span>) : (<span>&lt;/3</span>)
          }
          {/* <Favorite
            favorite={attraction}
            loggedIn={loggedIn}
            showCTA={toggleCTA}
            hideCTA={toggleCTA}
            awaitingFavorite={awaitingFavorite}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          /> */}

          <div className={styles.Ratings}>
            <Ratings rating={place.rating} />
          </div>

          <div className={styles.PriceRating}>
            <PriceRating price={place.price ? place.price : 1} />
          </div>

          <div className={styles.Modal__information__content}>
            {
              place.description
                ? <p>{place.description}</p>
                : <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            }
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.toggleButton}
              onClick={handleOnClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PlaceDetails.propTypes = {
  // attraction: PropTypes.shape({
  //   name: PropTypes.string,
  //   rating: PropTypes.number,
  //   price: PropTypes.number,
  //   placeId: PropTypes.string,
  //   picture: PropTypes.string,
  //   types: PropTypes.arrayOf(PropTypes.string),
  // }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  toggleCTA: PropTypes.func.isRequired,
  awaitingFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  addFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      place_id: PropTypes.string,
      rating: PropTypes.number,
      picture: PropTypes.string,
      price: PropTypes.number,
      id: PropTypes.number,
    }),
  ).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default PlaceDetails;
