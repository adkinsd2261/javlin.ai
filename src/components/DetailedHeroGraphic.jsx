import React from "react";

export default function DetailedHeroGraphic() {
  return (
    <svg
      viewBox="0 0 700 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-5xl mx-auto mt-16"
      aria-label="Javlin.ai detailed hero graphic showing analytics dashboard"
      role="img"
    >
      {/* Background gradient */}
      <defs>
        <radialGradient
          id="grad1"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
          spreadMethod="pad"
        >
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="barGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Large glowing circle behind */}
      <circle
        cx="350"
        cy="200"
        r="180"
        fill="url(#grad1)"
        filter="url(#glow)"
      />

      {/* Dashboard base rectangle */}
      <rect
        x="180"
        y="90"
        width="340"
        height="220"
        rx="20"
        fill="#111827"
        stroke="#2563EB"
        strokeWidth="3"
        filter="url(#glow)"
      />

      {/* Header bar */}
      <rect x="200" y="110" width="300" height="25" rx="10" fill="#2563EB" opacity="0.7" />

      {/* Circle profile icon */}
      <circle cx="230" cy="122" r="10" fill="#1E40AF" />

      {/* Graph bars */}
      <rect x="250" y="150" width="25" height="100" rx="5" fill="url(#barGradient)" filter="url(#glow)" />
      <rect x="285" y="130" width="25" height="120" rx="5" fill="url(#barGradient)" filter="url(#glow)" />
      <rect x="320" y="160" width="25" height="90" rx="5" fill="url(#barGradient)" filter="url(#glow)" />
      <rect x="355" y="140" width="25" height="110" rx="5" fill="url(#barGradient)" filter="url(#glow)" />

      {/* Data points / nodes */}
      <circle cx="400" cy="250" r="12" fill="#2563EB" filter="url(#glow)" />
      <circle cx="440" cy="220" r="8" fill="#3B82F6" />
      <circle cx="475" cy="200" r="6" fill="#60A5FA" />

      {/* Connecting lines */}
      <line x1="400" y1="250" x2="440" y2="220" stroke="#2563EB" strokeWidth="2" strokeOpacity="0.7" />
      <line x1="440" y1="220" x2="475" y2="200" stroke="#2563EB" strokeWidth="2" strokeOpacity="0.7" />

      {/* Text labels */}
      <text x="200" y="70" fill="#2563EB" fontSize="18" fontWeight="600" fontFamily="Inter, sans-serif">
        Javlin.ai Analytics Dashboard
      </text>

      <text x="250" y="270" fill="#60A5FA" fontSize="14" fontWeight="500" fontFamily="Inter, sans-serif">
        AI-powered insights & valuations
      </text>
    </svg>
  );
}
