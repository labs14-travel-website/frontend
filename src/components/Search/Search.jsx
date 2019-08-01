import React, { useState } from 'react';
import axios from 'axios';

import styles from './Search.module.scss';

/**
 * @description Landing is a component that returns an input form and attraction cards
 */
const Search = ({ handleSearch }) => {
  // user-input state
  const [destination, setDestination] = useState('');

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

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleSearch(destination);
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
