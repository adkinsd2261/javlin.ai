import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardCard({ title, value, description }) {
  return (
    <motion.div
      className="bg-[#1F1F1F] rounded-2xl p-6 shadow-md w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-lg font-semibold mb-2 text-blue-500">{title}</h3>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
}