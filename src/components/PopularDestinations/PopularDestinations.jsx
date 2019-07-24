import React from 'react';

const locations = [
  { name: 'Hong Kong, China' },
  { name: 'Bangkok, Thailand' },
  { name: 'London, United Kingdom' },
  { name: 'Singapore' },
  { name: 'Macau' },
  { name: 'Paris, France' },
  { name: 'Dubai, United Arab Emirates' },
  { name: 'New York City, USA' },
  { name: 'Kuala Lumpur, Malaysia' },
  { name: 'Shenzhen, China' },
  { name: 'Phuket, Thailand' },
  { name: 'Istanbul, Turkey' },
  { name: 'Delhi, India' },
  { name: 'Tokyo, Japan' },
  { name: 'Rome, Italy' },
  { name: 'Antalya, Turkey' },
  { name: 'Taipei, Taiwan' },
  { name: 'Guangzhou, China' },
  { name: 'Mumbai, India' },
  { name: 'Prague, Czech Republic' },
];

const shuffled = locations.sort(() => 0.5 - Math.random());

const selectedLocations = shuffled.slice(0, 4);

const PopularDestinations = () => (
  <div>
    <h2>Popular Destinations</h2>
    {selectedLocations.map(location => (
      <div>{location.name}</div>
      // <div><CardDisplay location={each} /></div> //TODO pass locations to CardDisplay
    ))}
  </div>
);

export default PopularDestinations;
