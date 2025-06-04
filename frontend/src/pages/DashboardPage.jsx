import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ToolCard from "../components/ToolCard";

// Formatting helpers
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
      if (res.ok) setData(result);
      else setError(result.error || "Failed to load data.");
    } catch (err) {
      setError("Server error while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const tools = [
    {
      title: "SEO Analyzer",
      description: "Analyze SEO performance.",
      link: "/tools/seo-analyzer",
    },
    {
      title: "Site Health",
      description: "Check your site's health.",
      link: "/tools/site-health",
    },
    {
      title: "Content Generator",
      description: "Generate tailored content.",
      link: "/tools/content-generator",
    },
  ];

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

        {/* Input & Button */}
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

        {/* Loading & Error */}
        {loading && (
          <p className="text-blue-400 font-semibold mb-6">Loading insights...</p>
        )}
        {error && <p className="text-red-500 font-semibold mb-6">{error}</p>}

        {/* Data display */}
        {data && (
          <>
            {/* KPI Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-900 rounded-xl shadow-md shadow-blue-600/20 p-6 transition-shadow duration-300 hover:shadow-blue-600/50">
                <JavlinScoreCard score={formatNumber(data.javlinScore)} />
              </div>

              <div className="bg-gray-900 rounded-xl shadow-md shadow-blue-600/20 p-6 transition-shadow duration-300 hover:shadow-blue-600/50 flex flex-col justify-center">
                <KpiCard
                  title="Speed Score"
                  value={formatPercent(data.speedScore)}
                  chartData={data.speedChart}
                />
              </div>

              <div className="bg-gray-900 rounded-xl shadow-md shadow-blue-600/20 p-6 transition-shadow duration-300 hover:shadow-blue-600/50 flex flex-col justify-center">
                <KpiCard
                  title="Monthly Traffic"
                  value={formatNumber(data.traffic)}
                  chartData={data.trafficChart}
                />
              </div>

              <div className="bg-gray-900 rounded-xl shadow-md shadow-blue-600/20 p-6 transition-shadow duration-300 hover:shadow-blue-600/50 flex flex-col justify-center">
                <KpiCard
                  title="Monthly Earnings"
                  value={formatDollars(data.earnings)}
                  chartData={data.earningsChart}
                />
              </div>
            </section>

            {/* Competitors */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Competitors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.competitors.map((c) => (
                  <div
                    key={c.name}
                    className="bg-gray-900 rounded-lg p-4 shadow-md shadow-blue-600/20"
                  >
                    <h3 className="text-white font-semibold">{c.name}</h3>
                    <p className="text-blue-400 font-bold">{formatPercent(c.score)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">AI Tips</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-300 p-6 bg-gray-900 rounded-lg shadow-md shadow-blue-600/20">
                {data.aiTips}
              </p>
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




















































