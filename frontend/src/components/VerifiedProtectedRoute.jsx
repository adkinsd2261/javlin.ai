import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function VerifiedProtectedRoute({ children }) {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}
