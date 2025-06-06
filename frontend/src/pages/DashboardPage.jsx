import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import SpeedScoreCard from "../components/SpeedScoreCard";
import TrafficKpiCard from "../components/TrafficKpiCard";
import ProgressChartCard from "../components/ProgressChartCard";
import AIRecommendationsCard from "../components/AIRecommendationsCard";
import EarningsCard from "../components/EarningsCard";
import CompetitorBenchmarkCard from "../components/CompetitorBenchmarkCard";

// Formatting helpers
function formatNumber(num) {
  if (num == null) return "0";
  return Number(num).toLocaleString("en-US");
}

function formatPercent(num) {
  if (num == null) return "0.0%";
  return `${Number(num).toFixed(1)}%`;
}

function formatDollars(num) {
  if (num == null) return "$0";
  return Number(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    if (!inputUrl.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/valuation-summary?url=${encodeURIComponent(inputUrl)}`);
      const result = await res.json();

      if (res.ok) {
        setData(result);
      } else {
        setError(result.error || "Failed to load data.");
      }
    } catch (err) {
      setError("Server error while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Destructure with safe defaults
  const {
    javlinScore = 0,
    speedScore = 0,
    traffic = { value: 0, chart: [] },
    progress = { value: 0, dataPoints: [], labels: [] },
    aiTips = "",
    aiRecommendations = [],
    earnings = { value: 0, chart: [] },
    competitorBenchmark = { items: [] },
  } = data || {};

  const aiRecommendationsSafe = Array.isArray(aiRecommendations) ? aiRecommendations : [];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-grow p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Dashboard</h1>
          <p className="text-gray-400 max-w-xl">
            Enter a website below to get live AI and PageSpeed insights.
          </p>
        </header>

        {/* Input + Button */}
        <div className="flex gap-4 mb-8 max-w-xl">
          <input
            type="text"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow bg-gray-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={loading}
          />
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Get Insights"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 font-semibold mb-6 select-none" role="alert">
            {typeof error === "string" ? error : "An unexpected error occurred."}
          </p>
        )}

        {/* Data Display */}
        {data ? (
          <>
            {/* Top KPI cards */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <JavlinScoreCard score={formatNumber(javlinScore)} />
              <SpeedScoreCard score={formatPercent(speedScore)} />
              <TrafficKpiCard value={formatNumber(traffic.value)} chartData={traffic.chart || []} />
              <ProgressChartCard
                value={formatNumber(progress.value)}
                dataPoints={progress.dataPoints || []}
                labels={progress.labels || []}
              />
            </section>

            {/* Middle row */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <AIRecommendationsCard recommendations={aiRecommendationsSafe} />
              <EarningsCard value={formatDollars(earnings.value)} chartData={earnings.chart || []} />
            </section>

            {/* Bottom row */}
            <section className="max-w-md mb-12">
              <CompetitorBenchmarkCard items={competitorBenchmark.items || []} />
            </section>

            {/* AI Tips Section */}
            {aiTips && (
              <section className="mt-12 max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">AI Tips</h2>
                <ul className="bg-gray-900 rounded-lg shadow-md shadow-blue-600/20 p-6 space-y-3 text-gray-300 list-disc list-inside">
                  {aiTips
                    .split("\n")
                    .filter(Boolean)
                    .map((tip, idx) => (
                      <li key={idx}>{tip.trim()}</li>
                    ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          // Empty state before loading data
          <div className="mt-20 text-gray-600 text-center select-none">
            Enter a website URL and click "Get Insights" to see dashboard data.
          </div>
        )}
      </main>
    </div>
  );
}
































































