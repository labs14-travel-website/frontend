import React from 'react';
import { mount } from '../../enzyme';
import FavCTA from './FavCTA';

describe('Attractions Component', () => {
  it('tests true', () => {
    expect(1).toBe(1);
  });

  it('Component did mount', () => {
    const component = mount(<FavCTA />);
    expect(component.find('[className^="FavCTA__wrapper"]').length).toBe(1);
  });
});
