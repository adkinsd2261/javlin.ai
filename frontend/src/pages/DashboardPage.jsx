import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ToolCard from "../components/ToolCard";

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
    { title: "SEO Analyzer", description: "Analyze SEO performance.", link: "/tools/seo-analyzer" },
    { title: "Site Health", description: "Check your site's health.", link: "/tools/site-health" },
    { title: "Content Generator", description: "Generate tailored content.", link: "/tools/content-generator" }
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-grow p-8 max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold mb-2">Dashboard</h1>
          <p className="text-gray-400 max-w-xl">
            Enter a website below to get live AI and PageSpeed insights.
          </p>
        </header>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow bg-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-2 text-white font-semibold"
          >
            {loading ? "Loading..." : "Get Insights"}
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {data && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {/* Example usage of scores */}
              <JavlinScoreCard score={data.javlinScore || 0} />
              <KpiCard title="Speed Score" value={`${data.speedScore}%`} />
            </section>

            {/* AI Tips */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-2">AI Tips</h2>
              <p className="bg-gray-800 p-4 rounded-lg text-gray-300 whitespace-pre-line">{data.aiTips}</p>
            </section>

            {/* Tools Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">AI Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map(tool => (
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








































