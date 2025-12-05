import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MessageCircle, Clock, CheckCircle, MapPin, Car } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const TaxiBestellenPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Taxi Türlihof",
    "areaServed": ["Luzern", "Küssnacht", "Gersau", "Schwyz", "Zug"],
    "description": "Einfach Taxi bestellen ab Luzern, Küssnacht, Gersau, Schwyz, Zug und Umgebung. Pünktlich, zuverlässig, Fixpreise.",
    "url": "https://taxiturlihof.ch/taxi-bestellen",
    "telephone": "+41766113131",
    "priceRange": "$$"
  };

  return (
    <>
      <Helmet>
        <title>Taxi Türlihof – Taxi bestellen in Luzern und Umgebung</title>
        <meta name="description" content="Einfach Taxi bestellen ab Luzern, Küssnacht, Gersau, Schwyz, Zug und Umgebung. Pünktlich, zuverlässig, Fixpreise." />
        <meta name="keywords" content="Taxi bestellen, Taxi Luzern, Taxi Küssnacht, Taxi Gersau, Taxi Schwyz, Taxi Zug" />
        <link rel="canonical" href="https://taxiturlihof.ch/taxi-bestellen" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Taxi bestellen – schnell & einfach
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ihr zuverlässiger Taxi-Service in Luzern, Küssnacht, Gersau, Schwyz und Zug
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41766113131"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                076 611 31 31
              </a>
              <a
                href="https://wa.me/41766113131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
              <Link
                to="/buchen"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Online buchen
              </Link>
            </div>
          </div>
        </section>

        {/* Bestellmöglichkeiten */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Taxi bestellen – 3 einfache Wege
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all">
                <Phone className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Telefonisch</h3>
                <p className="text-gray-300 mb-4">Rufen Sie uns an und bestellen Sie direkt.</p>
                <a href="tel:+41766113131" className="text-yellow-500 hover:text-yellow-400 font-semibold">076 611 31 31</a>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all">
                <MessageCircle className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">WhatsApp</h3>
                <p className="text-gray-300 mb-4">Schicken Sie uns eine Nachricht auf WhatsApp.</p>
                <a href="https://wa.me/41766113131" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 font-semibold">WhatsApp öffnen</a>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all">
                <Car className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Online</h3>
                <p className="text-gray-300 mb-4">Buchen Sie bequem online mit Preisrechner.</p>
                <Link to="/buchen" className="text-blue-500 hover:text-blue-400 font-semibold">Jetzt buchen</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Warum Taxi Türlihof?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Fixpreise</h3>
                <p className="text-gray-400">Transparente Preise ohne Überraschungen</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Pünktlich</h3>
                <p className="text-gray-400">Wir sind immer zur vereinbarten Zeit da</p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Lokal</h3>
                <p className="text-gray-400">Wir kennen die Region wie unsere Westentasche</p>
              </div>
              <div className="text-center">
                <Car className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Mercedes-Flotte</h3>
                <p className="text-gray-400">Komfort und Sicherheit garantiert</p>
              </div>
            </div>
          </div>
        </section>

        {/* Servicegebiete */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Unser Servicegebiet</h2>
            <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
              Wir fahren Sie zuverlässig von und nach:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Luzern', 'Küssnacht', 'Gersau', 'Schwyz', 'Zug', 'Weggis', 'Vitznau', 'Meggen', 'Kriens', 'Root'].map((ort) => (
                <div key={ort} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                  <p className="text-white font-semibold">{ort}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TaxiBestellenPage;