import React from "react";

export default function JavlinScoreCard({ score }) {
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = (score / 100) * circleCircumference;

  return (
    <div className="bg-gray-900 rounded-xl p-6 max-w-xs shadow-lg shadow-blue-600/30">
      <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Javlin Score</h3>
      <svg
        className="mx-auto block"
        width={120}
        height={120}
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          stroke="#1e293b"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          stroke="#2563eb"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={circleCircumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="36"
          fontWeight="bold"
          fill="white"
          className="select-none"
        >
          {score}
        </text>
      </svg>
      <p className="text-center mt-3 text-gray-400">July 2025</p>
    </div>
  );
}










