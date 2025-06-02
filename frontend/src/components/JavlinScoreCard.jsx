import React from "react";

export default function JavlinScoreCard({ score }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 rounded-xl p-6 shadow-lg max-w-xs w-full">
      {/* Label */}
      <div className="text-gray-400 text-xs uppercase font-semibold mb-4 tracking-wide select-none">
        Javlin Score
      </div>

      {/* Circular Score Ring */}
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-800"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-600"
            strokeWidth="10"
            strokeDasharray={`${score * 2.82} 282`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transition: "stroke-dasharray 0.7s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-extrabold select-none">
          {score}
        </div>
      </div>
    </div>
  );
}








