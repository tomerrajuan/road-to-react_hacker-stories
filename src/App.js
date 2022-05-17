import React, { useState, useEffect, useReducer } from 'react';
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
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const getAsyncStories = () => {
    if (!searchTerm) return;
    
    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
          dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.hits,
          });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  useEffect(() => {
    getAsyncStories();
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
  }, [searchTerm]);

  return (
    <>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
      >
        <p>search:</p>
      </InputWithLabel>

      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Search for stories</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </>
  );
}
