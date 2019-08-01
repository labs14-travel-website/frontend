import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardDisplay from '.';

Enzyme.configure({ adapter: new Adapter() });

const location = {
  city: 'New York',
  country: 'USA',
  picture: '/images/PopularDestinations/new-york-city.jpeg',
};

describe('Confirm CardDisplay Mounts', () => {
  it('renders', () => {
    const wrapper = shallow(
      <CardDisplay
        data={{
          title: location.city,
          body: location.country,
          place: location,
        }}
        handleOnClick={() => true}
      />,
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('fires function when destination is clicked', () => {
    const mockCallback = jest.fn(() => true);
    const wrapper = mount(
      <CardDisplay
        data={{
          title: location.city,
          body: location.country,
          place: location,
        }}
        handleOnClick={mockCallback}
      />,
    );
    expect(wrapper.find('.CardDisplay').length).toEqual(1);
    wrapper.find('.CardDisplay').simulate('click');
    expect(mockCallback.mock.calls.length).toEqual(1);
  });

  it('receives passed in location as props', () => {
    const wrapper = shallow(<CardDisplay
      data={{
        title: location.city,
        body: location.country,
        place: location,
      }}
      handleOnClick={() => true}
    />);
    expect(wrapper.prop('data')).toEqual({
      title: location.city,
      body: location.country,
      place: location,
    });
  });

  it('displays passed in location to the DOM', () => {
    const wrapper = mount(<CardDisplay
      data={{
        title: location.city,
        body: location.country,
        place: location,
      }}
      handleOnClick={() => true}
    />);
    const mockCity = wrapper.find('[className^="CardDisplay__city"]');
    expect(mockCity.text()).toEqual('New York');
  });
});
