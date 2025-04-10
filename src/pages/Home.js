import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";

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
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const tasksCollection = collection(db, "tasks");
  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    const snapshot = await getDocs(tasksCollection);
    const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setTasks(tasksData);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task to Firestore
  const addTask = async(text) => {
    const newTask = {
      text: text,
      description: text || "No description",
      completed: false,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };
    await addDoc(tasksCollection, newTask);
    fetchTasks();
  };

  // Toggle Task
  const toggleTask = async(id, completed) => {
    // Update the task in Firestore
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, { completed: !completed });
    fetchTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });
  return (
    // return a JSX element
    // className is a JSX attribute that sets the class attribute of the element
    // tailwindcss classes are used to style the element
    // the className attribute is used to apply multiple classes to the element
    // the classes are separated by a space
    <div className="min-h-screen bg-gray-500 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <TaskInput addTask={addTask} />
      <FilterButtons setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
};

export default Home;
