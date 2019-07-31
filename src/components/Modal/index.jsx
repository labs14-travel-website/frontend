import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const Modal = (props) => {
  const { onClose, show, children } = props;

  if (!show) {
    return null;
  }
  return (
    <div className={styles.modal} id="modal">
      <h2>Test Modal</h2>
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
