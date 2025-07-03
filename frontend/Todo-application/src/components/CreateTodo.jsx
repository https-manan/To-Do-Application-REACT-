import { useState } from "react";

export function CreateTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <button onClick={() => {
        if (!title || !description) return;
        addTodo({ title, description });
        setTitle("");
        setDescription("");
      }}>
        Add a Todo
      </button>
    </div>
  );
}
