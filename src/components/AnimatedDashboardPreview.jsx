// src/components/AnimatedDashboardPreview.jsx
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

// Mock data for each chart (you can swap these with real data later)
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

// A single card with a line chart and title
function ChartCard({ title, data, strokeColor }) {
  return (
    <motion.div
      className="bg-[#1F1F1F] rounded-2xl shadow-lg p-4 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            axisLine={false}
          />
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#2a2a2a", borderRadius: 6 }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            dot={false}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default function AnimatedDashboardPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ChartCard title="Traffic" data={trafficData} strokeColor="#2563EB" />
      <ChartCard title="Revenue" data={revenueData} strokeColor="#10B981" />
      <ChartCard title="Speed" data={speedData} strokeColor="#FBBF24" />
    </div>
  );
}