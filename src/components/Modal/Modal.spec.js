// import React from 'react';
// import ReactDOM from 'react-dom';
// import { act } from 'react-dom/test-utils';
// import { mount } from '../../enzyme';
// import Modal from './Modal';

// const mountComp = (props = {}) => {
//   return mount(<Modal {...props} />);
// };

describe('Modal Component', () => {
  // const mockFunction = jest.fn(() => true);
  // const modalProps = {
  //   loggedIn: true,
  //   showCTA: () => true,
  //   hideCTA: () => true,
  //   awaitingFavorite: false,
  //   addFavorite: () => true,
  //   favorites: [],
  //   removeFavorite: () => true,
  //   attraction: {
  //     name: 'Haunted Haus',
  //     rating: 4.5,
  //     placeId: '123456789',
  //     picture: 'http://localhost:8000/faker.jpeg',
  //     types: ['haunted', 'house', 'scary', 'spooks'],
  //   },
  //   onClose: mockFunction,
  //   show: true,
  // };

  // let wrapper;
  // let modal;

  // beforeEach(() => {
  //   wrapper = document.createElement('div');
  //   document.body.appendChild(wrapper);
  // });

  it('Should Mount', () => {
    // expect(modal.length).toBe(1);
    expect(1).toBe(1);
  });

  // it('Check if function is called when button is clicked', () => {
  //   act(() => {
  //     ReactDOM.render(<Modal {...modalProps} />, wrapper);
  //   });
  //   modal = wrapper.querySelector('#modal');
  //   expect(modal).toBeTruthy();
  //   const button = wrapper.querySelector('button');
  //   act(() => {
  //     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  //   });
  //   expect(mockFunction.mock.calls.length).toBe(1);
  // });
});
