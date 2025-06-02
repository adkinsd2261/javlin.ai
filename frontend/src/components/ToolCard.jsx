import React from "react";
import { Link } from "react-router-dom";

export default function ToolCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="block bg-[#1F1F1F] rounded-2xl p-6 shadow-lg hover:shadow-blue-600/50 transition-shadow duration-300 cursor-pointer transform hover:scale-[1.03]"
    >
      {/* Icon */}
      {icon && <div className="text-blue-500 mb-4 text-3xl">{icon}</div>}

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-300">{description}</p>

      {/* Explore Link */}
      <div className="mt-6 text-blue-400 font-semibold hover:underline">
        Explore &rarr;
      </div>
    </Link>
  );
}
