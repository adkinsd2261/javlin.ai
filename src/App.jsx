import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import ValuationPage from "./pages/ValuationPage";
import DashboardPage from "./pages/DashboardPage";
import SEOAnalyzerPage from "./pages/SEOAnalyzerPage";
import SiteHealthPage from "./pages/SiteHealthPage";
import ContentGeneratorPage from "./pages/ContentGeneratorPage";
import MarketplacePage from "./pages/MarketplacePage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import UserProfilePage from "./pages/UserProfilePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/valuation" element={<PageWrapper><ValuationPage /></PageWrapper>} />
        <Route path="/tools/seo-analyzer" element={<PageWrapper><SEOAnalyzerPage /></PageWrapper>} />
        <Route path="/tools/site-health" element={<PageWrapper><SiteHealthPage /></PageWrapper>} />
        <Route path="/tools/content-generator" element={<PageWrapper><ContentGeneratorPage /></PageWrapper>} />
        <Route path="/marketplace" element={<PageWrapper><MarketplacePage /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><PricingPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />

        {/* Auth Routes */}
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />
        <Route path="/reset-password" element={<PageWrapper><PasswordResetPage /></PageWrapper>} />
        <Route path="/verify-email" element={<PageWrapper><VerifyEmailPage /></PageWrapper>} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <DashboardPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <SettingsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <UserProfilePage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}









