import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Car, Phone, Mail } from "lucide-react";

const QuickActions = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-yellow-600 to-orange-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Schnell & Einfach
          </h2>
          <p className="text-xl text-yellow-100">
            Preis berechnen, buchen oder direkt anrufen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Preisrechner */}
          <Link 
            to="/preisrechner"
            className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
              <Calculator className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Preisrechner
            </h3>
            <p className="text-gray-600 text-sm">
              Sofort Preis berechnen
            </p>
          </Link>

          {/* Online Buchung */}
          <Link 
            to="/buchen"
            className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Car className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Online Buchen
            </h3>
            <p className="text-gray-600 text-sm">
              Jetzt Fahrt buchen
            </p>
          </Link>

          {/* Direkt Anrufen */}
          <a 
            href="tel:076 611 31 31"
            className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Anrufen
            </h3>
            <p className="text-gray-600 text-sm">
              076 611 31 31
            </p>
          </a>

          {/* E-Mail */}
          <a 
            href="mailto:info@taxiturlihof.ch"
            className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              E-Mail
            </h3>
            <p className="text-gray-600 text-sm">
              Nachricht senden
            </p>
          </a>

        </div>
      </div>
    </section>
  );
};

export default QuickActions;