import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';

Enzyme.configure({ adapter: new Adapter() });

describe('Nav Mounts', () => {
  const Feature = { Toggle: () => true };
  it('renders', () => {
    const wrapper = mount(
      <Router><Nav Feature={Feature} /></Router>,
    );

    expect(wrapper.exists()).toBe(true);
  });
});
