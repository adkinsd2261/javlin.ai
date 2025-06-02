// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../assets/logo-blue.png";
import HeroImage from "../assets/hero-macbook.png";

export default function HomePage() {
  return (
    <section className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111827] min-h-screen flex flex-col items-center text-center overflow-hidden">
      {/* ← NO <header> or <nav> here; Navbar.jsx in App.jsx handles navigation */}

      {/* Hero Text Block */}
      <motion.div
        className="pt-32 px-6 sm:px-12 lg:px-24 z-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo centered above the headline */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Javlin.ai logo" className="h-12 w-auto" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          Unlock your website’s potential.
        </h1>

        {/* Sub‐headline */}
        <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
          Instantly understand your site’s value, traffic, and SEO health with
          AI-driven analytics— all on a single dashboard.
        </p>

        {/* Call‐to‐Action Button */}
        <div className="flex justify-center">
          <Link
            to="/valuation"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg"
          >
            Try Free Valuation
          </Link>
        </div>
      </motion.div>

      {/* MacBook Dashboard Preview */}
      <motion.div
        className="mt-12 w-full flex justify-center px-6 sm:px-12 lg:px-24 z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-full max-w-4xl">
          {/* Subtle overlay gradient for “screen glare” */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 rounded-3xl pointer-events-none" />

          {/* The hero image (MacBook with dashboard) */}
          <img
            src={HeroImage}
            alt="Dashboard preview inside MacBook"
            className="w-full h-auto rounded-3xl border border-gray-800 shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Decorative Bottom Blur */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-150px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl z-0" />
    </section>
  );
}












