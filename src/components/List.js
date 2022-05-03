import React from 'react';
import Item from './Item';

const List = ({ list }) => (
  <div>
    <ul>
      {list.map((item) => 
          <Item
            key={item.objectID}
            title={item.title}
            url={item.url}
            author={item.author}
            num_comments={item.num_comments}
            points={item.points}
          />
      )}
    </ul>
  </div>
);

export default List;
