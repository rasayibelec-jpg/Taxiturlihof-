import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Calendar, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const CompactCalculatorCTA = () => {
  return (
    <section id="calculator-cta" className="py-12 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">
            Preis berechnen & Online buchen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Preisrechner */}
          <Card className="p-6 hover:border-yellow-600 transition-all duration-300 bg-gray-900 border border-gray-800 text-center">
            <div className="bg-gray-800 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-gray-700">
              <Calculator className="w-7 h-7 text-yellow-500" />
            </div>
            
            <h3 className="text-base font-bold text-white mb-2">
              Preis berechnen
            </h3>
            
            <p className="text-sm text-gray-400 mb-4">
              Sofort Kostenübersicht
            </p>

            <Link to="/preisrechner">
              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 text-sm font-semibold border border-gray-700">
                Preisrechner
              </Button>
            </Link>
          </Card>

          {/* Online Buchung */}
          <Card className="p-6 hover:border-yellow-600 transition-all duration-300 bg-gray-900 border border-gray-800 text-center">
            <div className="bg-gray-800 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-gray-700">
              <Calendar className="w-7 h-7 text-yellow-500" />
            </div>
            
            <h3 className="text-base font-bold text-white mb-2">
              Online buchen
            </h3>
            
            <p className="text-sm text-gray-400 mb-4">
              Fahrt direkt buchen
            </p>

            <Link to="/buchen">
              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 text-sm font-semibold border border-gray-700">
                Jetzt buchen
              </Button>
            </Link>
          </Card>

          {/* Direkt anrufen */}
          <Card className="p-6 hover:border-yellow-600 transition-all duration-300 bg-gray-900 border border-gray-800 text-center">
            <div className="bg-gray-800 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-gray-700">
              <Phone className="w-7 h-7 text-yellow-500" />
            </div>
            
            <h3 className="text-base font-bold text-white mb-2">
              Direkt anrufen
            </h3>
            
            <p className="text-sm text-gray-400 mb-4">
              076 611 31 31
            </p>

            <a href="tel:0766113131">
              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 text-sm font-semibold border border-gray-700">
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
