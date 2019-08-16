import React from 'react';
import Hero from './Hero';
import { mount } from '../../enzyme';


describe('Component should mount', () => {
  it('Component should mount', () => {
    const props = {
      children: <p>12345</p>,
      background: '/images/hero.jpg',
    };
    const wrapper = mount(<Hero {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('Children should render', () => {
    const props = {
      children: <p>12345</p>,
      background: '/images/hero.jpg',
    };
    const wrapper = mount(<Hero {...props} />);
    const children = wrapper.find('[className^="Hero__destination"]');
    expect(children.length).toBe(1);
    const childrenII = wrapper.find('[className^="Hero__destination"]');
    expect(childrenII.text()).toEqual('12345');
  });

  it('Styles and background should be present', () => {
    const props = {
      children: <p>12345</p>,
      background: '/images/hero.jpg',
    };
    const wrapper = mount(<Hero {...props} />);
    const children = wrapper.find('[className^="Hero"]').first();
    expect(children.prop('style')).toEqual({ background: "url('/images/hero.jpg') 50% 50% / cover" });
  });
});
