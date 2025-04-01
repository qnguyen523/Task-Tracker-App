import React from "react";

/**
 * A functional React component that renders a set of filter buttons.
 * Each button allows the user to set a specific filter for tasks.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.setFilter - A function to update the current filter state.
 *                                      It is called with one of the following values:
 *                                      "all", "completed", or "pending".
 *
 * @returns {JSX.Element} A div containing three buttons for filtering tasks.
 */
const FilterButtons = ({ setFilter }) => {
  return (
    <div className="mb-4 flex gap-2">
      <button onClick={() => setFilter("all")} className="bg-gray-700 px-3 py-1 rounded">All</button>
      <button onClick={() => setFilter("completed")} className="bg-green-500 px-3 py-1 rounded">Completed</button>
      <button onClick={() => setFilter("pending")} className="bg-yellow-500 px-3 py-1 rounded">Pending</button>
    </div>
  );
};

export default FilterButtons;
