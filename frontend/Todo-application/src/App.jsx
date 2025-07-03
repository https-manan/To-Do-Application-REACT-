import { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = (newTodo) => {
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(data => setTodos([...todos, data]))
    .catch(err => console.error("Error adding todo:", err));
  };

  return (
    <div>
      <CreateTodo addTodo={addTodo} />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
