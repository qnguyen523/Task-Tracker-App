import React, { useState } from "react";

/**
 * TaskInput component allows users to input and submit new tasks.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Function} props.addTask - A function to add a new task. It receives the task text as an argument.
 *
 * @returns {JSX.Element} A form element with an input field and a submit button for adding tasks.
 */
const TaskInput = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        className="p-2 w-64 text-black rounded"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default TaskInput;
