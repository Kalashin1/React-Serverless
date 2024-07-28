import { Todo } from "../helper";

const TodoItem = ({
  todos,
  handleDelete,
  handleUpdate,
}: {
  todos: Todo[];
  handleUpdate: (id: string, status: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}) => {
  return (
    <div className="mt-8">
      <ul>
        {todos.map((todo) => {
          return (
            <li className="p-2 rounded-lg">
              <div className="flex align-middle flex-row justify-between">
                <div className="p-2">
                  <input
                    type="checkbox"
                    className="h-6 w-6 "
                    onChange={() => handleUpdate(todo.id, "COMPLETED")}
                    checked={todo.status === "COMPLETED"}
                  />
                </div>
                <div className="p-2">
                  <p className="text-lg text-gray-400">{todo.title}</p>
                </div>
                <button className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg justify-between items-center">
                  <i className="fas fa-trash font-xl" />
                  <span
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  >
                    Remove
                  </span>
                </button>
              </div>
              <hr className="mt-2" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoItem;
