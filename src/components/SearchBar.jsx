// src/SearchBar.js

import '../styles/SearchBar.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokemon"
      onChange={onSearchChange}
      className="search-bar"
    />
  );
};

SearchBar.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
};
  
  export default SearchBar;