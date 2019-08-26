import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styles from './SearchBar.module.scss';

/**
 * @description SearchBar is a component that returns an input form and attraction cards
 */

const SearchBar = ({ handleSearch }) => {
  // user-input state
  const [destination, setDestination] = useState('');

  const handleOnChange = ({ target: { value } }) => {
    setDestination(value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleSearch(destination);
    setDestination('');
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          value={destination}
          autoComplete="off"
          placeholder="Destination"
          required
        />
        <button type="submit"><i className="fas fa-search" /></button>
      </form>
    </div>
  );
};


SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
