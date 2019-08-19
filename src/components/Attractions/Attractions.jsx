import React from 'react';
// import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
// import Modal from '../Modal';
import CardDisplay from '../CardDisplay';
import styles from './Attractions.module.scss';
import Favorite from '../Favorites';

/**
 * @description This will display the attraction cards component when they are ready
 */
function Attractions(props) {
  const {
    attractions,
    isLoading,
    showModal,
    Feature,
    showCTA,
    hideCTA,
    loggedIn,
    awaitingFavorite,
  } = props;
  // const [loaded, setLoaded] = useState(false);
  // const [modalAttraction, setModalAttraction] = useState({});

  const handleOnClick = ({ place }) => {
    // setIsLoadingData(true)
    // setModalAttraction(place);
    showModal(place);
    // setLoaded(true);
  };

  // const showModal = () => {
  //   setLoaded(!loaded);
  // };

  const showAttractions = (attractionList) => {
    const elements = attractionList.map(place => (
      <div>
        <Feature.Toggle flag="heart-fav"><Favorite favId={place.placeId} component="attraction" showCTA={showCTA} hideCTA={hideCTA} loggedIn={loggedIn} awaitingFavorite={awaitingFavorite} /></Feature.Toggle>
        <CardDisplay
          key={place.placeId}
          handleOnClick={handleOnClick}
          data={{
            title: place.name,
            body: [
              <h1>
                Rating:
                {place.rating}
              </h1>,
              <Feature.Switch flag="more-button">
                <button type="button">More Info</button>
                <>
                </>
              </Feature.Switch>,
            ],
            place,
          }}
        />
      </div>
    ));

    if (attractionList.length % 4 !== 0) {
      for (let i = 0; i < (4 - (attractionList.length % 4)); i += 1) {
        elements.push(<div className={styles.CardSpacer} />);
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
                  height="100"
                  width="100"
                />
              </div>
            )
        }
      </div>

      {/* {loaded && (
        <Modal attraction={modalAttraction} onClose={showModal} show={loaded}>
          <p>Hello</p>
        </Modal>
      )} */}
    </>
  );
}

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
  showModal: PropTypes.func.isRequired,
  Feature: PropTypes.objectOf(PropTypes.func).isRequired,
  showCTA: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  awaitingFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
};

export default Attractions;
