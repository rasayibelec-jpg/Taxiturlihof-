import React from "react";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";

const CompactFleetTest = () => {
  const fleetTypes = [
    {
      icon: "🚗",
      title: "Standard Taxi",
      description: "Mercedes C/E-Klasse",
      passengers: "1-4 Personen",
      image: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/p68khw91_20240707_163617.jpg"
    },
    {
      icon: "⭐",
      title: "Premium Taxi", 
      description: "Mercedes S-Klasse",
      passengers: "1-4 Personen",
      image: "https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/ssbuesk0_20250620_123609%281%29%281%29.heic"
    },
    {
      icon: "🚐",
      title: "Van/Großraum",
      description: "Mercedes V-Klasse", 
      passengers: "bis 8 Personen",
      image: "https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/7exvefg3_IMG-20250908-WA0001.jpg"
    },
    {
      icon: "🌙",
      title: "Nacht-Service",
      description: "24/7 verfügbar",
      passengers: "Alle Fahrzeuge",
      image: "https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/xkyxwgjm_IMG-20250908-WA0000.jpg"
    }
  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Unsere Flotte
          </h2>
        </div>

        {/* Flotte als kleine Blöcke */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {fleetTypes.map((fleet, index) => (
            <Card key={index} className="p-3 hover:shadow-lg transition-shadow duration-300 text-center">
              <div 
                className="w-full h-16 bg-cover bg-center rounded mb-2 flex items-end justify-center"
                style={{ backgroundImage: `url(${fleet.image})` }}
              >
                <div className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-bold">
                  {fleet.icon}
                </div>
              </div>
              
              <h3 className="text-xs font-bold text-gray-900 mb-1">
                {fleet.title}
              </h3>
              
              <p className="text-xs text-gray-600 mb-1">
                {fleet.description}
              </p>
              
              <p className="text-xs text-blue-600 font-medium">
                {fleet.passengers}
              </p>
            </Card>
          ))}
        </div>

        {/* Link zur vollständigen Galerie */}
        <div className="text-center">
          <Link 
            to="/flotte"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            <Car className="w-4 h-4 mr-1" />
            Alle Fahrzeuge ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompactFleetTest;