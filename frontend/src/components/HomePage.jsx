import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import PriceCalculator from "./PriceCalculator";
import Services from "./Services";
import FleetGallery from "./FleetGallery";
import PaymentMethods from "./PaymentMethods";
import Coverage from "./Coverage";
import BookingSystem from "./BookingSystem";
import Reviews from "./Reviews";
import FAQ from "./FAQ";
import Contact from "./Contact";
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
      <Contact />
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default HomePage;