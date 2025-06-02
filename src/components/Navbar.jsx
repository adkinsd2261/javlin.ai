import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white transition";

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black shadow-md z-10">
      <NavLink to="/">
        <img src="/logo-blue.png" alt="Javlin.ai Logo" className="h-10 w-auto" />
      </NavLink>
      <div className="space-x-6 flex items-center">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/valuation" className={linkClass}>
          Valuation
        </NavLink>
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/pricing" className={linkClass}>
          Pricing
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>

        {user ? (
          <>
            <NavLink to="/profile" className={linkClass}>
              My Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white transition focus:outline-none"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Log In
            </NavLink>
            <NavLink to="/signup" className={linkClass}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}














