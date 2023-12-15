import React, { useState, useEffect } from 'react';

const ApiList = () => {
  const [data, setTodoData] = useState([]);

  useEffect(() => {
    fetch('api.php')
      .then(response => response.json())
      .then(data => setTodoData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <ul>
        {data.map(todo => (
          <li key={todo.id}>
            {todo.created_at} - {todo.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiList;