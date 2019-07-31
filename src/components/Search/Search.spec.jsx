import React from 'react';
import { shallow, mount } from '../../enzyme';
import Search from './Search';

describe('Search Bar', () => {
  it('Search should mount once', () => {
    const component = mount(<Search />);
    expect(component.find('[className^="Hero"]').exists()).toBe(true);
  });

  it('Search Bar text', () => {
    const component = shallow(<Search />);
    expect(component.find('[className^="Hero__search_form__submit"]').text()).toEqual('Roam');
  });

  it('Search Bar Simulation', () => {
    const component = mount(<Search />);
    const event = component.find('input[type="text"]').simulate('change', {
      target: { value: 'Hawaii' },
    });
    expect(event.getDOMNode().value).toBe('Hawaii');
  });
});
