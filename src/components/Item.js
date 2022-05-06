import React from 'react';

const Item = ({ item, onRemoveItem }) => {
  return (
    <li className="list-item">
      <div>
        <a href={item.url}>{item.title}</a>
        <span>{item.author} {item.num_comments} {item.points}</span>
      </div>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default Item;