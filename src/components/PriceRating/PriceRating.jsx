import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';


const PriceRating = ({ price }) => (
  <div>
    <StarRatingComponent
      name="price"
      editing={false}
      renderStarIcon={() => <span style={{ margin: '0 3px' }}><i className="fas fa-dollar-sign" /></span>}
      starCount={4}
      value={price}
      starColor="green"
    />
  </div>
);

PriceRating.propTypes = {
  price: PropTypes.number.isRequired,
};

export default PriceRating;
