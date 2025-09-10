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
      <Hero />
      <PriceCalculator />
      <BookingSystem />
      <Services />
      <FleetGallery />  
      <PaymentMethods />
      <Coverage />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default HomePage;