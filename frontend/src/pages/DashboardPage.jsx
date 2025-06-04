import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ToolCard from "../components/ToolCard";
import PageSpeedCard from "../components/PageSpeedCard";
import CompetitorBenchmark from "../components/CompetitorBenchmark";
import AIRecommendations from "../components/AIRecommendations";
import EarningsCard from "../components/EarningsCard";

// Helper formatters
function formatNumber(num) {
  return Number(num).toLocaleString("en-US");
}

function formatPercent(num) {
  return `${Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;
}

function formatDollars(num) {
  return Number(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const handleFetchData = async () => {
    if (!inputUrl) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `/api/valuation-summary?url=${encodeURIComponent(inputUrl)}`
      );
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

  // Dummy fallback data for placeholders while building
  const mockLineData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 60 },
    { month: "Apr", value: 55 },
    { month: "May", value: 75 },
  ];

  const mockCompetitors = [
    { name: "Bestboy.com", score: 86 },
    { name: "example.com", score: 79 },
  ];

  const mockRecommendations = [
    { text: "Increase backlink count to at least 30", link: "#" },
    { text: "Improve page load speed to under 3 seconds", link: "#" },
    { text: "Add alt text to 20 images missing descriptions", link: "#" },
    { text: "Update your top-performing content from 2024", link: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-grow p-10 max-w-7xl mx-auto space-y-10">
        <header>
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight">Dashboard</h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Enter a website below to get live AI and PageSpeed insights.
          </p>
        </header>

        {/* Input */}
        <div className="flex gap-4 max-w-3xl">
          <input
            type="text"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow bg-gray-900 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-4 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Loading..." : "Get Insights"}
          </button>
        </div>

        {/* Loading & Error */}
        {loading && (
          <p className="text-blue-400 font-semibold max-w-3xl">Loading insights...</p>
        )}
        {error && (
          <p className="text-red-500 font-semibold max-w-3xl">{error}</p>
        )}

        {/* Data Panels */}
        {data && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-semibold">Javlin Pro</div>
                  <button className="text-blue-500 hover:underline text-sm">Upgrade</button>
                </div>
                <JavlinScoreCard score={formatNumber(data.javlinScore || 0)} />
                <div className="mt-4 text-gray-400 text-xs select-none">
                  Powered by Google
                </div>
              </div>

              <EarningsCard
                earnings={data.earnings || 8420}
                chartData={data.earningsChart || mockLineData}
              />

              <PageSpeedCard speed={data.pageSpeed || 1.9} />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <AIRecommendations
                recommendations={data.aiRecommendations || mockRecommendations}
              />

              <CompetitorBenchmark
                competitors={data.competitors || mockCompetitors}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <KpiCard
                title="Speed Score"
                value={formatPercent(data.speedScore || 0)}
                chartData={data.speedChart || mockLineData}
              />

              <KpiCard
                title="Traffic"
                value={formatNumber(data.traffic || 31500)}
                chartData={data.trafficChart || mockLineData}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}






















































