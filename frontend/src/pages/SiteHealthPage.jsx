import React from 'react';
import ToolPageTemplate from '../components/ToolPageTemplate';

export default function SiteHealthPage() {
  const mockSiteHealth = async (url) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          performance: 85,
          accessibility: 90,
          bestPractices: 80,
          seo: 88,
        });
      }, 1500)
    );
  };

  return (
    <ToolPageTemplate
      title="Site Health Checker"
      description="Check your site's performance, accessibility, and best practices."
      onSubmit={mockSiteHealth}
    >
      {(result) => (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(result).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-800 p-4 rounded text-center"
            >
              <h3 className="text-sm uppercase mb-2">{key}</h3>
              <p className="text-2xl font-bold text-purple-400">{value}%</p>
            </div>
          ))}
        </div>
      )}
    </ToolPageTemplate>
  );
}
