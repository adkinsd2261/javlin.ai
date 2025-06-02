// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-black shadow-lg z-40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <ul className="mt-20 space-y-6 px-6 text-white">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block py-2 px-4 rounded hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-4 rounded hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `block py-2 px-4 rounded hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block py-2 px-4 rounded hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Overlay when sidebar open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

