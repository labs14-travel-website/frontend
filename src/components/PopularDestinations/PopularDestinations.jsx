import React from 'react';
import axios from 'axios';

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

  const handleClick = async (query) => {
    console.log('Lookup attractions'); // eslint-disable-line
    const attractions = await axios.get(`https://roamly-staging.herokuapp.com/a?q=${query}`);
    console.log(attractions); // eslint-disable-line
  };

  return (
    <div>
      <h2>Popular Destinations</h2>
      {
        selectedLocations.map(location => (
          <CardDisplay location={location} handleClick={handleClick} />
        ))
      }
    </div>
  );
};

export default PopularDestinations;
