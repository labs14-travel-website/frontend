import React from 'react';
import { shallow, mount } from '../../enzyme';
import Search from './Search';

describe('Search Bar', () => {
  const searchProps = {
    handleSearch: () => true,
  };
  it('Search should mount once', () => {
    const component = mount(<Search {...searchProps} />);
    expect(component.find('[className^="Search"]').exists()).toBe(true);
  });

  it('Search Bar text', () => {
    const component = shallow(<Search {...searchProps} />);
    expect(component.find('[className^="Search__form__submit"]').text()).toEqual('Roam');
  });

  it('Search Bar Simulation', () => {
    const component = mount(<Search {...searchProps} />);
    const event = component.find('input[type="text"]').simulate('change', {
      target: { value: 'Hawaii' },
    });
    expect(event.getDOMNode().value).toBe('Hawaii');
  });
});
