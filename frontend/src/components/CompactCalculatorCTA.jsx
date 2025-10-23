import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Calendar, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const CompactCalculatorCTA = () => {
  return (
    <section id="calculator-cta" className="py-8 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Preis berechnen & Online buchen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Preisrechner */}
          <Card className="p-4 hover:shadow-md transition-all duration-300 bg-white border border-gray-200 text-center">
            <div className="bg-gray-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-300">
              <Calculator className="w-6 h-6 text-gray-900" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Preis berechnen
            </h3>
            
            <p className="text-xs text-gray-600 mb-3">
              Sofort Kostenübersicht
            </p>

            <Link to="/preisrechner">
              <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 text-sm font-semibold border border-gray-300">
                Preisrechner
              </Button>
            </Link>
          </Card>

          {/* Online Buchung */}
          <Card className="p-4 hover:shadow-md transition-all duration-300 bg-white border border-gray-200 text-center">
            <div className="bg-gray-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-300">
              <Calendar className="w-6 h-6 text-gray-900" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Online buchen
            </h3>
            
            <p className="text-xs text-gray-600 mb-3">
              Fahrt direkt buchen
            </p>

            <Link to="/buchen">
              <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 text-sm font-semibold border border-gray-300">
                Jetzt buchen
              </Button>
            </Link>
          </Card>

          {/* Direkt anrufen */}
          <Card className="p-4 hover:shadow-md transition-all duration-300 bg-white border border-gray-200 text-center">
            <div className="bg-gray-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-300">
              <Phone className="w-6 h-6 text-gray-900" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Direkt anrufen
            </h3>
            
            <p className="text-xs text-gray-600 mb-3">
              076 611 31 31
            </p>

            <a href="tel:0766113131">
              <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 text-sm font-semibold border border-gray-300">
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