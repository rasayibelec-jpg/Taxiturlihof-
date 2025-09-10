import React, { useState } from "react";
import Header from "./Header";
import CompactHero from "./CompactHero";
import CompactServices from "./CompactServices";
import FleetGallery from "./FleetGallery";
import CompactCalculatorCTA from "./CompactCalculatorCTA";
import StreamlinedContact from "./StreamlinedContact";
import Footer from "./Footer";
import FloatingActionButtons from "./FloatingActionButtons";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CompactHero />
      <CompactServices />
      <CompactCalculatorCTA />
      <StreamlinedContact />
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default HomePage;