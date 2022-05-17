import React, { useState, useEffect, useReducer, useCallback } from 'react';
import List from './components/List';
import { storiesReducer } from './reducer';
import axios from 'axios';
import SearchForm from './components/SearchForm';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

// start of app function
export default function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [searchTerm, setSearchTerm] = useStorageState('search', '');

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = useCallback(async () => {
    if (!searchTerm) return;

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch (error) {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <>
      <h1>My Hacker Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading stories...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </>
  );
}
