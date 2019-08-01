import React, { useState } from 'react';
import Modal from './index';
import styles from './modal.module.scss';

const TestModal = (props) => {
  // state = {
  //   show: false
  // };
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(!show);
    // this.setState({
    //   show: !this.state.show
    // });
  };
  return (
    <div className="App">
      <button
        type="button"
        className={styles.toggleButton}
        id="centered-toggleButton"
        onClick={(e) => {
          showModal(e);
        }}
      >
        {' '}
          Test Modal
        {' '}
      </button>

      <Modal onClose={showModal} show={show}>
        {props.data}
      </Modal>
    </div>
  );
};

export default TestModal;
