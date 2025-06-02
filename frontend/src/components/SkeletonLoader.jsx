import React from 'react';

export default function SkeletonLoader({ height = 'h-6', width = 'w-full' }) {
  return (
    <div className={`bg-gray-700 rounded ${height} ${width} animate-pulse`}></div>
  );
}
