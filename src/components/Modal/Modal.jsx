import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const Modal = (props) => {
  const {
    onClose, show, children, attraction,
  } = props;

  if (!show) {
    return null;
  }

  const modalPicture = `${attraction.picture.split('-w400')[0]}-w1200`;

  const style = {
    background: `url('${modalPicture}') 50% 50% / cover`,
  };

  return (
    <div className={styles.Modal_wrapper}>
      <div className={styles.Modal} id="modal">
        <div className={styles.Modal__image} style={style} />
        <h2>{attraction.name}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <button type="button" className={styles.toggleButton} onClick={e => onClose(e)}>
            Close
          </button>
        </div>
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
      placeId: PropTypes.string,
      picture: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default Modal;
