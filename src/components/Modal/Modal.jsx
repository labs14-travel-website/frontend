import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const Modal = (props) => {
  const { onClose, show, children, attraction } = props;
  console.log('attraction :', attraction);
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} id="modal">
      <div><img src={attraction.picture} /></div>
      <h2>{attraction.name}</h2>
      <div className={styles.content}>{children}</div>
      <div className={styles.actions}>
        <button type="button" className={styles.toggleButton} onClick={e => onClose(e)}>
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
};

export default Modal;
