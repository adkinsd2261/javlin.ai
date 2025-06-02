import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const linkClasses = 'hover:text-blue-400 transition';

  return (
    <footer className="bg-[#1A1A1A] text-gray-400 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
        <div className="space-x-4 text-sm">
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/pricing" className={linkClasses}>Pricing</NavLink>
          <NavLink to="/marketplace" className={linkClasses}>Marketplace</NavLink>
          <NavLink to="/settings" className={linkClasses}>Settings</NavLink>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Javlin.ai. All rights reserved.</p>
      </div>
    </footer>
  );
}


