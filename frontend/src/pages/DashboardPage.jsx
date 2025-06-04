import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import TrafficKpiCard from "../components/TrafficKpiCard";
import ProgressChartCard from "../components/ProgressChartCard";
import AIRecommendationsCard from "../components/AIRecommendationsCard";
import EarningsCard from "../components/EarningsCard";
import CompetitorBenchmarkCard from "../components/CompetitorBenchmarkCard";
import PageSpeedCard from "../components/PageSpeedCard";
import ToolCard from "../components/ToolCard";

// Helpers for formatting numbers, percents, currency
const formatNumber = (num) => Number(num).toLocaleString("en-US");
const formatPercent = (num) =>
  `${Number(num).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
const formatCurrency = (num) =>
  Number(num).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

// Parse AI tips text into bullet points (split by lines, filter empty)
const parseAITips = (text) => {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

export default function DashboardPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tools = [
    { title: "SEO Analyzer", description: "Analyze SEO performance.", link: "/tools/seo-analyzer" },
    { title: "Site Health", description: "Check your site's health.", link: "/tools/site-health" },
    { title: "Content Generator", description: "Generate tailored content.", link: "/tools/content-generator" },
  ];

  // Fetch insights from backend API
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
    } catch {
      setError("Server error while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Extract AI tips array from raw text
  const aiTipsList = data ? parseAITips(data.aiTips) : [];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-grow p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Dashboard</h1>
          <p className="text-gray-400 max-w-xl">Enter a website below to get live AI and PageSpeed insights.</p>
        </header>

        {/* Input form */}
        <div className="flex gap-4 mb-12 max-w-4xl">
          <input
            type="text"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow bg-gray-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Loading..." : "Get Insights"}
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 font-semibold mb-6">{error}</p>}

        {/* Dashboard grid */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left main column (8/12) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Javlin Score */}
              <JavlinScoreCard score={data.javlinScore || 0} />

              {/* Speed Score */}
              <PageSpeedCard
                score={data.speedScore || 0}
                chartData={data.speedChart || []}
                loading={loading}
              />

              {/* Traffic KPI */}
              <TrafficKpiCard
                title="Traffic"
                value={formatNumber(data.traffic || 0)}
                chartData={data.trafficChart || []}
              />

              {/* Progress Chart */}
              <ProgressChartCard
                title="Progress"
                chartData={data.progressChart || []}
                value={data.progressValue || 0}
              />

              {/* Earnings Card */}
              <EarningsCard
                earnings={formatCurrency(data.earnings || 0)}
                pageSpeed={data.pageSpeed || 0}
              />
            </div>

            {/* Right sidebar column (4/12) */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* AI Recommendations */}
              <AIRecommendationsCard
                title="AI Recommendations"
                recommendations={aiTipsList}
              />

              {/* Competitor Benchmark */}
              <CompetitorBenchmarkCard
                competitors={data.competitorBenchmarks || []}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


























































