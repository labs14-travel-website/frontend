import React, { useState, useEffect } from 'react';

function Landing() {
  const [destination, setDestination] = useState('');

  const handleOnChange = (event) => {
    setDestination(event.target.value);
  };


  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(`I am roaming ${destination}`); // eslint-disable-line
  };

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
      </div>
    </>
  );
}

export default Landing;
