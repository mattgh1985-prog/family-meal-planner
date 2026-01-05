import React from "react";
import NavBar from "./NavBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <footer className="text-center text-xs text-gray-500 py-3 border-t">
        Family Meal Planner &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Layout;
