import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.scss";
import Ratings from "../Ratings";
import PriceRating from "../PriceRating";

const Modal = props => {
  console.log(props)
  const { onClose, show, children, attraction } = props;
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} id="modal">
      <div>
        <img src={attraction.picture} alt={`${attraction.name}`} />
      </div>
      <h2>{attraction.name}</h2>
      <div>
        <Ratings rating={attraction.rating} />
      </div>
      {attraction.price ? (
        <div>
          <PriceRating price={attraction.price} />
        </div>
      ) : (
        <div>
          <PriceRating price={1} />
        </div>
      )}
      <div className={styles.content}>{children}</div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={e => onClose(e)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  attraction: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      price: PropTypes.number,
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default Modal;
