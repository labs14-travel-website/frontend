import React from 'react';
import axios from 'axios';
import styles from './PopularDestinations.module.scss';
import CardDisplay from '../CardDisplay';

/** @description PopularDestinations is a component that returns 4 CardDisplays
 * containing 4 randomly chosen popular destinations to travel to
 */

const PopularDestinations = () => {
  const locations = [
    { city: 'Hong Kong', country: 'China', picture: '/images/PopularDestinations/hong-kong.jpg' },
    { city: 'Bangkok', country: 'Thailand', picture: '/images/PopularDestinations/bangkok.jpeg' },
    { city: 'London', country: 'United Kingdom', picture: '/images/PopularDestinations/london.jpeg' },
    { city: 'Paris', country: 'France', picture: '/images/PopularDestinations/paris.jpeg' },
    { city: 'Dubai', country: 'United Arab Emirates', picture: '/images/PopularDestinations/dubai.jpeg' },
    { city: 'New York City', country: 'United States', picture: '/images/PopularDestinations/new-york-city.jpeg' },
    { city: 'Kuala Lumpur', country: 'Malaysia', picture: '/images/PopularDestinations/kuala-lumpur.jpeg' },
    { city: 'Shenzhen', country: 'China', picture: '/images/PopularDestinations/shenzhen.jpeg' },
    { city: 'Phuket', country: 'Thailand', picture: '/images/PopularDestinations/phuket.jpeg' },
    { city: 'Istanbul', country: 'Turkey', picture: '/images/PopularDestinations/istanbul.jpeg' },
    { city: 'New Delhi', country: 'India', picture: '/images/PopularDestinations/new-delhi.jpeg' },
    { city: 'Tokyo', country: 'Japan', picture: '/images/PopularDestinations/tokyo.jpeg' },
    { city: 'Rome', country: 'Italy', picture: '/images/PopularDestinations/rome.jpeg' },
    { city: 'Antalya', country: 'Turkey', picture: '/images/PopularDestinations/antalya.jpeg' },
    { city: 'Taipei', country: 'Taiwan', picture: '/images/PopularDestinations/taipei.jpeg' },
    { city: 'Guangzhou', country: 'China', picture: '/images/PopularDestinations/guangzhou.jpeg' },
    { city: 'Mumbai', country: 'India', picture: '/images/PopularDestinations/mumbai.jpeg' },
    { city: 'Prague', country: 'Czech Republic', picture: '/images/PopularDestinations/prague.jpeg' },
  ];

  const shuffled = locations.sort(() => 0.5 - Math.random());
  const selectedLocations = shuffled.slice(0, 4);
  const handleOnClick = async (data) => {
    const query = `${data.place.city}, ${data.place.country}`;
    const attractions = await axios.get(`${process.env.REACT_APP_ENDPOINT}/a?q=${query}`);
    console.log(attractions); // eslint-disable-line
  };

  return (
    <div className={styles.container}>
      <div className={styles.PopularDestinations}>
        <h2 className={styles.PopularDestinations__title}>Popular Destinations</h2>
        <div className={styles.PopularDestinations__cards}>
          {
            selectedLocations.map(location => (
              <CardDisplay
                key={location.city}
                data={{
                  title: location.city,
                  body: location.country,
                  place: location,
                }}
                handleOnClick={handleOnClick}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
