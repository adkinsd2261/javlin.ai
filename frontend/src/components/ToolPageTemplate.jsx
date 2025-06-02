import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ToolPageTemplate({ title, description, onSubmit, children }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a valid URL or input.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await onSubmit(input);
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.h1 className="text-4xl font-semibold mb-2 text-purple-700">
        {title}
      </motion.h1>
      <p className="text-gray-400 mb-8">{description}</p>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your site URL"
          className="w-full p-3 rounded bg-gray-800 text-white mb-2"
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded transition"
        >
          Run Tool
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {loading && <p className="text-purple-500">Running analysis...</p>}

      {result && (
        <motion.div
          className="bg-gray-900 p-6 rounded shadow mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {children(result)}
        </motion.div>
      )}
    </div>
  );
}

