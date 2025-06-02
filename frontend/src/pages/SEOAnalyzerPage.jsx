import React, { useState } from "react";

export default function SEOAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.lighthouseResult);
      } else {
        setError("Failed to analyze site.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">SEO Analyzer</h1>
      <input
        type="text"
        className="w-full p-4 rounded bg-gray-800 text-white mb-4"
        placeholder="Enter site URL (https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
      >
        {loading ? "Analyzing..." : "Run SEO Analysis"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="bg-gray-900 p-4 mt-6 rounded">
          <h2 className="text-xl font-bold mb-2">Results:</h2>
          <p><strong>Performance:</strong> {result.categories.performance.score * 100}/100</p>
          <p><strong>Accessibility:</strong> {result.categories.accessibility.score * 100}/100</p>
          <p><strong>Best Practices:</strong> {result.categories["best-practices"].score * 100}/100</p>
          <p><strong>SEO:</strong> {result.categories.seo.score * 100}/100</p>
        </div>
      )}
    </div>
  );
}


