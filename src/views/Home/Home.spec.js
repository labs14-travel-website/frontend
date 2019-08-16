import React from 'react';
import Home from './Home';
import { mount } from '../../enzyme';

describe('Home Component', () => {
  it('Component should mount', () => {
    const props = {
      showModal: () => true,
      Feature: {
        Switch: () => true,
        Toggle: () => true,
      },
    };
    const wrapper = mount(<Home {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('Main Hero components are rendered', () => {
    const props = {
      showModal: () => true,
      Feature: {
        Switch: () => true,
        Toggle: () => true,
      },
    };
    const wrapper = mount(<Home {...props} />);
    const hero = wrapper.find('[className^="Hero"]');
    expect(hero.length).toBe(2);
  });

  it('Main Popular destination components are rendered', () => {
    const props = {
      showModal: () => true,
      Feature: {
        Switch: () => true,
        Toggle: () => true,
      },
    };
    const wrapper = mount(<Home {...props} />);
    const popular = wrapper.find('[className^="PopularDestinations"]');
    expect(popular.length).toBe(3);
  });
});
