import React from "react";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <HeroSection />

      {/* Future homepage sections can be added here */}

      {/* Example placeholder for a features or benefits section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold mb-6">Why Javlin.ai?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-10">
          Save time, save money, and grow smarter with our AI-powered analytics and website tools—all in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">AI Valuation</h3>
            <p className="text-gray-300">Get instant website valuations and insights powered by advanced AI.</p>
          </div>
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">All-in-One Dashboard</h3>
            <p className="text-gray-300">Track traffic, revenue, SEO, and site speed in one seamless interface.</p>
          </div>
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">Smart AI Tools</h3>
            <p className="text-gray-300">Generate content, optimize SEO, and keep your site healthy effortlessly.</p>
          </div>
        </div>
      </section>
    </main>
  );
}








