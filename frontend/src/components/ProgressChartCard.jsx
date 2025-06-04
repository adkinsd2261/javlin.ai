import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function ProgressChartCard({ title, value, dataPoints, labels }) {
  const data = {
    labels: labels || ["Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: title,
        data: dataPoints || [72, 75, 78, 86],
        fill: true,
        borderColor: "#2563EB", // Tailwind blue-600
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1E40AF",
        titleColor: "#EFF6FF",
        bodyColor: "#EFF6FF",
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8" }, // Tailwind gray-400
      },
      y: {
        grid: { color: "#334155" }, // Tailwind gray-700
        ticks: { color: "#94A3B8", beginAtZero: true },
      },
    },
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-md max-w-xs">
      <h3 className="text-gray-400 uppercase tracking-wide font-semibold mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2 mb-3">
        <span className="text-3xl font-extrabold text-white">{value}</span>
        <span className="text-gray-400 text-lg">%</span>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

