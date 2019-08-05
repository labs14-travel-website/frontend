import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

/**
 * @description Renders dollar signs depending on what number is retrieved from the API to indicate price level.
 * @param {number} price
 */

const PriceRating = ({ price }) => (
  <div>
    <StarRatingComponent
      name="price"
      editing={false}
      renderStarIcon={() => <span><i className="fas fa-dollar-sign" /></span>}
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
