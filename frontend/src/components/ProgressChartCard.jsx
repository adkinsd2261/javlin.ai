import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function ProgressChartCard({ progressData }) {
  if (!progressData || progressData.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg text-white max-w-full">
      <h3 className="text-lg font-semibold mb-3">Progress</h3>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={progressData}>
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis hide domain={["dataMin", "dataMax"]} />
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
  );
}
