import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import SpeedScoreCard from "../components/SpeedScoreCard";
import TrafficKpiCard from "../components/TrafficKpiCard";
import ProgressChartCard from "../components/ProgressChartCard";
import AIRecommendationsCard from "../components/AIRecommendationsCard";
import EarningsCard from "../components/EarningsCard";
import CompetitorBenchmarkCard from "../components/CompetitorBenchmarkCard";

export default function DashboardPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    if (!inputUrl) {
      setError("Please enter a website URL.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/valuation-summary?url=${encodeURIComponent(inputUrl)}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch data");
      }
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Sample mock AI recommendations (replace with real from backend)
  const mockAIRecommendations = [
    "Increase backlink count to at least 30",
    "Improve page load speed to under 3 seconds",
    "Add alt text to 20 images that are missing",
    "Update your top-performing content from 2024",
  ];

  // Mock competitor benchmark data
  const mockCompetitorData = [
    { name: "Bestboy.com", score: 86 },
    { name: "Example.com", score: 79 },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-grow max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold mb-4">Dashboard</h1>
        <p className="mb-8 text-gray-400 max-w-xl">
          Enter a website below to get live AI and PageSpeed insights.
        </p>

        {/* Input and button */}
        <div className="flex gap-4 mb-12 max-w-3xl">
          <input
            type="text"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow bg-gray-900 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg px-6 py-3 font-semibold"
          >
            {loading ? "Loading..." : "Get Insights"}
          </button>
        </div>
        {error && <p className="text-red-500 mb-6 font-semibold">{error}</p>}

        {/* Data grid */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column: Scores */}
            <div className="space-y-6">
              <JavlinScoreCard score={data.javlinScore || 0} />
              <SpeedScoreCard
                score={data.speedScore || 0}
                chartData={data.speedChart}
              />
              <TrafficKpiCard
                traffic={data.traffic || 0}
                chartData={data.trafficChart}
              />
              <ProgressChartCard progress={data.progress || 0} />
            </div>

            {/* Middle column: Recommendations & Earnings */}
            <div className="space-y-6">
              <AIRecommendationsCard
                recommendations={data.aiRecommendations || mockAIRecommendations}
              />
              <EarningsCard earnings={data.earnings || 0} />
            </div>

            {/* Right column: Competitor Benchmark */}
            <div className="space-y-6">
              <CompetitorBenchmarkCard
                competitors={data.competitors || mockCompetitorData}
              />
            </div>
          </div>
        )}

        {/* Footer branding */}
        <footer className="mt-16 text-center text-gray-600 space-x-6">
          <span>Heined by Google</span>
          <span>Lighthouse</span>
          <span>Trusted by Trusted</span>
        </footer>
      </main>
    </div>
  );
}



























































