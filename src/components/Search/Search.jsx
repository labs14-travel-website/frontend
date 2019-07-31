import React, { useState } from 'react';
import axios from 'axios';
import Attractions from '../Attractions/index';

/**
 * @description Landing is a component that returns an input form and attraction cards
 */
function Search() {
  // User-Input state
  const [destination, setDestination] = useState('');
  // API returned destination attractions
  const [searchedDestination, setSearchedDestination] = useState([]);

  // const example = [{
  //   "name":"Escape My Room",
  //   "placeId":"ChIJ-cdaX96lIIYReBSWpXVNalQ",
  //   "rating":4.9,
  //   "types":["museum","point_of_interest","establishment"],
  //   "picture":"https://false/p/AF1QipOrLq7jYuMZ4OzEgYUWrrKkkFRnekQpB7mbnd_E=s1600-w400"
  // },
  // {
  //   "name":"Escape My Room II",
  //   "placeId":"ChIJ-cdaX96lIIYReBSWpXVNalQ123",
  //   "rating":4.9,
  //   "types":["museum","point_of_interest","establishment"],
  //   "picture":"https://false/p/AF1QipOrLq7jYuMZ4OzEgYUWrrKkkFRnekQpB7mbnd_E=s1600-w400"
  // }]


  // Sets the state to user-input
  const handleOnChange = (event) => {
    setDestination(event.target.value);
  };

  // Performs action when user clicks the ROAM button
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(`I am roaming ${destination}`); // eslint-disable-line

    // Request to backend that will request to API and send back the data?
    axios.get(`https://roamly-staging.herokuapp.com/a?q=${destination}`)
      .then((response) => {
        console.log(response);  // eslint-disable-line
        setSearchedDestination(response.data.places);
      })
      .catch((error) => {
        console.log(error);  // eslint-disable-line
      });
    setDestination('');
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleOnSubmit} >
          <input
            type="text"
            onChange={handleOnChange}
            value={destination}
            autoComplete="off"
            placeholder="Destination"
          />

          <button type="submit">Roam</button>
        </form>

      </div>

      <div className="destinations">
        SEARCHED DESTINATIONS HERE
        <Attractions attraction={searchedDestination} />
      </div>

    </>
  );
}

export default Search;
