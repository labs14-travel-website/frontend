// it('renders without crashing', () => {
//   expect(1).toBe(1);
// });
// work on tests
// enzyme??
// cypress??
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardDisplay from '.';

Enzyme.configure({ adapter: new Adapter() });

const location = {
  city: 'New York',
  country: 'USA',
};

describe('Confirm CardDisplay Mounts', () => {
  it('renders', () => {
    const wrapper = shallow(<CardDisplay location={location} handleClick={() => true} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('receives passed in location as props', () => {
    const wrapper = shallow(<CardDisplay location={location} />);
    // const test = wrapper.find('New York')
    expect(wrapper.prop('location')).toEqual(location);
  });
  it('displays passed in location as to the DOM', () => {
    const wrapper = mount(<CardDisplay location={location} />);
    const mockCity = wrapper.find('.city');
    expect(mockCity.text()).toEqual('New York');
  });
});

// test if mock function is fired when clicking on a destination
// test that passed in location is properly displayed
