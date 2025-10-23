import React from "react";
import Breadcrumb from "./Breadcrumb";
import Reviews from "./Reviews";
import SEOHead from "./SEOHead";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Kundenbewertungen | Taxi Türlihof Zentralschweiz"
        description="⭐ 5.0 Sterne - Lesen Sie authentische Kundenbewertungen über Taxi Türlihof. Zuverlässiger Service seit 2010 in Luzern, Schwyz und Zug."
        keywords="Taxi Bewertungen Luzern, Taxi Erfahrungen Schwyz, Kundenmeinungen Taxi Zug, Mercedes Taxi Bewertungen, 5 Sterne Taxi, bester Taxi Service Zentralschweiz"
        url="https://www.taxiturlihof.ch/bewertungen"
      />
      <Breadcrumb />
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Kundenbewertungen</h1>
            <p className="text-xl text-gray-300">Was unsere Kunden über uns sagen</p>
          </div>
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;