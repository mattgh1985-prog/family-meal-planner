import React from "react";

function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <p className="text-gray-600">
        This will eventually handle:
      </p>
      <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
        <li>Store preferences (Coles, Woolies, Aldi, etc.)</li>
        <li>Dietary preferences and restrictions</li>
        <li>Notification settings for shopping reminders</li>
        <li>Local area / postcode for price search</li>
      </ul>
    </div>
  );
}

export default Settings;
