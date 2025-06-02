import React, { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResend = async () => {
    setMessage("");
    setError("");

    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      setError("Failed to send verification email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-4">
          Please check your email and click the verification link before continuing.
        </p>
        {message && <p className="text-green-400 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleResend}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white font-semibold transition"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
}
