import React from "react";
import { Link } from "react-router-dom";

const UltraCompactHero = () => {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Ihr zuverlässiges Taxi in Luzern
        </h1>
        
        <Link
          to="/preisrechner"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors duration-200 shadow-lg"
        >
          Preis berechnen
        </Link>
      </div>
    </section>
  );
};

export default UltraCompactHero;