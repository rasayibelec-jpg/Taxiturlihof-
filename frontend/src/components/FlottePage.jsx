import React from "react";
import Breadcrumb from "./Breadcrumb";
import FleetGallery from "./FleetGallery";
import SEOHead from "./SEOHead";
import { Card } from "./ui/card";
import { Car, Users, Star } from "lucide-react";

const FlottePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Car className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Unsere Mercedes-Flotte
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Moderne, gepflegte und komfortable Fahrzeuge für alle Ihre Transportbedürfnisse
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FleetGallery />
        </div>
      </section>

      {/* Fleet Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Warum Mercedes-Fahrzeuge?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wir setzen ausschließlich auf Mercedes-Benz für höchste Qualität und Sicherheit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sicherheit</h3>
              <p className="text-gray-600">
                5-Sterne Euro-NCAP-Bewertung und modernste Sicherheitssysteme in allen Fahrzeugen
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Komfort</h3>
              <p className="text-gray-600">
                Ledersitze, Klimaanlage und viel Beinfreiheit für eine angenehme Fahrt
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zuverlässigkeit</h3>
              <p className="text-gray-600">
                Regelmäßige Wartung und bewährte Mercedes-Qualität für maximale Verfügbarkeit
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlottePage;