import React from "react";
import Header from "./Header";
import CompactHero from "./CompactHero";
import CompactServices from "./CompactServices";
import QuickActions from "./QuickActions";
import CompactAbout from "./CompactAbout";
import CompactReviews from "./CompactReviews";
import StreamlinedContact from "./StreamlinedContact";
import Footer from "./Footer";
import FloatingActionButtons from "./FloatingActionButtons";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CompactHero />
      <CompactServices />
      <QuickActions />
      <CompactAbout />
      <CompactReviews />
      <StreamlinedContact />
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default HomePage;