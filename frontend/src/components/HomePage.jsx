import React, { useState } from "react";
import Header from "./Header";
import CompactHero from "./CompactHero";
import CompactServices from "./CompactServices";
import CompactCalculatorCTA from "./CompactCalculatorCTA";
import CompactDetails from "./CompactDetails";
import CompactContact from "./CompactContact";
import Footer from "./Footer";
import FloatingActionButtons from "./FloatingActionButtons";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CompactHero />
      <CompactServices />
      <CompactCalculatorCTA />
      <CompactDetails />
      <CompactContact />
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default HomePage;