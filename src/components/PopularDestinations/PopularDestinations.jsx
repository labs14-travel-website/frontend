
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PopularDestinations.module.scss';
import CardDisplay from '../CardDisplay';

/**
 * @description PopularDestinations is a component that returns 4 CardDisplays
 * containing 4 randomly chosen popular destinations to travel to
 */

const PopularDestinations = ({ handleSearch, noResults }) => {
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
    { city: 'Barcelona', country: 'Spain', picture: '/images/PopularDestinations/barcelona.jpeg' },
    { city: 'Vienna', country: 'Austria', picture: '/images/PopularDestinations/vienna.jpeg' },
  ];

  const shuffled = locations.sort(() => 0.5 - Math.random());
  const selectedLocations = shuffled.slice(0, 4);

  const [locationState] = useState(selectedLocations);

  const handleOnClick = async (data) => {
    const query = `${data.place.city}, ${data.place.country}`;
    handleSearch(`${query}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.PopularDestinations}>
        {noResults ? <div>No Results</div> : null}
        <h2 className={styles.PopularDestinations__title}>Popular Destinations</h2>
        <div className={styles.PopularDestinations__cards}>
          {
            locationState.map(location => (
              <CardDisplay
                key={location.city}
                data={{
                  title: location.city,
                  body: [
                    <p key={location.city} style={{ fontSize: '18px' }}>{location.country}</p>,
                  ],
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

PopularDestinations.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  noResults: PropTypes.bool.isRequired,
};

export default PopularDestinations;
