import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import HomePage from "./components/HomePage";
import { Toaster } from "./components/ui/toaster";
import TaxiLuzernPage from './components/TaxiLuzernPage';
import TaxiSchwyzPage from './components/TaxiSchwyzPage';
import TaxiZugPage from './components/TaxiZugPage';
import FlughafentransferPage from './components/FlughafentransferPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import PriceCalculatorPage from './components/PriceCalculatorPage';
import BookingPage from './components/BookingPage';
import FlottePage from './components/FlottePage';
import ReviewsPage from './components/ReviewsPage';
import FlughafenZurichTransferPage from './components/FlughafenZurichTransferPage';
import BlogLuzernSehenswuerdigkeiten from './components/BlogLuzernSehenswuerdigkeiten';
import AdminDashboard from './components/AdminDashboard';
import BookingLookup from './components/BookingLookup';
import PWATestInstructions from './components/PWATestInstructions';
import AdminPasswordReset from './components/AdminPasswordReset';
import GeschaeftstaximPage from './components/GeschaeftstaximPage';
import Services from './components/Services';
import TaxiArthGoldauPage from './components/TaxiArthGoldauPage';
import TaxiWeggisPage from './components/TaxiWeggisPage';
import AGBPage from './components/AGBPage';
import ImpressumPage from './components/ImpressumPage';
import DatenschutzPage from './components/DatenschutzPage';

function App() {
  // Register Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered successfully:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            console.log('[PWA] New service worker found');
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }
  }, []);
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/taxi-luzern" element={<TaxiLuzernPage />} />
            <Route path="/taxi-schwyz" element={<TaxiSchwyzPage />} />
            <Route path="/taxi-zug" element={<TaxiZugPage />} />
            <Route path="/taxi-arth-goldau" element={<TaxiArthGoldauPage />} />
            <Route path="/taxi-weggis" element={<TaxiWeggisPage />} />
            <Route path="/flughafentransfer" element={<FlughafentransferPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/preisrechner" element={<PriceCalculatorPage />} />
            <Route path="/buchen" element={<BookingPage />} />
            <Route path="/flotte" element={<FlottePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/flughafen-zurich-transfer" element={<FlughafenZurichTransferPage />} />
            <Route path="/blog/luzern-sehenswuerdigkeiten" element={<BlogLuzernSehenswuerdigkeiten />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-reset" element={<AdminPasswordReset />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dienstleistungen" element={<Services />} />
            <Route path="/geschaeftsfahrten" element={<GeschaeftstaximPage />} />
            <Route path="/booking-lookup" element={<BookingLookup />} />
            <Route path="/pwa-test" element={<PWATestInstructions />} />
            <Route path="/booking/payment-success" element={<PaymentSuccess />} />
            <Route path="/booking/payment-cancelled" element={<BookingPage />} />
            <Route path="/agb" element={<AGBPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;