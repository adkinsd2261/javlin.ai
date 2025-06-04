import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function EarningsCard({ earnings, chartData }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg max-w-xs w-full">
      <h3 className="text-gray-400 text-xs mb-2 uppercase tracking-wide font-semibold select-none">
        EARNINGS
      </h3>
      <h2 className="text-white text-3xl font-extrabold mb-5 select-none">
        ${earnings.toLocaleString()}
      </h2>
      {chartData && (
        <div style={{ height: 70, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={false}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
