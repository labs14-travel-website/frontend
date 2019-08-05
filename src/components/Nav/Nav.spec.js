import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from './Nav';

Enzyme.configure({ adapter: new Adapter() });

describe('Nav Mounts', () => {
  it('renders', () => {
    const wrapper = mount(
      <Nav />,
    );

    expect(wrapper.exists()).toBe(true);
  });
});
