import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Toaster } from "./components/ui/toaster";
import TaxiLuzernPage from './components/TaxiLuzernPage';
import TaxiSchwyzPage from './components/TaxiSchwyzPage';
import TaxiZugPage from './components/TaxiZugPage';
import FlughafentransferPage from './components/FlughafentransferPage';
import BlogPage from './components/BlogPage';
import PriceCalculatorPage from './components/PriceCalculatorPage';
import BookingPage from './components/BookingPage';
import FlottePage from './components/FlottePage';
import PaymentSuccess from './components/PaymentSuccess';
import FlughafenZurichTransferPage from './components/FlughafenZurichTransferPage';
import BlogLuzernSehenswuerdigkeiten from './components/BlogLuzernSehenswuerdigkeiten';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/taxi-luzern" element={<TaxiLuzernPage />} />
          <Route path="/taxi-schwyz" element={<TaxiSchwyzPage />} />
          <Route path="/taxi-zug" element={<TaxiZugPage />} />
          <Route path="/flughafentransfer" element={<FlughafentransferPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/preisrechner" element={<PriceCalculatorPage />} />
          <Route path="/buchen" element={<BookingPage />} />
          <Route path="/flotte" element={<FlottePage />} />
          <Route path="/flughafen-zurich-transfer" element={<FlughafenZurichTransferPage />} />
          <Route path="/booking/payment-success" element={<PaymentSuccess />} />
          <Route path="/booking/payment-cancelled" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;