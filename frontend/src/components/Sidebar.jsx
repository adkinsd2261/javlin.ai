import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkBase =
    "block py-3 px-5 rounded-xl transition-colors duration-300 font-medium";
  const activeClass = "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/40";
  const inactiveClass = "text-gray-300 hover:bg-blue-700 hover:text-white";

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-black shadow-xl z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <ul className="mt-24 space-y-4 px-6">
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/about", label: "About" },
            { to: "/pricing", label: "Pricing" },
            { to: "/settings", label: "Settings" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : inactiveClass}`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}


