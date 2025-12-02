import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Car, Phone, Mail } from "lucide-react";

const QuickActions = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-yellow-600 to-orange-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Schnell & Einfach
          </h2>
          <p className="text-yellow-100">
            Preis berechnen, buchen oder direkt anrufen
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Preisrechner */}
          <Link 
            to="/preisrechner"
            className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-yellow-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
              <Calculator className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Preisrechner
            </h3>
            <p className="text-gray-600 text-xs">
              Jetzt starten
            </p>
          </Link>

          {/* Online Buchung */}
          <Link 
            to="/buchen"
            className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-green-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Online Buchen
            </h3>
            <p className="text-gray-600 text-xs">
              Jetzt starten
            </p>
          </Link>

          {/* Direkt Anrufen */}
          <a 
            href="tel:076 611 31 31"
            className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-blue-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Anrufen
            </h3>
            <p className="text-gray-600 text-xs">
              076 611 31 31
            </p>
          </a>

          {/* E-Mail */}
          <a 
            href="mailto:rasayibelec@gmail.com"
            className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-purple-100 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              E-Mail
            </h3>
            <p className="text-gray-600 text-xs">
              Schreiben
            </p>
          </a>

        </div>
      </div>
    </section>
  );
};

export default QuickActions;