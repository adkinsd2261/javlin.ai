import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import JavlinScoreCard from "../components/JavlinScoreCard";
import KpiCard from "../components/KpiCard";
import ToolCard from "../components/ToolCard";
import ValuationForm from "../components/ValuationForm";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const mockTrafficData = [
  { month: "Feb", value: 4000 },
  { month: "Mar", value: 6000 },
  { month: "Apr", value: 8000 },
  { month: "May", value: 9000 },
];

const mockRevenueData = [
  { month: "Feb", value: 15000 },
  { month: "Mar", value: 20000 },
  { month: "Apr", value: 28000 },
  { month: "May", value: 32500 },
];

const mockSpeedData = [
  { month: "Feb", value: 65 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 72 },
  { month: "May", value: 76 },
];

const mockMonthlyVisitorsData = [
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 55000 },
  { month: "Apr", value: 58000 },
  { month: "May", value: 56200 },
];

const mockBounceRateData = [
  { month: "Feb", value: 34 },
  { month: "Mar", value: 33 },
  { month: "Apr", value: 31 },
  { month: "May", value: 32 },
];

const mockSessionDurationData = [
  { month: "Feb", value: 210 },
  { month: "Mar", value: 205 },
  { month: "Apr", value: 215 },
  { month: "May", value: 204 },
];

const mockConversionRateData = [
  { month: "Feb", value: 2.3 },
  { month: "Mar", value: 2.4 },
  { month: "Apr", value: 2.6 },
  { month: "May", value: 2.5 },
];

const mockNewUsersData = [
  { month: "Feb", value: 3500 },
  { month: "Mar", value: 3900 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 4100 },
];

const mockReturningUsersData = [
  { month: "Feb", value: 3300 },
  { month: "Mar", value: 3500 },
  { month: "Apr", value: 3700 },
  { month: "May", value: 3700 },
];

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

export default function DashboardPage() {
  const [valuationResult, setValuationResult] = useState(null);

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

        {/* Valuation Form */}
        <section className="max-w-xl mb-8">
          <ValuationForm onResult={setValuationResult} />
        </section>

        {/* Show main KPIs only after valuation */}
        {valuationResult && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-7xl">
              <div className="bg-gray-900 rounded-xl p-6 flex flex-col justify-between">
                <JavlinScoreCard score={valuationResult.javlinScore} />
                <div className="mt-4">
                  <div className="text-gray-400 text-xs font-semibold mb-1">SEO Score</div>
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: `${valuationResult.seoScore}%` }}
                  />
                  <div className="text-gray-400 text-xs font-semibold mt-2 mb-1">Speed Score</div>
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: `${valuationResult.speedScore}%` }}
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>{valuationResult.seoScore}/100</span>
                    <span>{valuationResult.speedScore}/100</span>
                  </div>
                </div>
              </div>

              <KpiCard title="Traffic" value={`${valuationResult.traffic}`} chartData={mockTrafficData} />
              <KpiCard
                title="Revenue"
                value={`$${valuationResult.estimatedValue.toLocaleString()}`}
                chartData={mockRevenueData}
              />
              <KpiCard title="Speed" value={`${valuationResult.speedScore}`} chartData={mockSpeedData} />
            </section>

            {/* Other KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mb-12">
              <KpiCard title="Monthly Visitors" value="56.2K" chartData={mockMonthlyVisitorsData} />
              <KpiCard title="Bounce Rate" value="32%" chartData={mockBounceRateData} />
              <KpiCard title="Avg. Session Duration" value="03:24" chartData={mockSessionDurationData} />
              <KpiCard title="Conversion Rate" value="2.5%" chartData={mockConversionRateData} />
              <KpiCard title="New Users" value="4.1K" chartData={mockNewUsersData} />
              <KpiCard title="Returning Users" value="3.7K" chartData={mockReturningUsersData} />
            </section>
          </>
        )}

        {/* AI Tools Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
            {tools.map((tool) => (
              <ToolCard key={tool.title} title={tool.title} description={tool.description} link={tool.link} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


































