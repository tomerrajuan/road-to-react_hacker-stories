import React, { useState, useEffect, useReducer, useCallback } from 'react';
import List from './components/List';
import InputWithLabel from './components/InputWithLabel';
// import { initialStories } from './utils/stories';
import { storiesReducer } from './reducer';

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
  
  const handleFetchStories = useCallback(() => {
    if (!searchTerm) return;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
          dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.hits,
          });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  }, [url]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
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
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearchInput}
        isFocused
      >
        <p>search:</p>
      </InputWithLabel>
      <button disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>

      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading stories...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </>
  );
}
