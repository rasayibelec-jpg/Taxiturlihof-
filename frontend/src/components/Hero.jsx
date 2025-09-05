import React from "react";
import { Button } from "./ui/button";
import { Phone, MapPin, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Taxi <span className="text-yellow-500">Türlihof</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ihr zuverlässiger Taxi-Service in der Zentralschweiz. 
                Schnell, sicher und professionell - 24/7 für Sie da.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Service</h3>
                  <p className="text-gray-400 text-sm">Rund um die Uhr</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Lokaler Service</h3>
                  <p className="text-gray-400 text-sm">Luzern, Schwyz, Zug</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Schnelle Buchung</h3>
                  <p className="text-gray-400 text-sm">Einfach anrufen</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-yellow-600 hover:bg-yellow-700 text-white transform transition-all duration-200 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Jetzt Buchen: 041 123 45 67
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Mehr Erfahren
              </Button>
            </div>
          </div>

          <div className="lg:flex justify-center items-center hidden">
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/cnf61ude_image_1756460531381.jpeg"
                alt="Taxi Türlihof"
                className="rounded-lg shadow-2xl max-w-full h-auto transform transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;