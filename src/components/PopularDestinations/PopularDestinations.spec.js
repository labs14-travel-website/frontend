import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopularDestinations from '.';
import CardDisplay from '../CardDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('PopularDestinations', () => {
  it('mounts', () => {
    const wrapper = shallow(<PopularDestinations />); 
    expect(wrapper.exists()).toBe(true);
  });

  it('Displays four locations', () => {
    const wrapper = mount(<PopularDestinations />);
    expect(wrapper.find(CardDisplay).length).toEqual(4);
  });
});
