import { useState } from "react";

const CreateTodoForm = ({
  handleCreate,
}: {
  handleCreate: (title: string) => Promise<void>;
}) => {
  const [title, setTitle] = useState("");
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Todo App</h1>
      <div className="mt-4 flex">
        <input
          className="w-80 border-b-2 border-gray-500 text-black"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task here"
        />
        <button
          className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
          onClick={() => handleCreate(title)}
        >
          <i className="fas fa-calendar-plus text-xl mr-2 inline-block" />
          <span className="ml-2">Add</span>
        </button>
      </div>
    </div>
  );
};

export default CreateTodoForm;
