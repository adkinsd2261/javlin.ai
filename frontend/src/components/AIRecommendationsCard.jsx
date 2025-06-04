import React from "react";

export default function AIRecommendations({ recommendations = [] }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg max-w-xs w-full">
      <h3 className="text-gray-400 text-xs mb-6 uppercase tracking-wide font-semibold select-none">
        AI Recommendations
      </h3>
      <ul className="flex flex-col gap-4">
        {recommendations.map((rec, i) => (
          <li
            key={i}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-500 select-none"
            onClick={() => alert(`Navigate to: ${rec.link || "#"}`)}
          >
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17l5-5m0 0l-5-5m5 5H6" />
            </svg>
            <span>{rec.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-blue-600 text-sm font-semibold cursor-pointer select-none hover:underline">
        View all
      </div>
    </div>
  );
}

