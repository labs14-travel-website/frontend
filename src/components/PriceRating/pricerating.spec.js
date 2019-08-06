import React from 'react';
import { mount } from '../../enzyme';
import PriceRating from './PriceRating';

// Naming conventions examples as used by the star rating dependency
// http://voronianski.github.io/react-star-rating-component/example/

const mountComp = (props = {}) => {
  const component = mount(<PriceRating {...props} />);
  return component;
};

describe('PriceRating Component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      price: 3,
    };
    wrapper = mountComp(props);
  });

  it('Props passed into component should be 3', () => {
    expect(wrapper.props().price).toBe(3);
  });

  it('Should mount one Star Component', () => {
    const component = wrapper.find('StarRatingComponent');
    expect(component.length).toBe(1);
  });

  it('Star Component should have a maximum value of 4', () => {
    const component = wrapper.find('.dv-star-rating-star');
    expect(component.length).toBe(4);
  });

  it('User should see 3 green or "full" dollar signs', () => {
    const component = wrapper.find('.dv-star-rating-full-star');
    expect(component.length).toBe(3);
  });
});
