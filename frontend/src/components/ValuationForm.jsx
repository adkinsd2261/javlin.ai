import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ValuationForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateUrl = (input) => {
    const regex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d-]+(\/.*)?$/i;
    return regex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter your website URL");
      return;
    }

    if (!validateUrl(url.trim())) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);

    // Simulate API call (replace with real integration)
    setTimeout(() => {
      const mockResult = {
        url: url.trim(),
        javlinScore: 87,
        estimatedValue: 32000,      // number (not string)
        seoScore: 82,
        speedScore: 78,
        traffic: 12500,             // number (not "12.5K")
      };
      onResult(mockResult);
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
      aria-label="Website valuation form"
    >
      <input
        type="text"
        placeholder="Enter your website URL (e.g. example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={`flex-grow bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error ? "ring-2 ring-red-500" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby="url-error"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg px-6 py-3 text-white font-semibold transition flex items-center justify-center"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : null}
        Get Valuation
      </button>
      {error && (
        <motion.p
          id="url-error"
          className="text-red-500 mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.form>
  );
}








