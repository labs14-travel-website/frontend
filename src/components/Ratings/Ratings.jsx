import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';


const Ratings = ({ rating }) => (
  <>
    <StarRatingComponent
      name="rating"
      starCount={5}
      value={rating}
      renderStarIcon={() => <span><i className="fas fa-star" /></span>}
      renderStarIconHalf={() => <span style={{ color: '#FFB400' }}><i className="fas fa-star-half-alt" /></span>}
    />
  </>
);

Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Ratings;
