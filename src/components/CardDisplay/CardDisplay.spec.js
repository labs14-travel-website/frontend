// it('renders without crashing', () => {
//   expect(1).toBe(1);
// });
// work on tests
// enzyme??
// cypress??
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CardDisplay from ".";

Enzyme.configure({ adapter: new Adapter() });

const mockDestinations = [
  {
    city: "New York",
    country: "USA"
  }
];

describe("Confirm CardDisplay Mounts", () => {
  it("renders", () => {

    const wrapper = shallow(
      <CardDisplay location={mockDestinations} handleClick={() => true} />
    );

    expect(wrapper.exists()).toBe(true);
  });
});

// test if mock function is fired when clicking on a destination
// test that passed in location is properly displayed
