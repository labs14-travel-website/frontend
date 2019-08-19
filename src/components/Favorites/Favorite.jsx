import React, { useState } from 'react';
import './Favorite.modules.scss';
import PropTypes from 'prop-types';

const Favorite = ({
  favId, showCTA, loggedIn,
}) => {
  const [favList, setFavList] = useState([]);

  /**
     * @description Returns heart empty if favId is not within favList and heart full if
     * favId is present within favList.
     * @param {string} favId unique id associated with an attraction
     */
  const favorite = () => {
    if (!loggedIn) {
      showCTA();
      // TODO look how to make showCTA a promise so the favorite
      // functionality will work after successfully logged in
    } else {
      setFavList([...favList, favId]);
    }
  };

  const unfavorite = () => {
    setFavList(favList.filter(fav => fav !== favId));
  };

  return (
    <>
      {
      favList.includes(favId) ? <i onClick={unfavorite} className="fas fa-heart fa-2x" id="heart-ol" />
        : <i onClick={favorite} className="far fa-heart fa-2x" id="heart-full" />

      }
    </>

  );
};

Favorite.propTypes = {
  favId: PropTypes.string.isRequired,
  showCTA: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};


export default Favorite;
