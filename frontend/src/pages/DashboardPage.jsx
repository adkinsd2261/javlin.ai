import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ToolCard from "../components/ToolCard";
import PageSpeedCard from "../components/PageSpeedCard";
import TrafficPicCard from "../components/TrafficPicCard";
import RevenueCard from "../components/RevenueCard";

// Helper formatting functions
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

// Loading Skeleton Components
function KpiSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-6 animate-pulse h-40" />
  );
}

function TipsSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 animate-pulse h-32 mt-6" />
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [showFullTips, setShowFullTips] = useState(false);

  const handleFetchData = async () => {
    if (!inputUrl) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setShowFullTips(false);

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

  // Utility to format AI tips as bullet points if possible
  function renderTips(tips) {
    if (!tips) return null;
    const tipsArray = tips.split(/\r?\n|\r|•|-/).filter(Boolean);
    if (tipsArray.length > 1) {
      // Show either truncated or full tips
      const toShow = showFullTips ? tipsArray : tipsArray.slice(0, 3);
      return (
        <>
          <ul className="list-disc pl-6 space-y-2">
            {toShow.map((tip, i) => (
              <li key={i} className="text-gray-300 leading-relaxed">
                {tip.trim()}
              </li>
            ))}
          </ul>
          {tipsArray.length > 3 && (
            <button
              onClick={() => setShowFullTips(!showFullTips)}
              className="mt-3 text-blue-400 hover:underline font-semibold"
            >
              {showFullTips ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      );
    }
    // If single paragraph, just render plain
    return <p className="leading-relaxed text-gray-300 whitespace-pre-wrap">{tips}</p>;
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

        {/* Input and Button */}
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
        {loading && (
          <>
            <p className="text-blue-400 font-semibold mb-6">Loading insights...</p>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
            </section>
            <TipsSkeleton />
          </>
        )}

        {error && <p className="text-red-500 font-semibold mb-6">{error}</p>}

        {/* Results */}
        {data && (
          <>
            {/* KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <JavlinScoreCard score={formatNumber(data.javlinScore || 0)} />
              <KpiCard
                title="Speed Score"
                value={formatPercent(data.speedScore || 0)}
                chartData={data.speedChart}
              />
              <TrafficPicCard
                title="Monthly Traffic"
                value={formatNumber(data.monthlyTraffic || 0)}
                chartData={data.trafficChart}
              />
              <RevenueCard
                title="Monthly Revenue"
                value={formatDollars(data.monthlyRevenue || 0)}
                chartData={data.revenueChart}
              />
            </section>

            {/* AI Tips Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">AI Tips</h2>
              <div className="bg-gray-900 rounded-lg shadow-md shadow-blue-600/20 p-6 text-gray-300">
                {renderTips(data.aiTips)}
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























































