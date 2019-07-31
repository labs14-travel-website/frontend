import React, { useState } from 'react';
import Modal from './index';
import styles from './modal.module.scss';

const TestModal = () => {
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
          fuga omnis a sed impedit explicabo accusantium nihil doloremque
          consequuntur.
      </Modal>
    </div>
  );
};

export default TestModal;
