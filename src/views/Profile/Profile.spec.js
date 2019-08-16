import React from 'react';
import Profile from './Profile';
import { mount } from '../../enzyme';
import { BrowserRouter as Router } from 'react-router-dom'

describe('Profile Component', () => {
  it('Component should mount', () => {
    const props = {
      user: "Ryan who?"
    };
    const wrapper = mount(<Router><Profile {...props} /></Router>);
    expect(wrapper).toBeDefined();
  });

  it('', () => {
    
  });

  it('', () => {
   
  });
});

