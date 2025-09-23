import React from "react";
import { Link } from "react-router-dom";

const UltraCompactAbout = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Über Taxi Türlihof
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
          Seit Jahren Ihr vertrauensvoller Partner für Taxi-Services in der Zentralschweiz. 
          Mit unserer modernen Mercedes-Flotte bringen wir Sie sicher, pünktlich und komfortabel 
          an Ihr Ziel – ob Geschäftstermin, Flughafentransfer oder Privatfahrt.
        </p>
        
        <Link
          to="/about"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
        >
          Mehr erfahren →
        </Link>
      </div>
    </section>
  );
};

export default UltraCompactAbout;