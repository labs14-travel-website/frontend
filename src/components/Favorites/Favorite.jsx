import React, { useState } from 'react';
import './Favorite.modules.scss';
import PropTypes from 'prop-types';

const Favorite = ({ favId, component, showCTA, loggedIn }) => {
  const [favList, setFavList] = useState([]);

  /**
     * @description Returns heart empty if favId is not within favList and heart full if
     * favId is present within favList.
     * @param {string} favId unique id associated with an attraction
     */
  const favorite = () => {
    if (component === 'attraction' && !loggedIn) {
      console.log('hello');
      showCTA();
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
  component: PropTypes.string.isRequired,
  showCTA: PropTypes.func.isRequired,
};


export default Favorite;
