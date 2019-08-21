import React from 'react';
import Favorite from './Favorite';
import { mount } from '../../enzyme';


describe('Favorites Component', () => {
  it('Component should mount', () => {
    const props = {
      favorite: {
        place_id: 'fiuweh4yuo4n',
      },
      showCTA: () => true,
      loggedIn: true,

    };
    const wrapper = mount(<Favorite {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('Empty Heart Icon should Display', () => {
    const props = {
      favorite: {
        place_id: 'fiuweh4yuo4n',
      },
      showCTA: () => true,
      loggedIn: true,
    };
    const wrapper = mount(<Favorite {...props} />);
    const heart = wrapper.find('#heart-full');
    expect(heart.length).toBe(1);
  });

  // TODO Split this out into 3 tests, empty heart click, and full heart.

  // it('Full Heart should Display', () => {
  //   const props = {
  //     favorite: {
  //       place_id: 'fiuweh4yuo4n',
  //     },
  //     showCTA: () => true,
  //     addFavorite: () => true,
  //     loggedIn: true,
  //   };
  //   const wrapper = mount(<Favorite {...props} />);
  //   const heart = wrapper.find('#heart-full');
  //   heart.simulate('click');
  //   const fullHeart = wrapper.find('#heart-ol');
  //   expect(fullHeart.length).toBe(1);
  // });
});
