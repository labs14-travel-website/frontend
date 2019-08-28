import React from 'react';
import Attractions from './Attractions';
import { mount } from '../../enzyme';

const mountComp = (props = {}) => {
  const component = mount(<Attractions {...props} />);
  return component;
};
const attrractionsProps = {
  attractions: [],
  isLoading: false,
  showModal: () => true,
  loggedIn: false,
  removeFavorite: () => true,
  favorites: [],
};
describe('Attractions Component', () => {
  it('Component did mount', () => {
    const component = mount(<Attractions {...attrractionsProps} />);
    expect(component.find('[className^="Attractions__wrapper"]').length).toBe(1);
  });

  // props aren't getting passed
  //
  // describe('Testing Attractions, One Attraction', () => {
  //   let wrapper;

  //   it('Load the Card Display', () => {
  //     const Feature = feature({ 'more-button': true }, false);
  //     const props = {
  //       attractions: [
  //         {
  //           name: 'Haunted Haus',
  //           rating: 4.5,
  //           placeId: '123456789',
  //           picture: 'urlHere',
  //           types: ['haunted', 'house', 'scary', 'spooks'],
  //         },
  //       ],
  //       isLoading: false,
  //       Feature,
  //     };
  //     wrapper = render(<Attractions {...props} />);
  //     const card = wrapper.find('[class^="CardDisplay_CardDisplay__info_wrapper"]');
  //     expect(card.length).toBe(1);
  //   });
  // });

  // describe('Testing Attractions, Two Attractions', () => {
  //   let wrapper;
  //   beforeEach(() => {
  //     const props = {
  //       attractions: [
  //         {
  //           name: 'Haunted Haus',
  //           rating: 4.5,
  //           placeId: '123456789',
  //           picture: 'urlHere',
  //           types: ['haunted', 'house', 'scary', 'spooks'],
  //         },
  //         {
  //           name: 'Gatorland',
  //           rating: 4.6,
  //           placeId: '12345678910',
  //           picture: 'urlHere',
  //           types: ['swamp', 'wildlife', 'everglades'],
  //         },
  //       ],
  //       isLoading: false,
  //     };
  //     wrapper = mountComp(props);
  //   });

  //   it('Load the Card Display', () => {
  //     const button = wrapper.find('button[type="button"]');
  //     expect(button.length).toBe(2);
  //   });
  // });

  describe('Testing No Attractions, Loading State', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountComp({
        ...attrractionsProps, isLoading: true,
      });
    });

    it('Load the Spinner', () => {
      wrapper = mountComp({
        ...attrractionsProps, isLoading: true,
      });
      const loader = wrapper.find('[className^="Loader"]');
      expect(loader.length).toBe(1);
    });
  });
});
