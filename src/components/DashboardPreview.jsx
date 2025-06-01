// src/components/DashboardPreview.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const trafficData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 5200 },
  { month: "May", value: 5500 },
];

const revenueData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 13000 },
  { month: "Mar", value: 15000 },
  { month: "Apr", value: 16000 },
  { month: "May", value: 17000 },
];

const speedData = [
  { month: "Jan", value: 70 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 75 },
  { month: "Apr", value: 77 },
  { month: "May", value: 80 },
];

function ChartCard({ title, data, color }) {
  return (
    <motion.div
      className="bg-[#1F1F1F] rounded-2xl shadow-lg p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#666"
            tick={{ fontSize: 12, fill: "#aaa" }}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            tick={{ fontSize: 12, fill: "#aaa" }}
            axisLine={false}
            tickCount={5}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: 8 }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4, stroke: color, strokeWidth: 2, fill: "#1F1F1F" }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default function DashboardPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <ChartCard title="Traffic Overview" data={trafficData} color="#2563EB" />
      <ChartCard title="Revenue Overview" data={revenueData} color="#10B981" />
      <ChartCard title="Speed Overview" data={speedData} color="#FBBF24" />
    </div>
  );
}


