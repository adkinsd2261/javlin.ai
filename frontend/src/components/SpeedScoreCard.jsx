import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SpeedScoreCard({ value, chartData }) {
  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "Speed Score",
        data: chartData.map((item) => item.value),
        fill: false,
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "white",
        bodyColor: "white",
      },
    },
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 max-w-xs shadow-lg shadow-blue-600/30 flex flex-col">
      <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">
        Speed Score
      </h3>
      <p className="text-3xl font-bold text-white mb-4">{value}</p>
      <div style={{ height: "100px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
