import React, { useState } from 'react';
import './Favorite.modules.scss';
import PropTypes from 'prop-types';

const Favorite = ({ favId }) => {
  const [favList, setFavList] = useState([]);

  /**
     * @description Returns heart empty if favId is not within favList and heart full if
     * favId is present within favList.
     * @param {string} favId unique id associated with an attraction
     */

  const favorite = () => { setFavList(favList.filter(fav => fav !== favId)); };

  const unfavorite = () => { setFavList([...favList, favId]); };

  return (
    <>
      {
      favList.includes(favId) ? <i onClick={favorite} className="fas fa-heart fa-2x" id="heart-ol" />
        : <i onClick={unfavorite} className="far fa-heart fa-2x" id="heart-full" />

      }
    </>

  );
};

Favorite.propTypes = {
  favId: PropTypes.string.isRequired,
};


export default Favorite;
