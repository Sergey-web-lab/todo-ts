import { ITodo } from "../types/data";

interface ITodoItem extends ITodo {
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const { id, title, complete, removeTodo, toggleTodo } = props;

  return (
    <div>
      <div className="item">
        <input
          type="checkbox"
          checked={complete}
          onChange={() => toggleTodo(id)}
        />
        {complete
          ? <s className="itemTitle">{title}</s>
          : <div className="itemTitle">{title}</div>
        }
        <button onClick={() => removeTodo(id)}>x</button>
      </div>
    </div>
  );
}

export default TodoItem;