import React from 'react';

export default function SettingsPage() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 text-center">Account Settings</h1>
      <div className="bg-[#1F1F1F] p-6 rounded-xl shadow space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">Profile Info</h2>
          <p className="text-gray-400 mb-2">Username: <span className="text-white">johndoe</span></p>
          <p className="text-gray-400">Email: <span className="text-white">johndoe@example.com</span></p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">Subscription</h2>
          <p className="text-gray-400 mb-2">Plan: <span className="text-white">Pro</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            Manage Subscription
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">Notifications</h2>
          <p className="text-gray-400 mb-2">Receive email updates: <span className="text-white">Yes</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            Change Preferences
          </button>
        </div>
      </div>
    </section>
  );
}
