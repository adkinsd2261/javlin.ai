import React from "react";
import { Link } from "react-router-dom";

export default function ToolCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="block bg-[#1F1F1F] rounded-3xl p-6 shadow-lg hover:shadow-blue-600/60 transition-shadow duration-300 cursor-pointer transform hover:scale-[1.05]"
    >
      {/* Icon */}
      {icon && <div className="text-blue-500 mb-5 text-4xl">{icon}</div>}

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">{description}</p>

      {/* Explore Link */}
      <div className="mt-8 text-blue-400 font-semibold hover:underline text-lg">
        Explore &rarr;
      </div>
    </Link>
  );
}


