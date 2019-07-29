import React from 'react';
import CardDisplay from '../CardDisplay';

const PopularDestinations = () => {
  const locations = [
    { city: 'Hong Kong', country: 'China' },
    { city: 'Bangkok', country: 'Thailand' },
    { city: 'London', country: 'United Kingdom' },
    { city: 'Paris', country: 'France' },
    { city: 'Dubai', country: 'United Arab Emirates' },
    { city: 'New York City', country: 'United States' },
    { city: 'Kuala Lumpur', country: 'Malaysia' },
    { city: 'Shenzhen', country: 'China' },
    { city: 'Phuket', country: 'Thailand' },
    { city: 'Istanbul', country: 'Turkey' },
    { city: 'New Delhi', country: 'India' },
    { city: 'Tokyo', country: 'Japan' },
    { city: 'Rome', country: 'Italy' },
    { city: 'Antalya', country: 'Turkey' },
    { city: 'Taipei', country: 'Taiwan' },
    { city: 'Guangzhou', country: 'China' },
    { city: 'Mumbai', country: 'India' },
    { city: 'Prague', country: 'Czech Republic' },
  ];

  const shuffled = locations.sort(() => 0.5 - Math.random());

  const selectedLocations = shuffled.slice(0, 4);

  const handleClick = () => {
    // console.log('clicked', e.target);
  };

  return (
    <div>
      <h2>Popular Destinations</h2>
      {selectedLocations.map(location => (
        <div onClick={handleClick}>
          {location.city}
          {' '}
          {location.country}
          <CardDisplay location={location} />
        </div> // TODO pass locations to CardDisplay
      ))}
    </div>
  );
};

export default PopularDestinations;
