import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import CardDisplay from '../CardDisplay';


/**
 * @description This will display the attraction cards component when they are ready
 */
function Attractions(props) {
  const { attractions, isLoading } = props;
  const [loaded, setLoaded] = useState(false);
  const [modalAttraction, setModalAttraction] = useState({});

  const handleOnClick = ({ place }) => {
    // setIsLoadingData(true)
    setModalAttraction(place);
    setLoaded(true);
  };

  const showModal = () => {
    setLoaded(!loaded);
  };

  return (
    <>
      <div>
        {
          !isLoading
            ? attractions && attractions.map(place => (
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
                    <button type="button">More Info</button>,
                  ],
                  place,
                }}
              />
            ))
            : (
              <Loader
                type="Puff"
                color="#00BFFF"
                height="100"
                width="100"
              />
            )
        }
      </div>

      {loaded && (
      <Modal
        attraction={modalAttraction}
        onClose={showModal}
        show={loaded}
      >
        <p>Hello</p>
      </Modal>
      )}
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
};


export default Attractions;
