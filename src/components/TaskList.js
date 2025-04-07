import React from "react";
import TaskItem from "./TaskItem";

/**
 * TaskList component renders a list of tasks or a message if no tasks are available.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.tasks - An array of task objects to be displayed.
 * @param {Function} props.toggleTask - A function to toggle the completion status of a task.
 * @param {Function} props.deleteTask - A function to delete a task.
 * @returns {JSX.Element} The rendered TaskList component.
 */
const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <ul className="w-full max-w-md">
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.document_id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))
      )}
    </ul>
  );
};

export default TaskList;
