import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import PriceCalculator from "./PriceCalculator";
import Services from "./Services";
import Pricing from "./Pricing";
import FleetGallery from "./FleetGallery";
import PaymentMethods from "./PaymentMethods";
import Coverage from "./Coverage";
import Contact from "./Contact";
import Footer from "./Footer";
import FloatingActionButtons from "./FloatingActionButtons";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <PriceCalculator />
      <Services />
      <Pricing />
      <FleetGallery />  
      <PaymentMethods />
      <Coverage />
      <Contact />
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default HomePage;