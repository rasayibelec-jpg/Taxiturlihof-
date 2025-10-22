import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calculator, Calendar, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CompactCalculatorCTA = () => {
  return (
    <section id="calculator-cta" className="py-4 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-3">
          <h2 className="text-base font-bold text-gray-900">
            Preis berechnen & Online buchen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          
          {/* Preisrechner - kleiner Block */}
          <Card className="p-3 hover:shadow-lg transition-all duration-300 bg-white border-0 hover:border hover:border-yellow-300 text-center">
            <div className="bg-yellow-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-yellow-600" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Preis berechnen
            </h3>
            
            <p className="text-xs text-gray-600 mb-3">
              Sofort Kostenübersicht
            </p>

            <Link to="/preisrechner">
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-1 text-xs font-semibold">
                Preisrechner
              </Button>
            </Link>
          </Card>

          {/* Online Buchung - kleiner Block */}
          <Card className="p-3 hover:shadow-lg transition-all duration-300 bg-white border-0 hover:border hover:border-blue-300 text-center">
            <div className="bg-blue-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Online buchen
            </h3>
            
            <p className="text-xs text-gray-600 mb-3">
              Fahrt direkt buchen
            </p>

            <Link to="/buchen">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 text-xs font-semibold">
                Jetzt buchen
              </Button>
            </Link>
          </Card>

          {/* Direkt anrufen - kleiner Block */}
          <Card className="p-3 hover:shadow-lg transition-all duration-300 bg-white border-0 hover:border hover:border-green-300 text-center">
            <div className="bg-green-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Direkt anrufen
            </h3>
            
            <p className="text-xs text-gray-600 mb-3">
              076 611 31 31
            </p>

            <a href="tel:076 611 31 31">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-1 text-xs font-semibold">
                Anrufen
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CompactCalculatorCTA;