import React from 'react';
import { shallow, mount } from '../../enzyme';
import SearchBar from './SearchBar';

describe('Search Bar', () => {
  it('Search should mount once', () => {
    const component = mount(<SearchBar />);
    expect(component.find('[className^="Search"]').exists()).toBe(true);
  });

  // it('Search Bar text', () => {
  //   const component = shallow(<SearchBar />);
  //   expect(component.find('[className^="Search__form__submit"]').text()).toEqual('Roam');
  // });

  it('Search Bar Simulation', () => {
    const component = mount(<SearchBar />);
    const event = component.find('input[type="text"]').simulate('change', {
      target: { value: 'Hawaii' },
    });
    expect(event.getDOMNode().value).toBe('Hawaii');
  });
});
