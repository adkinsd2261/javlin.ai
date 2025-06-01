import React from "react";
import { Link } from "react-router-dom";
import JavlinLogo from "../assets/logo-blue.png"; // Make sure this path is correct

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black shadow-md">
      {/* Clickable logo linking home */}
      <Link to="/">
        <img
          src={JavlinLogo}
          alt="Javlin.ai Logo"
          className="h-10 w-auto"
          loading="lazy"
        />
      </Link>

      {/* Navigation links */}
      <div className="space-x-8 text-white font-semibold text-lg">
        <Link to="/valuation" className="hover:text-blue-500 transition">
          Valuation
        </Link>
        <Link to="/dashboard" className="hover:text-blue-500 transition">
          Dashboard
        </Link>
        <Link to="/tools" className="hover:text-blue-500 transition">
          Tools
        </Link>
        <Link to="/pricing" className="hover:text-blue-500 transition">
          Pricing
        </Link>
        <Link to="/about" className="hover:text-blue-500 transition">
          About
        </Link>
      </div>
    </nav>
  );
}




