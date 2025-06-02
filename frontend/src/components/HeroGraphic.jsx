import React from "react";
import { motion } from "framer-motion";

export default function HeroGraphic() {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto mt-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      aria-label="Hero graphic representing AI tools and analytics"
    >
      {/* Background tech shapes */}
      <svg
        viewBox="0 0 600 400"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glowing polygon */}
        <motion.polygon
          points="100,10 500,10 590,200 300,390 10,200"
          fill="#2563EB"
          opacity={0.15}
          animate={{
            rotate: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
        {/* Data nodes */}
        <circle cx="150" cy="100" r="8" fill="#2563EB" />
        <circle cx="450" cy="100" r="8" fill="#2563EB" />
        <circle cx="300" cy="320" r="8" fill="#2563EB" />

        {/* Connecting lines */}
        <line
          x1="150"
          y1="100"
          x2="450"
          y2="100"
          stroke="#2563EB"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <line
          x1="150"
          y1="100"
          x2="300"
          y2="320"
          stroke="#2563EB"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <line
          x1="450"
          y1="100"
          x2="300"
          y2="320"
          stroke="#2563EB"
          strokeWidth="2"
          strokeOpacity="0.3"
        />

        {/* Stylized browser window */}
        <rect
          x="200"
          y="130"
          width="200"
          height="140"
          rx="12"
          ry="12"
          fill="#111827"
          stroke="#2563EB"
          strokeWidth="3"
        />
        <rect
          x="210"
          y="150"
          width="180"
          height="20"
          fill="#2563EB"
          opacity="0.7"
          rx="4"
          ry="4"
        />
        {/* Graph bars */}
        <rect
          x="230"
          y="190"
          width="20"
          height="50"
          fill="#2563EB"
          rx="3"
          ry="3"
          className="animate-pulse"
        />
        <rect
          x="265"
          y="170"
          width="20"
          height="70"
          fill="#2563EB"
          rx="3"
          ry="3"
          className="animate-pulse delay-150"
        />
        <rect
          x="300"
          y="150"
          width="20"
          height="90"
          fill="#2563EB"
          rx="3"
          ry="3"
          className="animate-pulse delay-300"
        />
      </svg>
    </motion.div>
  );
}