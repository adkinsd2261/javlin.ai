import React from 'react';
import ValuationForm from '../components/ValuationForm';

export default function ValuationPage() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-blue-600 text-4xl font-bold mb-8">Website Valuation</h1>
      <p className="text-gray-400 mb-8">Get an instant valuation for your website based on traffic, SEO, and market trends.</p>
      <ValuationForm />
    </section>
  );
}
