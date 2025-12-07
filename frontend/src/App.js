import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "./components/ui/toaster";

// Critical components - loaded immediately
import HomePage from "./components/HomePage";

// Lazy-loaded components (Code Splitting)
const TaxiLuzernPage = lazy(() => import('./components/TaxiLuzernPage'));
const TaxiSchwyzPage = lazy(() => import('./components/TaxiSchwyzPage'));
const TaxiZugPage = lazy(() => import('./components/TaxiZugPage'));
const FlughafentransferPage = lazy(() => import('./components/FlughafentransferPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const PriceCalculatorPage = lazy(() => import('./components/PriceCalculatorPage'));
const BookingPage = lazy(() => import('./components/BookingPage'));
const FlottePage = lazy(() => import('./components/FlottePage'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));
const FlughafenZurichTransferPage = lazy(() => import('./components/FlughafenZurichTransferPage'));
const BlogLuzernSehenswuerdigkeiten = lazy(() => import('./components/BlogLuzernSehenswuerdigkeiten'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const BookingLookup = lazy(() => import('./components/BookingLookup'));
import PWATestInstructions from './components/PWATestInstructions';
import AdminPasswordReset from './components/AdminPasswordReset';
import GeschaeftstaximPage from './components/GeschaeftstaximPage';
import Services from './components/Services';
import TaxiArthGoldauPage from './components/TaxiArthGoldauPage';
import TaxiWeggisPage from './components/TaxiWeggisPage';
import TaxiKussnachtPage from './components/TaxiKussnachtPage';
import TaxiVitznauPage from './components/TaxiVitznauPage';
import TaxiRootPage from './components/TaxiRootPage';
import TaxiGersauPage from './components/TaxiGersauPage';
import TaxiIngenbohlPage from './components/TaxiIngenbohlPage';
import TaxiUnteraegeriPage from './components/TaxiUnteraegeriPage';
import TaxiWalchwilPage from './components/TaxiWalchwilPage';
import TaxiMeggenPage from './components/TaxiMeggenPage';
import TaxiEbikonPage from './components/TaxiEbikonPage';
import TaxiKriensPage from './components/TaxiKriensPage';
import TaxiHorwPage from './components/TaxiHorwPage';
import TaxiRothenburgPage from './components/TaxiRothenburgPage';
import TaxiRothenThurmPage from './components/TaxiRothenThurmPage';
import TaxiRotkreuzPage from './components/TaxiRotkreuzPage';
import AGBPage from './components/AGBPage';
import ImpressumPage from './components/ImpressumPage';
import DatenschutzPage from './components/DatenschutzPage';
import TaxiBestellenPage from './components/TaxiBestellenPage';
import BahnhofTaxiPage from './components/BahnhofTaxiPage';
import TaxiInDerNaehePage from './components/TaxiInDerNaehePage';
import KontaktPage from './components/KontaktPage';
import FlughafentransferNewPage from './components/FlughafentransferNewPage';
import PreisePage from './components/PreisePage';
import Taxi24hPage from './components/Taxi24hPage';
import GruppentransferPage from './components/GruppentransferPage';
import BewertungenPage from './components/BewertungenPage';
import UeberUnsPage from './components/UeberUnsPage';

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
            <Route path="/taxi-kussnacht" element={<TaxiKussnachtPage />} />
            <Route path="/taxi-vitznau" element={<TaxiVitznauPage />} />
            <Route path="/taxi-root" element={<TaxiRootPage />} />
            <Route path="/taxi-gersau" element={<TaxiGersauPage />} />
            <Route path="/taxi-ingenbohl" element={<TaxiIngenbohlPage />} />
            <Route path="/taxi-unteraegeri" element={<TaxiUnteraegeriPage />} />
            <Route path="/taxi-walchwil" element={<TaxiWalchwilPage />} />
            <Route path="/taxi-meggen" element={<TaxiMeggenPage />} />
            <Route path="/taxi-ebikon" element={<TaxiEbikonPage />} />
            <Route path="/taxi-kriens" element={<TaxiKriensPage />} />
            <Route path="/taxi-horw" element={<TaxiHorwPage />} />
            <Route path="/taxi-rothenburg" element={<TaxiRothenburgPage />} />
            <Route path="/taxi-rothenthurm" element={<TaxiRothenThurmPage />} />
            <Route path="/taxi-rotkreuz" element={<TaxiRotkreuzPage />} />
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
            <Route path="/agb" element={<AGBPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/taxi-bestellen" element={<TaxiBestellenPage />} />
            <Route path="/bahnhof-taxi" element={<BahnhofTaxiPage />} />
            <Route path="/taxi-in-der-naehe" element={<TaxiInDerNaehePage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/flughafentransfer-neu" element={<FlughafentransferNewPage />} />
            <Route path="/preise" element={<PreisePage />} />
            <Route path="/24h-taxi" element={<Taxi24hPage />} />
            <Route path="/gruppentransfer" element={<GruppentransferPage />} />
            <Route path="/bewertungen" element={<BewertungenPage />} />
            <Route path="/ueber-uns" element={<UeberUnsPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;