import React from 'react';
import { mount } from '../../enzyme';
import FavCTA from './FavCTA';

describe('Attractions Component', () => {
  const favCTAProps = {
    responseFail: () => true,
    responseGoogle: () => true,
    hideCTA: () => true,
  };
  it('tests true', () => {
    expect(1).toBe(1);
  });

  it('Component did mount', () => {
    const component = mount(<FavCTA {...favCTAProps} />);
    expect(component.find('[className^="FavCTA__wrapper"]').length).toBe(1);
  });
});
