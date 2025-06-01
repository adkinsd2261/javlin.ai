// src/pages/PricingPage.jsx
import React, { useState } from "react";

const plans = [
  {
    name: "Basic",
    priceMonthly: 10,
    features: [
      "Instant website valuation",
      "Limited AI tools access",
      "Email support",
    ],
  },
  {
    name: "Pro",
    priceMonthly: 25,
    features: [
      "All Basic features",
      "Full AI tools access",
      "Priority email & chat support",
      "Monthly performance reports",
    ],
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    features: [
      "All Pro features",
      "Custom integrations & API access",
      "Dedicated account manager",
      "24/7 phone support",
    ],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // or "yearly"

  // Calculate yearly price with 20% discount if yearly selected
  const getPrice = (price) => {
    if (price === "Custom") return price;
    return billingCycle === "yearly" ? Math.round(price * 12 * 0.8) : price;
  };

  return (
    <section className="bg-black min-h-screen py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Save time, save money, grow smarter — all from Javlin.ai.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-8 inline-flex rounded-full bg-gray-800 p-1 text-sm font-semibold">
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              billingCycle === "monthly" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly Billing
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              billingCycle === "yearly" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly Billing (20% off)
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map(({ name, priceMonthly, features }) => (
          <div
            key={name}
            className="bg-gray-900 rounded-2xl p-8 shadow-lg flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-4">{name}</h2>
            <p className="text-4xl font-extrabold mb-2 text-blue-500">
              {priceMonthly === "Custom"
                ? "Contact Us"
                : `$${getPrice(priceMonthly)}${billingCycle === "monthly" ? "/mo" : "/yr"}`}
            </p>
            <ul className="mb-8 flex-grow text-gray-300 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className="mt-auto bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
              onClick={() => alert(`Selected ${name} plan`)}
            >
              Choose {name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}