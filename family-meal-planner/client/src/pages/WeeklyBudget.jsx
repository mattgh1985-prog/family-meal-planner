import React, { useState } from "react";

function WeeklyBudget() {
  const [budget, setBudget] = useState(200);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Budget saving not wired yet, but value is $${budget}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Weekly Budget</h1>
      <form onSubmit={handleSubmit} className="max-w-sm space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Budget per week (AUD)
          </label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Save Budget (stub)
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-3">
        Later this will sync with the backend <code>plans</code> data and
        adjust your recommendations.
      </p>
    </div>
  );
}

export default WeeklyBudget;
