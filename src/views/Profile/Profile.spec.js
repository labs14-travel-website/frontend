import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from './Profile';
import { mount } from '../../enzyme';

describe('Profile Component', () => {
  const profileProps = {
    showModal: () => true,
    loggedIn: false,
    favorites: [],
    isLoading: false,
    removeFavorite: () => true,
    attractions: [],
    user: {
      name: 'Ryan who?',
      email: '123@gmail.com',
      googleId: '12345',
    },
  };
  it('Component should mount', () => {
    // const props = {
    //   user: {
    //     name: 'Ryan who?',
    //     email: '123@gmail.com',
    //     googleId: '12345',
    //   },
    // };
    const wrapper = mount(<Router><Profile {...profileProps} /></Router>);
    expect(wrapper).toBeDefined();
  });

  it('Username should display', () => {
    // const props = {
    //   user: {
    //     name: 'Ryan who?',
    //     email: '123@gmail.com',
    //     googleId: '12345',
    //   },
    // };
    const wrapper = mount(<Router><Profile {...profileProps} /></Router>);
    const headOne = wrapper.find('h1').first();
    expect(headOne.text()).toBe('Ryan who?');
  });
});
