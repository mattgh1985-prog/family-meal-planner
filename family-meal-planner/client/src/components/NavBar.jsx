import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? "bg-blue-600 text-white" : "text-blue-700 hover:bg-blue-100"
  }`;

function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-gray-100 px-4 py-3 border-b">
      <div className="font-bold text-xl">Family Meal Planner</div>
      <div className="flex gap-2">
        <NavLink to="/" className={linkClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/members" className={linkClass}>
          Preferences
        </NavLink>
        <NavLink to="/budget" className={linkClass}>
          Budget
        </NavLink>
        <NavLink to="/shopping" className={linkClass}>
          Shopping
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
