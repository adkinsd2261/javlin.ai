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
    <div className="bg-gray-900 rounded-xl p-6 flex flex-col justify-between w-full max-w-xs shadow-lg">
      <h3 className="text-gray-400 text-xs mb-2 uppercase tracking-wider font-semibold select-none">
        {title}
      </h3>
      <h2 className="text-white text-3xl font-extrabold mb-5 select-none">{value}</h2>

      {chartData && (
        <div style={{ height: 90, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280" }} // Tailwind gray-500
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none", padding: "8px 12px" }} // Added padding for breathing room
                labelStyle={{ color: "#9CA3AF" }} // Tailwind gray-400
                itemStyle={{ color: "#F9FAFB" }} // Tailwind gray-50
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6" // Tailwind blue-500
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





