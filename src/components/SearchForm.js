import React from 'react';
import InputWithLabel from './InputWithLabel';

export default function SearchForm({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) {
  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={onSearchInput}
        isFocused
      >
        search for stories:
      </InputWithLabel>
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );
}
