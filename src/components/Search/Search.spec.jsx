import React from 'react';
import { shallow, mount } from '../../enzyme';
import Search from './Search';

it('tests true', () => {
  expect(1).toBe(1);
});

describe('Search Bar', () => {
  it('Search Bar rendered', () => {
    const component = shallow(<Search />);
    expect(component.find('.search').exists()).toBe(true);
  });

  it('Search should mount once', () => {
    expect(mount(<Search />).find('.search').length).toBe(1);
  });

  it('Search Bar text', () => {
    const component = shallow(<Search />);
    expect(component.find('[className="search"]').text()).toEqual('Roam');
  });

  it('Search Bar Simulation', () => {
    const component = mount(<Search />);
    const event = component.find('input[type="text"]').simulate('change', {
      target: { value: 'Hawaii' },
    });
    expect(event.getDOMNode().value).toBe('Hawaii');
  });
});

describe('Destination Results', () => {
  it('Destinations rendered', () => {
    const component = shallow(<Search />);
    expect(component.find('.destinations').exists()).toBe(true);
  });

  it('Destinations should mount once', () => {
    expect(mount(<Search />).find('.destinations').length).toBe(1);
  });

  it('Destination text', () => {
    const component = shallow(<Search />);
    expect(component.find('[className="destinations"]').text()).toEqual('SEARCHED DESTINATIONS HERE<index />');
  });
});
