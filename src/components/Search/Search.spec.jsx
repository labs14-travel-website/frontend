import React from 'react';
import { shallow, mount } from '../../enzyme';
import Search from './Search';
import styles from './Search.module.scss';

describe('Search Bar', () => {
  it('Search Bar rendered', () => {
    const component = shallow(<Search />);
    expect(component.find(styles.Hero__search).exists()).toBe(true);
  });

  it('Search should mount once', () => {
    const component = mount(<Search />);
    expect(component.find('.search').exists()).toBe(true);
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
