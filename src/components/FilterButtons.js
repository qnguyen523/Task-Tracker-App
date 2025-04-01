import React from "react";

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
