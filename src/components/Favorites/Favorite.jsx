import React from 'react';
import './Favorite.modules.scss';
import PropTypes from 'prop-types';

/**
   * @description Returns heart empty if favorite is not within favorites and heart full if
   * favorite is present within favorites.
   * @param {string} favorite unique id associated with an attraction
   * @param {bool} showCTA whether or not to show the login call to action
   * @param {bool} loggedIn whether or not user is logged in
   * @param {bool, string} awaitingFavorite false if false, place ID if true. 
   * If there is a place ID, it will favorite the attraction on login
   * @param {func} addFavorite adds attraction to favorites
   * @param {func} removeFavorite removes attraction from favorites
   */

const Favorite = ({
  favorite: { placeId }, showCTA, loggedIn,
  awaitingFavorite, addFavorite, favorites, removeFavorite,
}) => {
  const favList = favorites && favorites.map(fav => fav.place_id);
  if (loggedIn && awaitingFavorite && (placeId === awaitingFavorite)) {
    addFavorite(awaitingFavorite);
  }

  const handleAddFavorite = () => {
    if (!loggedIn) {
      showCTA(placeId);
      // TODO look how to make showCTA a promise so the favorite
      // functionality will work after successfully logged in
    } else {
      addFavorite(placeId);
    }
  };

  const handleRemoveFavorite = () => {
    const fav = favorites.filter(favorite => favorite.placeId === placeId);
    removeFavorite(fav[0].id);
  };

  return (
    <>
      {
      favorites && favList.includes(placeId) ? <i onClick={handleRemoveFavorite} className="fas fa-heart fa-2x" id="heart-ol" />
        : <i onClick={handleAddFavorite} className="far fa-heart fa-2x" id="heart-full" />

      }
    </>

  );
};

Favorite.propTypes = {
  // favId: PropTypes.string.isRequired,
  showCTA: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  awaitingFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  removeFavorite: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  favorite: PropTypes.shape(
    {
      placeId: PropTypes.string,
    },
  ).isRequired,
};


export default Favorite;
