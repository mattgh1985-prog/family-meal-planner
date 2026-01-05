import React, { useEffect, useState } from "react";
import { fetchMembers, fetchMeals, savePlan } from "../api/apiClient";

function getCurrentWeekStartISO() {
  const now = new Date();
  const day = now.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const mealTypes = ["breakfast", "lunch", "dinner"];

function MemberPreferences() {
  const [members, setMembers] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [weekStart, setWeekStart] = useState(getCurrentWeekStartISO());
  const [preferences, setPreferences] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [membersData, mealsData] = await Promise.all([
          fetchMembers(),
          fetchMeals()
        ]);
        setMembers(membersData);
        setMeals(mealsData);
        if (membersData.length) {
          setSelectedMemberId(membersData[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleChangePreference = (day, mealType, mealId) => {
    setPreferences((prev) => {
      const existingIndex = prev.findIndex(
        (p) => p.day === day && p.mealType === mealType
      );
      if (existingIndex >= 0) {
        const newPrefs = [...prev];
        newPrefs[existingIndex] = { ...newPrefs[existingIndex], mealId };
        return newPrefs;
      }
      return [...prev, { day, mealType, mealId }];
    });
  };

  const handleSave = async () => {
    if (!selectedMemberId) return;
    setSaving(true);
    try {
      await savePlan({
        memberId: selectedMemberId,
        weekStart,
        preferences
      });
      alert("Preferences saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Member Meal Preferences
      </h1>

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">
            Family Member
          </label>
          <select
            className="border rounded px-2 py-1"
            value={selectedMemberId || ""}
            onChange={(e) => setSelectedMemberId(Number(e.target.value))}
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
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
          onClick={handleSave}
          disabled={saving || !selectedMemberId}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      <div className="overflow-auto border rounded bg-white">
        <table className="min-w-full text-sm">
          <thead style={{ backgroundColor: "#f3f4f6" }}>
            <tr>
              <th className="border px-2 py-1 text-left">Day</th>
              {mealTypes.map((type) => (
                <th
                  key={type}
                  className="border px-2 py-1 text-left capitalize"
                >
                  {type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="border px-2 py-1 font-medium">{day}</td>
                {mealTypes.map((type) => {
                  const selected = preferences.find(
                    (p) => p.day === day && p.mealType === type
                  );
                  return (
                    <td key={type} className="border px-2 py-1">
                      <select
                        className="border rounded px-1 py-1 w-full"
                        value={selected?.mealId || ""}
                        onChange={(e) =>
                          handleChangePreference(
                            day,
                            type,
                            Number(e.target.value)
                          )
                        }
                      >
                        <option value="">— Select meal —</option>
                        {meals.map((meal) => (
                          <option key={meal.id} value={meal.id}>
                            {meal.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberPreferences;
