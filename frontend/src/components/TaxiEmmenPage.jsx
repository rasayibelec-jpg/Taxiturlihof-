import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MessageCircle, Clock, MapPin, CheckCircle } from 'lucide-react';

const TaxiEmmenPage = () => {
  return (
    <>
      <Helmet>
        <title>Taxi Emmen – Zuverlässiger Taxi-Service | Taxi Türlihof</title>
        <meta 
          name="description" 
          content="Taxi Türlihof - Ihr zuverlässiger Taxi-Service in Emmen. Flughafentransfer Zürich & Basel, Stadtfahrten, 24/7 verfügbar. Jetzt buchen: ☎️ 076 611 31 31" 
        />
        <meta 
          name="keywords" 
          content="Taxi Emmen, Taxi Emmen buchen, Flughafentransfer Emmen Zürich, Flughafentransfer Emmen Basel, Taxi Emmen 24h, günstigstes Taxi Emmen" 
        />
        <link rel="canonical" href="https://www.taxiturlihof.ch/taxi-emmen" />
      </Helmet>

      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Taxi Emmen – Zuverlässig & Pünktlich
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ihr Taxi-Service in Emmen, Luzern
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41766113131"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                076 611 31 31
              </a>
              <a
                href="https://wa.me/41766113131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 bg-[#0b1120]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Taxi & Flughafentransfer in Emmen
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Taxi Türlihof bietet in Emmen einen zuverlässigen und komfortablen Taxi-Service. Ob 
                Flughafentransfer nach Zürich oder Basel, Stadtfahrten oder Ausflüge in die Region – 
                wir bringen Sie sicher und pünktlich ans Ziel.
              </p>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Fixpreise</h3>
                  <p className="text-sm text-gray-400">Transparente Kosten</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">24/7 Service</h3>
                  <p className="text-sm text-gray-400">Immer erreichbar</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <MapPin className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Lokal</h3>
                  <p className="text-sm text-gray-400">Direkt in Emmen</p>
                </div>
              </div>
            </div>

            {/* Popular Routes */}
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Beliebte Routen ab Emmen
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                  <span className="text-gray-300">Emmen → Flughafen Zürich</span>
                  <a 
                    href="/buchen" 
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                  <span className="text-gray-300">Emmen → Luzern</span>
                  <a 
                    href="/buchen" 
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                  <span className="text-gray-300">Emmen → Flughafen Basel</span>
                  <a 
                    href="/buchen" 
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Auf Anfrage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TaxiEmmenPage;
