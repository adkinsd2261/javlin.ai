import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111827] min-h-screen flex flex-col items-center px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mt-32"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
          Unlock Your Website’s Potential with <span className="text-blue-600">Javlin.ai</span>
        </h1>
        <p className="text-gray-300 text-lg mb-10">
          AI-powered insights, analytics, and tools—all in one dashboard. Save time, save money, grow smarter.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Enter your website URL"
            className="px-5 py-3 rounded-lg w-full sm:w-80 text-black focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Get Free Valuation
          </button>
        </div>
      </motion.div>

      {/* Optional: Add a subtle animated background or dashboard preview here */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 right-10 w-96 h-96 bg-blue-600 rounded-3xl filter blur-3xl"
      />
    </section>
  );
}
