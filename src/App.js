import * as React from 'react';
import List from './components/List';
import InputWithLabel from './components/InputWithLabel';
import { initialStories } from './utils/stories';

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
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [stories, setStories] = React.useState([]);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  React.useEffect(() => {
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
    });
  }, []);

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {stories.length ? (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
