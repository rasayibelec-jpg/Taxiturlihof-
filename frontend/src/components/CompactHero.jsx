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
    <section id="home" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/lxvw2ugl_Notes_250207_194337_224.jpg"
                alt="Taxi Türlihof Logo"
                className="h-16 w-auto mr-4"
              />
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-yellow-400">
                  Taxi Türlihof
                </h1>
                <p className="text-gray-300 text-sm">seit 2010</p>
              </div>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              Ihr zuverlässiger Taxi-Service in der Zentralschweiz
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Schnell, sicher und professionell – 24/7 für Sie da
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection("calculator-cta")}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Preis berechnen
              </Button>
              
              <Button 
                onClick={() => scrollToSection("calculator-cta")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                <Car className="w-5 h-5 mr-2" />
                Jetzt buchen
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="bg-green-600 px-4 py-2 rounded-full">
                <a href="tel:076 611 31 31" className="flex items-center text-white font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  076 611 31 31
                </a>
              </div>
              <span className="ml-3 text-gray-300 text-sm">24/7 Service</span>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="lg:w-1/2 lg:pl-8">
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/7exvefg3_IMG-20250908-WA0001.jpg"
                alt="Mercedes Taxi"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">Mercedes-Flotte</p>
                <p className="text-xs opacity-90">Bis 8 Personen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactHero;