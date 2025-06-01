// src/components/ValuationForm.jsx
import React, { useState } from "react";

export default function ValuationForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (input) => {
    // Basic URL pattern without requiring https
    const urlPattern = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    return urlPattern.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Enter your website URL");
      return;
    }

    if (!validateUrl(url.trim())) {
      setError("Please enter a valid URL (e.g. example.com)");
      return;
    }

    setError("");
    // Mock result for now; integrate API later
    onResult({
      url,
      javlinScore: 87,
      estimatedValue: 12345,
      seoScore: 80,
      speedScore: 75,
      traffic: "12.5K",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your website URL"
        className="w-full p-3 rounded-lg bg-[#1F1F1F] border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition"
      />
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Get Valuation
      </button>
    </form>
  );
}








