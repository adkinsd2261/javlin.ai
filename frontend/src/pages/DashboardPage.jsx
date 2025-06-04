import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ProgressChartCard from "../components/ProgressChartCard";
import ToolCard from "../components/ToolCard";
import TrafficKpiCard from "../components/TrafficKpiCard";
import CompetitorBenchmarkCard from "../components/CompetitorBenchmarkCard";

// Helpers
const formatNumber = (num) => Number(num).toLocaleString("en-US");
const formatPercent = (num) =>
  `${Number(num).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
const formatDollars = (num) =>
  Number(num).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

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
      const res = await fetch(`/api/valuation-summary?url=${encodeURIComponent(inputUrl)}`);
      const result = await res.json();
      if (res.ok) setData(result);
      else setError(result.error || "Failed to load data.");
    } catch {
      setError("Server error while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Tools cards - adjust or expand as needed
  const tools = [
    { title: "SEO Analyzer", description: "Analyze SEO performance.", link: "/tools/seo-analyzer" },
    { title: "Site Health", description: "Check your site's health.", link: "/tools/site-health" },
    { title: "Content Generator", description: "Generate tailored content.", link: "/tools/content-generator" },
  ];

  // Safe data destructuring with fallbacks and dummy placeholders
  const {
    javlinScore = 0,
    speedScore = 0,
    speedChart = [],
    progressData = { value: 0, dataPoints: [], labels: [] },
    trafficData = { value: 0, chart: [] },
    revenueData = { value: 0, chart: [] },
    bounceRate = 0,
    competitorBenchmark = {},
    aiTips = "No tips available.",
  } = data || {};

  // Function to clean and split AI tips text into bullet list if possible
  function renderAiTips(tips) {
    // Basic split by lines or numbered bullets, fallback to paragraph
    const lines = tips.split(/\n|\. /).filter(Boolean).slice(0, 5);
    if (lines.length > 1) {
      return (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {lines.map((line, idx) => (
            <li key={idx}>{line.trim()}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-300">{tips}</p>;
  }

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

        {/* Input */}
        <div className="flex gap-4 mb-8">
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
        {loading && <p className="text-blue-400 font-semibold mb-6">Loading insights...</p>}
        {error && <p className="text-red-500 font-semibold mb-6">{error}</p>}

        {/* Dashboard Content */}
        {data && (
          <>
            {/* KPI Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <JavlinScoreCard score={formatNumber(javlinScore)} />
              <KpiCard title="Speed Score" value={formatPercent(speedScore)} chartData={speedChart} />
              <ProgressChartCard
                title="Progress"
                value={progressData.value}
                dataPoints={progressData.dataPoints}
                labels={progressData.labels}
              />
              <TrafficKpiCard traffic={trafficData.value} chartData={trafficData.chart} />
              <KpiCard
                title="Revenue"
                value={formatDollars(revenueData.value)}
                chartData={revenueData.chart}
              />
              <KpiCard title="Bounce Rate" value={formatPercent(bounceRate)} />
              <CompetitorBenchmarkCard data={competitorBenchmark} />
            </section>

            {/* AI Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">AI Tips</h2>
              <div className="bg-gray-900 rounded-lg shadow-md shadow-blue-600/20 p-6 max-w-3xl">
                {renderAiTips(aiTips)}
              </div>
            </section>

            {/* AI Tools */}
            <section>
              <h2 className="text-2xl font-bold mb-6">AI Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.title} {...tool} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}





























































