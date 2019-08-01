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
    const wrapper = shallow(
      <CardDisplay location={location} handleClick={() => true} />,
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('fires function when destination is clicked', () => {
    const mockCallback = jest.fn(() => true);
    const wrapper = mount(
      <CardDisplay location={location} handleClick={mockCallback} />,
    );
    expect(wrapper.find('.card_display').length).toEqual(1);
    wrapper.find('.card_display').simulate('click');
    expect(mockCallback.mock.calls.length).toEqual(1);
  });

  it('receives passed in location as props', () => {
    const wrapper = shallow(<CardDisplay location={location} handleClick={() => true} />);
    expect(wrapper.prop('location')).toEqual(location);
  });

  it('displays passed in location to the DOM', () => {
    const wrapper = mount(<CardDisplay location={location} handleClick={() => true} />);
    const mockCity = wrapper.find('.city');
    expect(mockCity.text()).toEqual('New York');
  });
});
