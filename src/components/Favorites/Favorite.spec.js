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
  });

  it('Empty Heart Icon should Display', () => {
    const props = {
      favId: 12345,
    };
    const wrapper = mount(<Favorite {...props} />);
    const heart = wrapper.find('#heart-full');
    expect(heart.length).toBe(1);
  });

  it('Full Heart should Display', () => {
    const props = {
      favId: 12345,
    };
    const wrapper = mount(<Favorite {...props} />);
    const heart = wrapper.find('#heart-full');
    heart.simulate('click');
    const fullHeart = wrapper.find('#heart-ol');
    expect(fullHeart.length).toBe(1);
  });
});
