import React, { useEffect, useState } from "react";
import { fetchPlansForWeek } from "../api/apiClient";

function getCurrentWeekStartISO() {
  const now = new Date();
  const day = now.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

function Dashboard() {
  const [weekStart] = useState(getCurrentWeekStartISO());
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      try {
        const data = await fetchPlansForWeek(weekStart);
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [weekStart]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Weekly Overview</h1>
      <p className="text-sm text-gray-600 mb-3">
        Week starting: <span className="font-mono">{weekStart}</span>
      </p>

      {loading && <p>Loading plans...</p>}
      {!loading && !plans.length && (
        <p className="text-gray-600">
          No plans yet for this week. Head to the{" "}
          <strong>Preferences</strong> page to add some.
        </p>
      )}

      {!loading && plans.length > 0 && (
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-md bg-white p-3"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <h2 className="font-semibold">
                Member #{plan.memberId} – Budget:{" "}
                {plan.weeklyBudget ? `$${plan.weeklyBudget}` : "Not set"}
              </h2>
              <p className="text-xs text-gray-500">
                {plan.preferences.length} planned meals for this week
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
