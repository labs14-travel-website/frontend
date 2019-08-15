import React from 'react';
import Favorite from './Favorite';
import { mount } from '../../enzyme';


describe('Favorites Component', () => {
  it('Component should mount', () => {
    const props = {
      favId: 12345,
    };
    const wrapper = mount(<Favorite {...props} />);

    expect(wrapper).toBeDefined();

    // const heart = wrapper.find('#heart-full')
    // expect(heart.length).toBe(1);
  });

  it('', () => {

  });

  it('', () => {

  });
});
