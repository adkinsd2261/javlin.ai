import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import TrafficKpiCard from "../components/TrafficKpiCard";
import EarningsCard from "../components/EarningsCard";
import ProgressChartCard from "../components/ProgressChartCard";
import CompetitorBenchmarkCard from "../components/CompetitorBenchmarkCard";
import AIRecommendationsCard from "../components/AIRecommendationsCard";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  // Formatting helpers
  const formatPercent = (num) =>
    `${Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`;

  const formatNumber = (num) =>
    Number(num).toLocaleString("en-US");

  // Fetch dashboard data
  const handleFetchData = async () => {
    if (!inputUrl) {
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
    }
    setLoading(false);
  };

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

        {/* Input and Button */}
        <div className="flex gap-4 mb-8 max-w-4xl">
          <input
            type="text"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Loading..." : "Get Insights"}
          </button>
        </div>

        {/* Loading and Error */}
        {loading && (
          <p className="text-blue-400 font-semibold mb-6">Loading insights...</p>
        )}
        {error && <p className="text-red-500 font-semibold mb-6">{error}</p>}

        {/* Results */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Main Cards */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <JavlinScoreCard score={data.javlinScore || 0} />
              <KpiCard
                title="Speed Score"
                value={formatPercent(data.speedScore || 0)}
                chartData={data.speedChart}
              />
              <TrafficKpiCard
                title="Traffic"
                value={formatNumber(data.traffic || 0)}
                chartData={data.trafficChart}
              />
              <EarningsCard
                earnings={data.earnings}
                pageSpeed={data.pageSpeed}
              />
            </div>

            {/* Right Sidebar Cards */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <AIRecommendationsCard recommendations={data.aiRecommendations || []} />
              <ProgressChartCard progressData={data.progressData} />
              <CompetitorBenchmarkCard competitors={data.competitors} />
            </div>

            {/* AI Tips - full width */}
            <section className="md:col-span-12 mt-8">
              <h2 className="text-2xl font-bold mb-4">AI Tips</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-300 p-6 bg-gray-900 rounded-lg shadow-md shadow-blue-600/20">
                {data.aiTips}
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

























































