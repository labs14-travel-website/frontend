import React, { useState } from 'react';
import axios from 'axios';

import styles from './Search.module.scss';

/**
 * @description Landing is a component that returns an input form and attraction cards
 */
function Search() {
  // user-input state
  const [destination, setDestination] = useState('');
  const [, setSearchedDestination] = useState([]);

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
  const handleOnChange = ({ target: { value } }) => {
    setDestination(value);
  };

  // performs action when user clicks the ROAM button
  // TODO: this should be handled in parent to better handle integration between components
  const handleOnSubmit = (event) => {
    event.preventDefault();

    // request to backend that will request to API and send back the data
    axios.get(`${process.env.REACT_APP_ENDPOINT}/a?q=${destination}`)
      .then(({ data: { places } }) => {
        setSearchedDestination(places);
      })
      .catch((error) => {
        console.log(error);  // eslint-disable-line
      });
    setDestination('');
  };

  return (
    <div className={styles.Hero}>
      <div className={styles.container}>
        <div className={styles.Hero__search}>
          <form onSubmit={handleOnSubmit} className={styles.Hero__search_form}>
            <input
              className={styles.Hero__search_form__input}
              type="text"
              onChange={handleOnChange}
              value={destination}
              autoComplete="off"
              placeholder="Destination"
            />
            <button type="submit" className={styles.Hero__search_form__submit}>Roam</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
