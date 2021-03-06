import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';

Enzyme.configure({ adapter: new Adapter() });

describe('Nav Mounts', () => {
  const navProps = {
    loggedIn: false,
    responseFail: () => true,
    responseGoogle: () => true,
    logout: () => true,
  };
  const Feature = { Toggle: () => true };
  it('renders', () => {
    const wrapper = mount(
      <Router><Nav Feature={Feature} {...navProps} /></Router>,
    );

    expect(wrapper.exists()).toBe(true);
  });
});
