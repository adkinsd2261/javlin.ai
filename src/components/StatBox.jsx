// src/components/StatBox.jsx
import React from "react";

export default function StatBox({ title, children, className = "" }) {
  return (
    <div
      className={`bg-[#121212] p-6 rounded-xl shadow-lg border border-gray-800 flex flex-col ${className}`}
    >
      <h3 className="text-gray-400 uppercase tracking-wide text-sm mb-4">{title}</h3>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
