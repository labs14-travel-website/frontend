import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';

/**
 * @description Landing is a component that returns an input form and attraction cards
 */
const Search = ({ handleSearch }) => {
  // user-input state
  const [destination, setDestination] = useState('');

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
    <div className={styles.Search}>
      <form onSubmit={handleOnSubmit} className={styles.Search__form}>
        <input
          className={styles.Search__form__input}
          type="text"
          onChange={handleOnChange}
          value={destination}
          autoComplete="off"
          placeholder="Destination"
          required
        />
        <button type="submit" className={styles.Search__form__submit}>Roam</button>
      </form>
    </div>
  );
};


Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
