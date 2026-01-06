// src/App.jsx (Updated)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomToaster from './components/ui/CustomToaster';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import Converter from './pages/Converter';
import Features from './pages/Features';
import Footer from './components/ui/Footer';
import "./App.css";
import ScrollToTop from './components/ui/ScrollToTop';
import PrivacyPolicy from './pages/Privacy';
import OtherTools from './pages/OtherTools';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/features" element={<Features />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/tools" element={<OtherTools />} />
        </Routes>
        <Footer />
        <CustomToaster />
      </div>
    </>
  );
}

export default App;
