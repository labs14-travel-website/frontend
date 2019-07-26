import React, { useEffect } from 'react';

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
    { city: 'Delhi', country: 'India' },
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

  useEffect(() => {
    console.log('hi');
    // make axios call to backend

  });

  return (
    <div>
      <h2>Popular Destinations</h2>
      {selectedLocations.map(location => (
        <div>{location.city}, {location.country}</div>
        // <div><CardDisplay location={each} /></div> //TODO pass locations to CardDisplay
      ))}
    </div>
  );
};

export default PopularDestinations;
