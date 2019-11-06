import React from 'react';
import Home from './Home';
import { mount } from '../../enzyme';

describe('Home Component', () => {
  const homeProps = {
    showCTA: () => true,
    hideCTA: () => true,
    loggedIn: false,
    awaitingFavorite: false,
    addFavorite: () => true,
    favorites: [],
    removeFavorite: () => true,
    showModal: () => true,
    Feature: {
      Switch: () => true,
      Toggle: () => true,
    },
  };
  it('Component should mount', () => {
    const wrapper = mount(<Home {...homeProps} />);
    expect(wrapper).toBeDefined();
  });

  it('Main Hero components are rendered', () => {
    const wrapper = mount(<Home {...homeProps} />);
    const hero = wrapper.find('[className^="Hero"]');
    expect(hero.length).toBe(2);
  });

  it('Main Popular destination components are rendered', () => {
    const wrapper = mount(<Home {...homeProps} />);
    const popular = wrapper.find('[className^="PopularDestinations"]');
    expect(popular.length).toBe(3);
  });
});
