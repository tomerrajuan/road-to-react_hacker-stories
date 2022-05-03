import * as React from 'react';
import { useState, useEffect } from 'react';
import List from './components/List';
import Search from './components/Search';

const stories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default function App() {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h1>Hello World</h1>
      <Search onSearch={handleSearch} search={searchTerm} />
      <List list={searchedStories} />
    </div>
  );
}
