import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

/**
 * @description Renders stars depending on what number
 * is retrieved from the API to indicate place rating.
 * @param {number} rating
 */
const Ratings = ({ rating }) => (
  <>
    <StarRatingComponent
      name="rating"
      editing={false}
      starCount={5}
      value={rating}
      starColor="#F2C94C"
      renderStarIcon={() => (
        <span
          style={{
            margin: '0 3px',
          }}
        >
          <i className="fas fa-star" />
        </span>
      )}
      renderStarIconHalf={() => (
        <span
          style={{
            color: '#F2C94C',
            margin: '0 1px',
          }}
        >
          <i className="fas fa-star-half-alt" />
        </span>
      )}
    />
  </>
);
Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
};
export default Ratings;
