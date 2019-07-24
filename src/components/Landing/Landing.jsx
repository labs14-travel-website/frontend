import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Landing is the initial page that users will see when they enter the application
function Landing() {
  // User-Input state
  const [destination, setDestination] = useState('');
  const [searchedDestination, setSearch] = useState('')

  // Sets the state to user-input
  const handleOnChange = (event) => {
    setDestination(event.target.value);
  };

  // Performs action when user clicks the ROAM button
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(`I am roaming ${destination}`); // eslint-disable-line

    // Request to backend that will request to API and send back the data?
    axios.get('http://localhost:8000/', destination)
      .then((response) => {
          console.log(response);  // eslint-disable-line
          setSearch(response.data)
      })
      .catch((error) => {
          console.log(error);  // eslint-disable-line
      });
  };

  // Check the state
  useEffect(() => {
    console.log(destination); // eslint-disable-line
  });

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
