import React from 'react';
import { mount } from '../../enzyme';
import Modal from './Modal';

const mountComp = (props = {}) => {
  const component = mount(<Modal {...props} />);
  return component;
};

describe('Modal Component', () => {
  let wrapper;
  const mockFunction = jest.fn(() => true);

  beforeEach(() => {
    const props = {
      attraction: {
        name: 'Haunted Haus',
        rating: 4.5,
        placeId: '123456789',
        picture: 'http://localhost:8000/faker.jpeg',
        types: ['haunted', 'house', 'scary', 'spooks'],
      },
      onClose: mockFunction,
      show: true,
    };
    wrapper = mountComp(props);
  });

  it('Should Mount', () => {
    const modal = wrapper.find('#modal');
    expect(modal.length).toBe(1);
  });

  it('Image Should have Name as Alt', () => {
    const image = wrapper.find('img[alt="Haunted Haus"]');
    expect(image.length).toBe(1);
  });

  it('Clicking the Close Button should Remove the Modal', () => {
    const modal = wrapper.find('#modal');
    expect(modal.length).toBe(1);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
