import React from "react";
import { Button } from "./ui/button";
import { Phone, Calculator, Car } from "lucide-react";

const CompactHero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24"
      style={{
        background: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url("https://customer-assets.emergentagent.com/job_taxi-booking-hub-2/artifacts/7qpvp7gy_20240707_163617.jpg") center top / 100% 50% no-repeat,
          url("https://images.unsplash.com/photo-1657201512832-eb4986526c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center bottom / 100% 50% no-repeat
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-center mb-6 -mt-8">
            {/* Logo geçici olarak gizlendi */}
            <div className="text-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-yellow-400">
                Taxi Türlihof
              </h1>
              <p className="text-gray-300 text-xl">seit 2010</p>
            </div>
          </div>
          
          {/* Main Message */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Ihr zuverlässiger Taxi-Service in der Zentralschweiz
            </h2>
            
            <p className="text-2xl text-gray-300 mb-12">
              Schnell, sicher und professionell – 24/7 für Sie da
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={() => scrollToSection("calculator-cta")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-lg"
              size="lg"
            >
              <Calculator className="w-6 h-6 mr-3" />
              Preis berechnen
            </Button>
            
            <Button 
              onClick={() => scrollToSection("calculator-cta")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-xl font-semibold rounded-xl"
              size="lg"
            >
              <Car className="w-6 h-6 mr-3" />
              Jetzt buchen
            </Button>
          </div>

          {/* Quick Contact - Prominent - Geçici olarak kaldırıldı */}
          {/*
          <div className="inline-flex items-center bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full shadow-xl transition-colors duration-200">
            <a href="tel:076 611 31 31" className="flex items-center text-white">
              <Phone className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-sm opacity-90">24/7 Service:</div>
                <div className="text-2xl font-bold">076 611 31 31</div>
              </div>
            </a>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default CompactHero;