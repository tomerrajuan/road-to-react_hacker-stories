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

  // const getAsyncStories = () => {
  //   fetch('http://example.com/movies.json')
  //     .then((response) => response.json())
  //     .then((data) => console.log("data: ", data));
  // };

  // new Promise((resolve) =>
  //   setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  // );

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
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
 
    fetch(`${API_ENDPOINT}react`) // B
      .then((response) => response.json()) // C
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits, // D
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, []);

  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
      >
        <p>search:</p>
      </InputWithLabel>
    </>
  );
}
