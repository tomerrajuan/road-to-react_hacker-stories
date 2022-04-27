﻿import React, { useState } from 'react';

const Search = () => {
  const [inputVal, setInputVal] = useState();

  const handleChange = (event) => {
    setInputVal(event.target.value);
    // synthetic event
    console.log(event);
    // value of target (here: element)
    console.log(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={handleChange} />
      </div>
      <p>{inputVal}</p>
    </>
  );
};

export default Search;
