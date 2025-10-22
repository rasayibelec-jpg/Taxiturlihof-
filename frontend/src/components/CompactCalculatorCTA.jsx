import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calculator, Calendar, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CompactCalculatorCTA = () => {
  return (
    <section id="calculator-cta" className="py-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-3">
          <h2 className="text-base font-bold text-white">
            Preis berechnen & Online buchen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          
          {/* Preisrechner - kleiner Block */}
          <Card className="p-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 border border-yellow-500 text-center shadow-lg">
            <div className="bg-yellow-500 p-1.5 rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center shadow-md">
              <Calculator className="w-4 h-4 text-gray-900" />
            </div>
            
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">
              Preis berechnen
            </h3>
            
            <p className="text-xs text-gray-600 mb-2">
              Sofort Kostenübersicht
            </p>

            <Link to="/preisrechner">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-1 text-xs font-bold shadow-md">
                Preisrechner
              </Button>
            </Link>
          </Card>

          {/* Online Buchung - kleiner Block */}
          <Card className="p-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 border border-blue-400 text-center shadow-lg">
            <div className="bg-blue-500 p-1.5 rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center shadow-md">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">
              Online buchen
            </h3>
            
            <p className="text-xs text-gray-600 mb-2">
              Fahrt direkt buchen
            </p>

            <Link to="/buchen">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 text-xs font-semibold shadow-md">
                Jetzt buchen
              </Button>
            </Link>
          </Card>

          {/* Direkt anrufen - kleiner Block */}
          <Card className="p-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 border border-green-400 text-center shadow-lg">
            <div className="bg-green-600 p-1.5 rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center shadow-md">
              <Phone className="w-4 h-4 text-white" />
            </div>
            
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">
              Direkt anrufen
            </h3>
            
            <p className="text-xs text-gray-600 mb-2">
              076 611 31 31
            </p>

            <a href="tel:076 611 31 31">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-1 text-xs font-semibold shadow-md">
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