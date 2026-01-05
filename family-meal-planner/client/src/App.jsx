import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MemberPreferences from "./pages/MemberPreferences";
import WeeklyBudget from "./pages/WeeklyBudget";
import ShoppingList from "./pages/ShoppingList";
import Settings from "./pages/Settings";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<MemberPreferences />} />
        <Route path="/budget" element={<WeeklyBudget />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
