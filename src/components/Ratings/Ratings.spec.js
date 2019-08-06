import React from 'react';
import { mount } from '../../enzyme';
import Ratings from './Ratings';

// Naming conventions examples as used by the star rating dependency 
// http://voronianski.github.io/react-star-rating-component/example/

const mountComp = (props = {}) => {
  const component = mount(<Ratings {...props} />);
  return component;
};

describe('PriceRating Component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      rating: 4.5
    };
    wrapper = mountComp(props);
  });

  it('Props passed into component should be 4.5', () => {
    expect(wrapper.props().rating).toBe(4.5);
  });
  
  it('Should mount one Star Component', () => {
    const component = wrapper.find('StarRatingComponent')
    expect(component.length).toBe(1);
  });

  it('Star Component should have a maximum value of 5', () => {
    const component = wrapper.find('.dv-star-rating-star')
    expect(component.length).toBe(5);
  });

  it('User should see 4 and 1/2 stars', () => {
    const full = wrapper.find('.dv-star-rating-full-star')
    expect(full.length).toBe(4);
    const half = wrapper.find('.dv-star-rating-empty-star')
    expect(half.length).toBe(1);
  });

});

