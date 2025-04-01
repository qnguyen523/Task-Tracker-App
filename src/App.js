import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

/**
 * The main App component for the Task Tracker application.
 * Manages the state of tasks and their filters, and handles task-related operations.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered App component.
 *
 * @example
 * <App />
 *
 * @description
 * - Uses `useState` to manage the list of tasks and the current filter.
 * - Uses `useEffect` to persist tasks to localStorage and retrieve them on initial render.
 * - Provides functionality to add, toggle, and delete tasks.
 * - Filters tasks based on the selected filter ("all", "completed", "pending").
 *
 * @function addTask
 * @param {string} text - The text of the new task to be added.
 * @description Adds a new task to the task list with a unique ID and a default `completed` status of `false`.
 *
 * @function toggleTask
 * @param {number} id - The ID of the task to toggle.
 * @description Toggles the `completed` status of a task by its ID.
 *
 * @function deleteTask
 * @param {number} id - The ID of the task to delete.
 * @description Removes a task from the task list by its ID.
 *
 * @function filteredTasks
 * @returns {Array<Object>} The list of tasks filtered based on the current filter.
 * @description Filters tasks to show all, completed, or pending tasks based on the selected filter.
 */
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text: text, completed: false };
    console.log("newTask", newTask);
    // create a new array by combining the elelemtns of an existing array (tasks)
    // with a new element (newTask)
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        // create a new object by copying the properties of an existing object (task)
        // and then mofidying one of its properties (completed)
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-500 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <TaskInput addTask={addTask} />
      <FilterButtons setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
