import React from 'react';
import axios from 'axios';

import CardDisplay from '../CardDisplay';
import styles from './PopularDestinations.module.scss';

/** @description PopularDestinations is a component that returns 4 CardDisplays
 * containing 4 randomly chosen popular destinations to travel to
 */

const PopularDestinations = () => {
  const locations = [
    { city: 'Hong Kong', country: 'China', img: '/images/PopularDestinations/hong-kong.jpg' },
    { city: 'Bangkok', country: 'Thailand', img: '/images/PopularDestinations/bangkok.jpeg' },
    { city: 'London', country: 'United Kingdom', img: '/images/PopularDestinations/london.jpeg' },
    { city: 'Paris', country: 'France', img: '/images/PopularDestinations/paris.jpeg' },
    { city: 'Dubai', country: 'United Arab Emirates', img: '/images/PopularDestinations/dubai.jpeg' },
    { city: 'New York City', country: 'United States', img: '/images/PopularDestinations/new-york-city.jpeg' },
    { city: 'Kuala Lumpur', country: 'Malaysia', img: '/images/PopularDestinations/kuala-lumpur.jpeg' },
    { city: 'Shenzhen', country: 'China', img: '/images/PopularDestinations/shenzhen.jpeg' },
    { city: 'Phuket', country: 'Thailand', img: '/images/PopularDestinations/phuket.jpeg' },
    { city: 'Istanbul', country: 'Turkey', img: '/images/PopularDestinations/istanbul.jpeg' },
    { city: 'New Delhi', country: 'India', img: '/images/PopularDestinations/new-delhi.jpeg' },
    { city: 'Tokyo', country: 'Japan', img: '/images/PopularDestinations/tokyo.jpeg' },
    { city: 'Rome', country: 'Italy', img: '/images/PopularDestinations/rome.jpeg' },
    { city: 'Antalya', country: 'Turkey', img: '/images/PopularDestinations/antalya.jpeg' },
    { city: 'Taipei', country: 'Taiwan', img: '/images/PopularDestinations/taipei.jpeg' },
    { city: 'Guangzhou', country: 'China', img: '/images/PopularDestinations/guangzhou.jpeg' },
    { city: 'Mumbai', country: 'India', img: '/images/PopularDestinations/mumbai.jpeg' },
    { city: 'Prague', country: 'Czech Republic', img: '/images/PopularDestinations/prague.jpeg' },
  ];

  const shuffled = locations.sort(() => 0.5 - Math.random());
  const selectedLocations = shuffled.slice(0, 4);
  console.log(selectedLocations); // eslint-disable-line
  const handleClick = async (query) => {
    console.log("Lookup attractions"); // eslint-disable-line
    const attractions = await axios.get(
      `https://roamly-staging.herokuapp.com/a?q=${query}`,
    );
    console.log(attractions); // eslint-disable-line
  };

  return (
    <div className={styles.popular_container}>
      <h2>Popular Destinations</h2>
      {selectedLocations.map(location => (
        location
        && <CardDisplay key={location.city} location={location} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default PopularDestinations;
