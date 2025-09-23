import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Car } from "lucide-react";

const UltraCompactActions = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-yellow-600 to-orange-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Schnell & Einfach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          
          {/* Preisrechner */}
          <Link 
            to="/preisrechner"
            className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-yellow-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
              <Calculator className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Preisrechner öffnen
            </h3>
            <p className="text-gray-600">
              Sofort Fahrpreis berechnen
            </p>
          </Link>

          {/* Online Buchung */}
          <Link 
            to="/buchen"
            className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Car className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Online Buchung starten
            </h3>
            <p className="text-gray-600">
              Taxi direkt online buchen
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default UltraCompactActions;