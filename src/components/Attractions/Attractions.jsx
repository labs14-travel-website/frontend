import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import CardDisplay from '../CardDisplay';
import styles from './Attractions.module.scss';
import Favorite from '../Favorites';
import Ratings from '../Ratings/Ratings';

/**
 * @description This will display the attraction cards component when they are ready
 */
function Attractions(props) {
  const {
    attractions,
    isLoading,
    toggleModal,
    toggleCTA,
    loggedIn,
    awaitingFavorite,
    addFavorite,
    favorites,
    removeFavorite,
  } = props;

  const handleOnClick = ({ place }) => {
    toggleModal(place);
  };

  const showAttractions = (attractionList) => {
    const elements = attractionList.map(place => (
      <div key={place.placeId} className={styles.Attractions__wrapper__card}>
        <div className={styles.Attractions__wrapper__heart}>
          <Favorite
            favorite={place}
            showCTA={toggleCTA}
            hideCTA={toggleCTA}
            loggedIn={loggedIn}
            awaitingFavorite={awaitingFavorite}
            addFavorite={addFavorite}
            favorites={favorites}
            removeFavorite={removeFavorite}
          />
        </div>
        <CardDisplay
          handleOnClick={handleOnClick}
          data={{
            title: place.name,
            body: [
              <div key={place.placeId} className={styles.Attractions__wrapper__card_rating}>
                <Ratings rating={place.rating} />
              </div>,
            ],
            place,
          }}
        />
      </div>
    ));

    if (attractionList.length % 4 !== 0) {
      for (let i = 0; i < (4 - (attractionList.length % 4)); i += 1) {
        elements.push(<div key={i} className={styles.CardSpacer} />);
      }
    }

    return elements;
  };

  return (
    <>
      <div className={styles.Attractions__wrapper}>
        {
          !isLoading
            ? attractions && showAttractions(attractions)
            : (
              <div className={styles.Loader}>
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            )
        }
      </div>
    </>
  );
}

Attractions.defaultProps = {
  toggleCTA: () => true,
  addFavorite: () => true,
  awaitingFavorite: false,
};

Attractions.propTypes = {
  attractions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleCTA: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired,
  awaitingFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default Attractions;
