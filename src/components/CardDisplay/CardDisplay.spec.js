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
    const wrapper = shallow(<CardDisplay location={location} handleClick={() => true} />);
    expect(wrapper.prop('location')).toEqual(location);
  });

  it('fires function on click', () => {
    const mockCallBack = jest.fn();

    const wrapper = mount(<CardDisplay location={location} handleClick={mockCallBack} />);
    wrapper.find('.card').simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });

  it('displays passed in location to the DOM', () => {
    const wrapper = mount(<CardDisplay location={location} handleClick={() => true} />);
    const mockCity = wrapper.find('.city');
    expect(mockCity.text()).toEqual('New York');
  });
});
