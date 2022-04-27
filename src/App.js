import * as React from 'react';
import { useState } from 'react';

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

const getTitle = (title) => {
  return title;
};

export default function App() {
  const [inputVal, setInputVal] = useState();

  const onSearch = (e) => {
    setInputVal(e);
  };

  return (
    <div>
      <h1>Hello {getTitle('React')}</h1>
      <Search onSearch={onSearch} value={inputVal} />
      <List list={stories} />
    </div>
  );
}
