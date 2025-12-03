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
import SEOHead from "./SEOHead";
import { getHomePageSchema } from "../utils/structuredData";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0b1120]">
      <SEOHead 
        title="Taxi Türlihof | Zuverlässiger Taxi-Service in Luzern, Schwyz, Zug"
        description="Taxi Türlihof Oberarth - Ihr zuverlässiger Taxi-Service in der Zentralschweiz. Mercedes-Flotte, Flughafentransfer Zürich/Basel, Stadtfahrten. Online buchen ☎️ 076 611 31 31"
        keywords="Taxi Oberarth, Taxi Luzern, Taxi Schwyz, Taxi Zug, Flughafentransfer Zürich, Mercedes Taxi, Taxi Arth-Goldau, Taxi Weggis, Geschäftstaxi, Taxi online buchen"
        url="https://www.taxiturlihof.ch/"
        structuredData={getHomePageSchema()}
      />
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