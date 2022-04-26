import * as React from 'react';
import List from './components/List';
import Search from './components/Search';

const getTitle = (title) => {
  return title;
};

const App = () => (
  <div>
    <h1>Hello {getTitle('React')}</h1>
    <Search />
    <List />
  </div>
);

export default App;
