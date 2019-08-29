import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopularDestinations from '.';
import CardDisplay from '../CardDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('PopularDestinations', () => {
  const popularDestinationsProps = {
    handleSearch: () => true,
    noResults: false,
  };
  it('mounts', () => {
    const wrapper = shallow(<PopularDestinations {...popularDestinationsProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Displays four locations', () => {
    const wrapper = mount(<PopularDestinations {...popularDestinationsProps} />);
    expect(wrapper.find(CardDisplay).length).toEqual(4);
  });
});
