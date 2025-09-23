import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calculator, Calendar, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CompactCalculatorCTA = () => {
  return (
    <section id="calculator-cta" className="py-8 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Preis berechnen & Online buchen
          </h2>
          <p className="text-gray-600">
            Transparente Preise, einfache Buchung
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Preisrechner Block */}
          <Card className="p-4 hover:shadow-lg transition-shadow duration-300 bg-white border border-yellow-200">
            <div className="text-center">
              <div className="bg-yellow-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-yellow-600" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Preis berechnen
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                Sofort präzise Kostenübersicht
              </p>

              <Link to="/preisrechner">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 text-sm font-semibold">
                  Zum Preisrechner
                </Button>
              </Link>
            </div>
          </Card>

          {/* Online Buchung Block */}
          <Card className="p-4 hover:shadow-lg transition-shadow duration-300 bg-white border border-blue-200">
            <div className="text-center">
              <div className="bg-blue-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Online buchen
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                Fahrt bequem online buchen
              </p>

              <Link to="/buchen">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-semibold">
                  Jetzt buchen
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Call Block */}
          <Card className="p-4 hover:shadow-lg transition-shadow duration-300 bg-white border border-green-200">
            <div className="text-center">
              <div className="bg-green-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Direkt anrufen
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                24/7 telefonisch buchen
              </p>

              <a href="tel:076 611 31 31">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-semibold">
                  076 611 31 31
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CompactCalculatorCTA;