import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ToolCard from "../components/ToolCard";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/valuation-summary");
        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else {
          setError("Failed to load dashboard data.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error while loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const tools = [
    {
      title: "SEO Analyzer",
      description: "Analyze your website SEO performance and get improvement tips.",
      link: "/tools/seo-analyzer",
    },
    {
      title: "Site Health",
      description: "Check your website's health and fix issues.",
      link: "/tools/site-health",
    },
    {
      title: "Content Generator",
      description: "Generate high-quality content tailored for your site.",
      link: "/tools/content-generator",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-grow p-8 max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold mb-2">Dashboard</h1>
          <p className="text-gray-400 max-w-xl">
            View your key website metrics and get instant AI-driven valuation insights.
          </p>
        </header>

        {loading ? (
          <div className="text-center mt-10 text-gray-400">Loading dashboard...</div>
        ) : error ? (
          <div className="text-center mt-10 text-red-500">{error}</div>
        ) : (
          <>
            {/* Main KPI Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-7xl">
              <div className="bg-gray-900 rounded-xl p-6 flex flex-col justify-between">
                <JavlinScoreCard score={data.javlinScore} />
                <div className="mt-4">
                  <div className="text-gray-400 text-xs font-semibold mb-1">SEO Score</div>
                  <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${data.seoScore}%` }} />
                  <div className="text-gray-400 text-xs font-semibold mt-2 mb-1">Speed Score</div>
                  <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${data.speedScore}%` }} />
                  <div className="flex justify-between text-sm mt-2">
                    <span>{data.seoScore}/100</span>
                    <span>{data.speedScore}/100</span>
                  </div>
                </div>
              </div>

              <KpiCard title="Traffic" value={`${data.traffic} visits`} chartData={data.trafficChart} />
              <KpiCard title="Revenue" value={`$${data.revenue.toLocaleString()}`} chartData={data.revenueChart} />
              <KpiCard title="Conversion Rate" value={`${data.conversionRate}%`} chartData={data.conversionChart} />
            </section>

            {/* Additional KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mb-12">
              <KpiCard title="Monthly Visitors" value={`${data.monthlyVisitors}K`} chartData={data.visitorsChart} />
              <KpiCard title="Bounce Rate" value={`${data.bounceRate}%`} chartData={data.bounceChart} />
              <KpiCard title="Avg. Session Duration" value={`${data.avgSessionDuration} min`} chartData={data.sessionChart} />
              <KpiCard title="New Users" value={`${data.newUsers}`} chartData={data.newUsersChart} />
              <KpiCard title="Returning Users" value={`${data.returningUsers}`} chartData={data.returningUsersChart} />
            </section>

            {/* AI Tools Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">AI Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
                {tools.map((tool) => (
                  <ToolCard key={tool.title} title={tool.title} description={tool.description} link={tool.link} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}






































