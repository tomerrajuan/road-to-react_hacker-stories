import React from 'react';

const Search = ({ onSearch, search }) => {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <p>{search}</p>
    </>
  );
};

export default Search;
