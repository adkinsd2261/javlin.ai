// src/components/KpiCard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function KpiCard({ title, value, chartData }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 flex flex-col justify-between w-full max-w-xs">
      <h3 className="text-gray-400 text-sm mb-1 uppercase tracking-wide">{title}</h3>
      <h2 className="text-white text-3xl font-bold mb-4">{value}</h2>

      {chartData && (
        <div style={{ height: 80, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
                labelStyle={{ color: "#999" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2}
                dot={false}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}




