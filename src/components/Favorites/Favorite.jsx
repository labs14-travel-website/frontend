import React, { useState, useEffect } from 'react';
import './Favorite.modules.scss';
import PropTypes from 'prop-types';

/**
   * @description Returns heart empty if favId is not within favList and heart full if
   * favId is present within favList.
   * @param {string} favId unique id associated with an attraction
   */

const Favorite = ({
  favorite, showCTA, loggedIn, awaitingFavorite, addFavorite, favorites, removeFavorite,
}) => {
  const favList = favorites && favorites.map(favorite => favorite.place_id);
  useEffect(() => {
    console.log('useEffect Favorite.jsx');
    if (loggedIn && awaitingFavorite) {
      addFavorite(favorite.placeId);
    }
  }, [awaitingFavorite, loggedIn]);

  const handleAddFavorite = () => {
    if (!loggedIn) {
      showCTA(favorite.placeId);
      // TODO look how to make showCTA a promise so the favorite
      // functionality will work after successfully logged in
    } else {
      addFavorite(favorite.placeId);
      // axios call
    }
  };

  const handleRemoveFavorite = () => {
    removeFavorite(favorite.id);
  };
  console.log(favList)

  return (
    <>
      {
      favorites && favList.includes(favorite.placeId) ? <i onClick={handleRemoveFavorite} className="fas fa-heart fa-2x" id="heart-ol" />
        : <i onClick={handleAddFavorite} className="far fa-heart fa-2x" id="heart-full" />

      }
    </>

  );
};

Favorite.propTypes = {
  // favId: PropTypes.string.isRequired,
  showCTA: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  awaitingFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
};


export default Favorite;
