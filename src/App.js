import * as React from 'react';
import List from './components/List';
import Search from './components/Search';

function getTitle(title) {
  return title;
}

function App() {
  return (
    <div>
      <h1>Hello {getTitle('React')}</h1>
      <Search />
      <List />
    </div>
  );
}

export default App;
