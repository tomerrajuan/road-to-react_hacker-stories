import React, { useState, useEffect, useReducer } from 'react';
import List from './components/List';
import InputWithLabel from './components/InputWithLabel';
import { initialStories } from './utils/stories';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORY':
      return state.filter(
        (story) => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
};

// start of app function
export default function App() {
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [isError, setIsError] = useState(false);
  const [stories, dispatchStories] = useReducer(storiesReducer, []);

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORIES',
      payload: item,
    });
  };

  useEffect(() => {
    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        });
      })
      .catch(() => setIsError(true));
  }, []);

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isError && <p>Something went wrong ...</p>}
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
      >
        <p>search:</p>
      </InputWithLabel>
      {stories.length ? (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      ) : (
        <p>Loading stories from api/database...</p>
      )}
    </>
  );
}
