import React, { useState } from 'react';
import axios from 'axios';

/**
 * @description Landing is a component that returns an input form and attraction cards
 */
function Landing() {
  // User-Input state
  const [destination, setDestination] = useState('');
  const [searchedDestination, setSearchedDestination] = useState('');

  // Sets the state to user-input
  const handleOnChange = (event) => {
    setDestination(event.target.value);
  };

  // Performs action when user clicks the ROAM button
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(`I am roaming ${destination}`); // eslint-disable-line

    // Request to backend that will request to API and send back the data?
    axios.get(`${process.env.REACT_APP_ENDPOINT}`, destination)
      .then((response) => {
          console.log(response);  // eslint-disable-line
        setSearchedDestination(response.data);
      })
      .catch((error) => {
          console.log(error);  // eslint-disable-line
      });
    setDestination('');
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleOnSubmit}>
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
        <p>{searchedDestination}</p>
      </div>
    </>
  );
}

export default Landing;
