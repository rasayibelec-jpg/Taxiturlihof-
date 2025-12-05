import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MessageCircle, Clock, CheckCircle, MapPin, Train } from 'lucide-react';
import { Link } from 'react-router-dom';

const BahnhofTaxiPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Taxi Türlihof - Bahnhof Taxi",
    "areaServed": ["Luzern", "Küssnacht", "Zug", "Schwyz"],
    "description": "Schnelle und zuverlässige Fahrten ab Bahnhof Luzern, Küssnacht, Zug und Schwyz.",
    "url": "https://taxiturlihof.ch/bahnhof-taxi",
    "telephone": "+41766113131"
  };

  return (
    <>
      <Helmet>
        <title>Taxi Türlihof – Bahnhof Taxi Luzern, Küssnacht, Zug</title>
        <meta name="description" content="Schnelle und zuverlässige Fahrten ab Bahnhof Luzern, Küssnacht, Zug und Schwyz." />
        <meta name="keywords" content="Bahnhof Taxi, Taxi Luzern Bahnhof, Taxi Küssnacht Bahnhof, Taxi Zug Bahnhof" />
        <link rel="canonical" href="https://taxiturlihof.ch/bahnhof-taxi" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />

        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <Train className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Bahnhof Taxi – Direkt vom Gleis
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Pünktlicher Transfer ab Bahnhof Luzern, Küssnacht, Zug und Schwyz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200">
                <Phone className="w-5 h-5 mr-2" />076 611 31 31
              </a>
              <a href="https://wa.me/41766113131" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <MessageCircle className="w-5 h-5 mr-2" />WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Bahnhöfe in unserem Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Bahnhof Luzern', description: 'Hauptbahnhof mit Direktverbindungen' },
                { name: 'Bahnhof Küssnacht', description: 'Schnelle Abholung garantiert' },
                { name: 'Bahnhof Zug', description: 'Pünktlich und zuverlässig' },
                { name: 'Bahnhof Schwyz', description: 'Transfer in die Zentralschweiz' }
              ].map((station) => (
                <div key={station.name} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all">
                  <Train className="w-10 h-10 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">{station.name}</h3>
                  <p className="text-gray-400">{station.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Ihre Vorteile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Pünktlich</h3>
                <p className="text-gray-300">Wir sind da, wenn Ihr Zug ankommt</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Zuverlässig</h3>
                <p className="text-gray-300">Kein langes Warten am Bahnhof</p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Direktfahrt</h3>
                <p className="text-gray-300">Vom Bahnhof direkt zu Ihrem Ziel</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BahnhofTaxiPage;