import "../style/common.css";
import { useState, useEffect, useRef } from "react";
import { ITodo } from "../types/data";
import TodoList from "../components/TodoList";

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        complete: false
      }])
      setValue('');
    }
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        complete: !todo.complete
      }
    }))
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addTodo();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <h1 className="mainTitle">Todo app</h1>
      <div className="inputContainer">
        <input className="inputContainer__input" value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef} type="text" />
        <button className="inputContainer__button" onClick={addTodo}>Add</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </>
  );
}

export default App;