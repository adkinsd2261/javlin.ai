import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', score: 70 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 80 },
  { month: 'Jun', score: 82 },
  { month: 'Jul', score: 85 },
  { month: 'Aug', score: 88 },
  { month: 'Sep', score: 90 },
];

export default function LineGraph() {
  return (
    <div className="bg-[#1F1F1F] rounded-2xl p-6 shadow-md w-full col-span-2">
      <h3 className="text-lg font-semibold mb-4 text-blue-500">Historical Javlin Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
