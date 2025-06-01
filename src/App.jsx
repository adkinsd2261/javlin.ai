import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import SEOAnalyzerPage from './pages/SEOAnalyzerPage';
import SiteHealthPage from './pages/SiteHealthPage';
import ContentGeneratorPage from './pages/ContentGeneratorPage';
import MarketplacePage from './pages/MarketplacePage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';
import ValuationPage from './pages/ValuationPage';
import NotFoundPage from './pages/NotFoundPage';

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
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        {/* Removed the /tools route here */}
        <Route path="/tools/seo-analyzer" element={<PageWrapper><SEOAnalyzerPage /></PageWrapper>} />
        <Route path="/tools/site-health" element={<PageWrapper><SiteHealthPage /></PageWrapper>} />
        <Route path="/tools/content-generator" element={<PageWrapper><ContentGeneratorPage /></PageWrapper>} />
        <Route path="/marketplace" element={<PageWrapper><MarketplacePage /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><PricingPage /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
        <Route path="/valuation" element={<PageWrapper><ValuationPage /></PageWrapper>} />
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




