import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import JavlinLogo from "../assets/logo-blue.png";
import { auth } from "../firebase"; // <-- import initialized auth
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      setDropdownOpen(false);
      navigate("/login"); // adjust this route if needed
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black shadow-md z-10">
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        <img
          src={JavlinLogo}
          alt="Javlin.ai Logo"
          className="h-10 w-auto transform transition-transform duration-200 hover:scale-105"
        />
      </NavLink>

      {/* Navigation Links */}
      <div className="space-x-6 hidden sm:flex">
        {[
          { path: "/", label: "Home" },
          { path: "/valuation", label: "Valuation" },
          { path: "/dashboard", label: "Dashboard" },
          { path: "/pricing", label: "Pricing" },
          { path: "/about", label: "About" },
          { path: "/settings", label: "Settings" },
        ].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `relative inline-block pb-1 transition-colors duration-200 ${
                isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
              } 
              before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300 before:origin-left ${
                isActive ? "before:w-full" : "before:w-0 hover:before:w-full"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Profile Dropdown */}
      <div className="relative ml-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-white font-semibold">
            {auth.currentUser?.email?.[0]?.toUpperCase() || "A"}
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 z-20">
            <NavLink
              to="/profile"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Profile
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}











