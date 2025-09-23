import React from "react";
import Header from "./Header";
import UltraCompactHero from "./UltraCompactHero";
import UltraCompactAbout from "./UltraCompactAbout";
import UltraCompactServices from "./UltraCompactServices";
import UltraCompactActions from "./UltraCompactActions";
import UltraCompactReviews from "./UltraCompactReviews";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <UltraCompactHero />
      <UltraCompactAbout />
      <UltraCompactServices />
      <UltraCompactActions />
      <UltraCompactReviews />
      <Footer />
    </div>
  );
};

export default HomePage;