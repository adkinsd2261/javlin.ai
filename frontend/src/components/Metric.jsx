// src/components/Metric.jsx
import React from "react";

export default function Metric({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300 mb-2 last:mb-0">
      <span className="font-medium">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
