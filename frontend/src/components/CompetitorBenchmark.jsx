import React from "react";

export default function CompetitorBenchmark({ competitors }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg max-w-xs w-full">
      <h3 className="text-gray-400 text-xs mb-6 uppercase tracking-wide font-semibold select-none">
        Competitor Benchmark
      </h3>
      {competitors.map(({ name, score }) => (
        <div key={name} className="mb-4 last:mb-0">
          <div className="flex justify-between mb-1 text-sm text-gray-300 select-none">
            <span>{name}</span>
            <span>{score}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${score}%`, transition: "width 0.5s ease" }}
            />
          </div>
        </div>
      ))}
      <div className="mt-4 text-gray-400 text-xs select-none">
        Trusted by over 1,000 bussess
      </div>
    </div>
  );
}

