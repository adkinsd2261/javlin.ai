// src/components/AnalyticsCard.jsx
export default function AnalyticsCard({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <p className="text-gray-400 mb-1">{title}</p>
      <p className="text-white font-bold text-2xl">{value}</p>
    </div>
  );
}
