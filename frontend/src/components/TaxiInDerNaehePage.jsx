import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MessageCircle, MapPin, Clock, Navigation } from 'lucide-react';

const TaxiInDerNaehePage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Taxi Türlihof",
    "areaServed": ["Luzern", "Küssnacht", "Gersau", "Schwyz", "Zug"],
    "description": "Immer ein Taxi in Ihrer Nähe – Taxi Türlihof fährt ab Luzern, Küssnacht, Gersau, Schwyz, Zug und Umgebung.",
    "url": "https://taxiturlihof.ch/taxi-in-der-naehe",
    "telephone": "+41766113131"
  };

  return (
    <>
      <Helmet>
        <title>Taxi Türlihof – Taxi in der Nähe von Luzern, Küssnacht, Gersau</title>
        <meta name="description" content="Immer ein Taxi in Ihrer Nähe – Taxi Türlihof fährt ab Luzern, Küssnacht, Gersau, Schwyz, Zug und Umgebung." />
        <meta name="keywords" content="Taxi in der Nähe, Taxi Luzern, Taxi finden, Taxi Küssnacht, Taxi Gersau" />
        <link rel="canonical" href="https://taxiturlihof.ch/taxi-in-der-naehe" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />

        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <Navigation className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Taxi in der Nähe – Schnell bei Ihnen
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Egal wo Sie sind in Luzern, Küssnacht, Gersau, Schwyz oder Zug – wir sind in Ihrer Nähe!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200">
                <Phone className="w-5 h-5 mr-2" />Jetzt anrufen
              </a>
              <a href="https://wa.me/41766113131" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <MessageCircle className="w-5 h-5 mr-2" />WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Wir sind für Sie da</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                <Clock className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Kurze Wartezeit</h3>
                <p className="text-gray-300">Durchschnittlich nur 5-10 Minuten bis zur Abholung</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                <MapPin className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Lokale Kenntnisse</h3>
                <p className="text-gray-300">Wir kennen jeden Winkel der Region</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                <Navigation className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">GPS-Ortung</h3>
                <p className="text-gray-300">Moderne Technik für schnelle Anfahrt</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Unser Servicegebiet</h2>
            <p className="text-gray-300 text-lg mb-8">
              Wir decken die gesamte Zentralschweiz ab: Luzern, Küssnacht, Gersau, Schwyz, Zug, Weggis, Vitznau, Meggen, Kriens, Horw und viele weitere Orte.
            </p>
            <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors duration-200">
              <Phone className="w-5 h-5 mr-2" />076 611 31 31
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TaxiInDerNaehePage;