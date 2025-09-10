import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calculator, Calendar, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CompactCalculatorCTA = () => {
  return (
    <section id="calculator-cta" className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Berechnen Sie Ihren Fahrpreis und buchen Sie online
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparente Preise, einfache Buchung – alles in wenigen Klicks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Preisrechner CTA */}
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-white border-2 border-yellow-200">
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-yellow-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Preis berechnen
              </h3>
              
              <p className="text-gray-600 mb-6">
                Geben Sie Start und Ziel ein und erhalten Sie sofort eine präzise Kostenübersicht für Ihre Fahrt.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Beispiel:</span>
                  <span className="font-semibold text-gray-900">Luzern → Zürich Flughafen</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mt-2">
                  Preis auf Anfrage
                </div>
              </div>

              <Link to="/preisrechner">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 text-lg font-semibold">
                  <Calculator className="w-5 h-5 mr-2" />
                  Zum Preisrechner
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Online Buchung CTA */}
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-white border-2 border-blue-200">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Online buchen
              </h3>
              
              <p className="text-gray-600 mb-6">
                Buchen Sie Ihre Fahrt bequem online. Wählen Sie Datum, Uhrzeit und alle Details für Ihren Transport.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Sofort verfügbar</div>
                    <div className="font-semibold text-gray-900">24/7 Service</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Bestätigung</div>
                    <div className="font-semibold text-gray-900">Per E-Mail</div>
                  </div>
                </div>
              </div>

              <Link to="/buchen">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Jetzt buchen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Quick Call Option */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full shadow-lg transition-colors duration-200">
            <Phone className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="text-sm opacity-90">Oder rufen Sie uns an:</div>
              <a href="tel:076 611 31 31" className="text-xl font-bold">076 611 31 31</a>
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-sm">24 Stunden am Tag, 7 Tage die Woche</p>
        </div>
      </div>
    </section>
  );
};

export default CompactCalculatorCTA;