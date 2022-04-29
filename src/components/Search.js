import React from 'react';

const Search = ({ onSearch, search }) => {

  return (
    <>
      <div>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <p>{search}</p>
    </>
  );
};

export default Search;
