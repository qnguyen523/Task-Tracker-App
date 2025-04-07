import React from "react";

/**
 * TaskItem component represents a single task item in a task list.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.task - The task object containing task details.
 * @param {string} props.task.id - The unique identifier for the task.
 * @param {string} props.task.text - The text description of the task.
 * @param {boolean} props.task.completed - Indicates whether the task is completed.
 * @param {Function} props.toggleTask - Function to toggle the completion status of the task.
 * @param {Function} props.deleteTask - Function to delete the task.
 * @returns {JSX.Element} A list item representing a task with a checkbox and delete button.
 */

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  console.log('task', task)
  return (
    <li className="flex justify-between items-center bg-gray-800 p-2 mb-2 rounded">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id, task.completed)}
          className="w-4 h-4"
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
