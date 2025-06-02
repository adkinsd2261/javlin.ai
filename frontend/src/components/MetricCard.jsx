import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function MetricCard({ title, value, chartData }) {
  return (
    <div className="bg-[#1F1F1F] p-6 rounded-2xl shadow-lg hover:shadow-xl transition h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-gray-400 font-semibold">{title}</h3>
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

