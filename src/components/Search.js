import React from 'react';

const Search = ({ onSearch, value }) => {

  return (
    <>
      <div>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <p>{value}</p>
    </>
  );
};

export default Search;
