import React, { useEffect, useState } from "react";
import { fetchShoppingList } from "../api/apiClient";

function getCurrentWeekStartISO() {
  const now = new Date();
  const day = now.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

function ShoppingList() {
  const [weekStart, setWeekStart] = useState(getCurrentWeekStartISO());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const result = await fetchShoppingList(weekStart);
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Error loading shopping list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Shopping List</h1>

      <div className="flex gap-3 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">
            Week starting
          </label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={weekStart}
            onChange={(e) => setWeekStart(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          onClick={load}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh List"}
        </button>
      </div>

      {!loading && data && (
        <>
          <p className="text-xs text-gray-500 mb-2">
            Pricing status: <strong>{data.pricingStatus}</strong> – freshness:{" "}
            <strong>{data.freshnessRecommendationsStatus}</strong>
          </p>
          {!data.items.length && (
            <p className="text-gray-600">No items for this week yet.</p>
          )}
          {data.items.length > 0 && (
            <ul className="space-y-2">
              {data.items.map((item) => (
                <li
                  key={item.name}
                  className="border rounded bg-white px-3 py-2 flex justify-between"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      Planned quantities: {item.quantities.join(", ")}
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    Price lookup: <span className="italic">todo</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingList;
