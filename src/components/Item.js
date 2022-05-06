import React from 'react';
import Button from './Button';

const Item = ({ item, onRemoveItem }) => {
  return (
    <li className="list-item">
      <div>
        <a href={item.url}>{item.title}</a>
        <span>{item.author} {item.num_comments} {item.points}</span>
      </div>
      <Button arg={item} label="Dismiss" handleClick={onRemoveItem} />
    </li>
  );
};

export default Item;