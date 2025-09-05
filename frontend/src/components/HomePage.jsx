import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import FleetGallery from "./FleetGallery";
import PaymentMethods from "./PaymentMethods";
import Coverage from "./Coverage";
import Contact from "./Contact";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Services />
      <FleetGallery />
      <PaymentMethods />
      <Coverage />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;