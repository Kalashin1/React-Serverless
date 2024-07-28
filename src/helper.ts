/* eslint-disable @typescript-eslint/no-explicit-any */
import initSqlJs, { Database } from "sql.js";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  title: string;
  status: "CREATED" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
};

export const SQL = await initSqlJs({
  locateFile: () => `/node_modules/sql.js/dist/sql-wasm.wasm`,
});

export const getTodos = (db: Database) => {
  const str = `
    SELECT * FROM todos
  `;
  const result = db.exec(str);
  const keys = result[0]?.columns ?? [];
  const values = result[0]?.values ?? [];
  const todos: Todo[] = [];
  values.forEach((value) => {
    const _todo: any = {};
    value.forEach((val, index) => {
      _todo[keys[index]] = val;
    });
    todos.push(_todo);
  });
  return todos;
};

export const createTodos = (db: Database, title: string) => {
  const str = `INSERT INTO todos (title, status, id)
VALUES ('${title}', 'CREATED', '${uuidv4()}');
 `;
  const statement = db.prepare(str);
  statement.run();
};

export const deleteTodos = (db: Database, id: string) => {
  const str = `DELETE FROM todos WHERE id="${id}"`;
  db.run(str);
};

export const updateTodo = (db: Database, id: string, status: string) => {
  const str = `UPDATE todos SET status="${status}", updatedAt=CURRENT_TIMESTAMP WHERE id="${id}"`;
  const statement = db.prepare(str);
  statement.run();
};

export const exportDatabase = (db: Database) => {
  const data = db.export();

  localStorage.setItem("db", data.toString());

  // Create a Blob from the SQL script
  // const blob = new Blob([data], { type: "application/octect-stream" });

  // Create a file download link
  // const link = document.createElement("a");
  // link.href = URL.createObjectURL(blob);
  // link.download = "database.sql";
  // link.click();
};
