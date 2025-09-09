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
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;