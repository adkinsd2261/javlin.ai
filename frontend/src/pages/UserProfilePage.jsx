import React, { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

export default function UserProfilePage() {
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await updateProfile(user, { displayName });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        {message && <p className="text-green-400 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <p className="mb-4 text-sm">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="mb-4 text-sm">
          <span className="font-semibold">UID:</span> {user.uid}
        </p>

        <form onSubmit={handleUpdate} className="mb-4">
          <label className="block mb-1 text-sm">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold mt-4 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
