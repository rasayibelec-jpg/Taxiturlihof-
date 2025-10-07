import React from "react";
import Header from "./Header";
import CompactHero from "./CompactHero";
import CompactServices from "./CompactServices";
import ServicegebieteSection from "./ServicegebieteSection";
import FleetGallery from "./FleetGallery";
import Reviews from "./Reviews";
import CompactCalculatorCTA from "./CompactCalculatorCTA";
import StreamlinedContact from "./StreamlinedContact";
import Footer from "./Footer";
import FloatingActionButtons from "./FloatingActionButtons";
import PWAInstaller from "./PWAInstaller";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CompactHero />
      <CompactServices />
      <ServicegebieteSection />
      <FleetGallery />
      <Reviews />
      <CompactCalculatorCTA />
      <StreamlinedContact />
      <Footer />
      <FloatingActionButtons />
      <PWAInstaller />
    </div>
  );
};

export default HomePage;