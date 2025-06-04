import React from "react";

export default function CompetitorBenchmark({ competitors }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 max-w-md shadow-lg">
      <h3 className="text-gray-400 text-xs mb-4 uppercase tracking-wider font-semibold select-none">
        Competitor Benchmark
      </h3>
      {competitors.map(({ name, score }) => (
        <div key={name} className="mb-4 last:mb-0">
          <div className="flex justify-between mb-1 text-white font-semibold select-none">
            <span>{name}</span>
            <span>{score}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      ))}
      <p className="text-gray-400 text-xs mt-4 select-none">Trusted by over 1,000 businesses</p>
    </div>
  );
}
