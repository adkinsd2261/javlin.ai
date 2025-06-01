import React from 'react';

const mockListings = [
  { name: 'coolsite.com', score: 85, value: '$15,000' },
  { name: 'techblog.io', score: 78, value: '$9,500' },
  { name: 'startuphub.ai', score: 92, value: '$25,000' },
];

export default function MarketplacePage() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 text-center">Marketplace Preview</h1>
      <p className="text-center text-gray-400 mb-12">A sneak peek at premium listings with verified Javlin Scores.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockListings.map((site, idx) => (
          <div key={idx} className="bg-[#1F1F1F] p-6 rounded-xl shadow hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">{site.name}</h2>
            <p className="text-gray-300 mb-1">Javlin Score: <span className="font-bold">{site.score}/100</span></p>
            <p className="text-gray-300">Estimated Value: <span className="font-bold">{site.value}</span></p>
          </div>
        ))}
      </div>
    </section>
  );
}
