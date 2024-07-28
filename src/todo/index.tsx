/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  createTodos,
  getTodos,
  deleteTodos,
  updateTodo,
  SQL,
  Todo,
  exportDatabase,
} from "../helper";
import CreateTodoForm from "./create-todo";
import TodoItem from "./todo-item";

const _db = new SQL.Database(
  new Uint8Array(localStorage.getItem("db")!.split(",").map(Number))
);

_db.run(`CREATE TABLE IF NOT EXISTS todos (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  status VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleCreate = async (title: string) => {
    createTodos(_db, title);
    const _todos = getTodos(_db);
    setTodos(_todos);
    exportDatabase(_db);
  };

  const handleDelete = async (id: string) => {
    if (confirm("are you sure you want to delete this item")) {
      deleteTodos(_db, id);
      const _todos = getTodos(_db);
      setTodos(_todos);
      exportDatabase(_db);
    }
  };

  const handleUpdate = async (id: string, status: string) => {
    updateTodo(_db, id, status);
    const _todos = getTodos(_db);
    setTodos(_todos);
    exportDatabase(_db);
  };

  useEffect(() => {
    const _todos = getTodos(_db);
    setTodos(_todos);
  }, []);

  return (
    <div className="w-full h-screen pt-8">
      <div className="bg-white p-3 max-w-md mx-auto">
        <CreateTodoForm handleCreate={handleCreate} />
        <TodoItem
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          todos={todos}
        />
        <div className="mt-8">
          <button className="border-2 border-red-500 p-2 text-red-500">
            Clear Completed Task
          </button>
          <button className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4">
            Reset Todo List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
