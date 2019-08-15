import React from 'react';
import { mount } from '../../enzyme';
import Modal from './Modal';

// const mountComp = (props = {}) => {
//   return mount(<Modal {...props} />);
// };

describe('Modal Component', () => {
  const mockFunction = jest.fn(() => true);
  let props;

  beforeEach(() => {
    props = {
      attraction: {
        name: 'Haunted Haus',
        rating: 4.5,
        placeId: '123456789',
        picture: 'http://localhost:8000/faker.jpeg',
        types: ['haunted', 'house', 'scary', 'spooks'],
      },
      onClose: mockFunction,
      show: true,
      Feature: {
        Toggle: () => {return true},
      }
    };
  });

  it('Should Mount', () => {
    const wrapper = mount(<Modal {...props} />)
    const modal = wrapper.find('#modal');
    console.log(modal);
    expect(modal.length).toBe(1);
  });
  
  it('Check if function is called when button is clicked', () => {
    const wrapper = mount(<Modal {...props} />)
    const modal = wrapper.find('#modal');
    expect(modal.length).toBe(1);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
