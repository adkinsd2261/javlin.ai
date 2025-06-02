import React from 'react';
import ToolPageTemplate from '../components/ToolPageTemplate';

export default function SEOAnalyzerPage() {
  const mockSEOAnalysis = async (url) => {
    // Simulate an API call delay
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          titleTag: 'Awesome Site Title',
          metaDescription: 'This is a meta description preview.',
          headings: ['H1: Welcome', 'H2: About Us', 'H2: Services'],
          brokenLinks: ['https://brokenlink1.com', 'https://brokenlink2.com'],
        });
      }, 1500)
    );
  };

  return (
    <ToolPageTemplate
      title="SEO Analyzer"
      description="Analyze your site's SEO structure, meta tags, and identify improvements."
      onSubmit={mockSEOAnalysis}
    >
      {(result) => (
        <div>
          <h2 className="text-lg font-semibold mb-2">Title Tag</h2>
          <p className="mb-4">{result.titleTag}</p>

          <h2 className="text-lg font-semibold mb-2">Meta Description</h2>
          <p className="mb-4">{result.metaDescription}</p>

          <h2 className="text-lg font-semibold mb-2">Headings</h2>
          <ul className="list-disc list-inside mb-4">
            {result.headings.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mb-2">Broken Links</h2>
          <ul className="list-disc list-inside text-red-400">
            {result.brokenLinks.map((link, i) => (
              <li key={i}>{link}</li>
            ))}
          </ul>
        </div>
      )}
    </ToolPageTemplate>
  );
}

