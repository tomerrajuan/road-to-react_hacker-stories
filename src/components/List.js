import React from 'react';
import Item from './Item';

const List = ({ list, onRemoveItem }) => (
  <div>
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  </div>
);

export default List;
