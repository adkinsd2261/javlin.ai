import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-blue-600 text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-400 text-xl mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition">
        Back to Home
      </Link>
    </section>
  );
}
