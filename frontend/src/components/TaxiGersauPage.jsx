import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MapPin, CheckCircle, MessageCircle } from 'lucide-react';

const TaxiGersauPage = () => {
  return (
    <>
      <Helmet>
        <title>Taxi Gersau – Taxi Turlihof | Flughafentransfer & Taxi-Service</title>
        <meta name="description" content="Taxi Turlihof - Ihr zuverlässiger Taxi-Service in Gersau. Flughafentransfer nach Zürich und Basel. Jetzt buchen: 076 611 31 31" />
        <meta name="keywords" content="Taxi Gersau, Flughafentransfer Gersau, Taxi Service Gersau" />
        <link rel="canonical" href="https://taxiturlihof.ch/taxi-gersau" />
      </Helmet>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Taxi Gersau – Zuverlässig & Schnell</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">Ihr Taxi-Service in Gersau am Vierwaldstättersee</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <Phone className="w-5 h-5 mr-2" />076 611 31 31</a>
              <a href="https://wa.me/41766113131" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <MessageCircle className="w-5 h-5 mr-2" />WhatsApp</a>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg shadow-xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Taxi & Flughafentransfer in Gersau</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">Taxi Turlihof bietet in Gersau einen professionellen Taxi-Service. Ob Flughafentransfer nach Zürich oder Basel, Stadtfahrten oder Ausflüge – wir bringen Sie sicher ans Ziel.</p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-start space-x-3"><CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-white mb-1">Fixpreise</h3><p className="text-gray-400 text-sm">Transparente Kosten</p></div></div>
                <div className="flex items-start space-x-3"><MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-white mb-1">Lokal</h3><p className="text-gray-400 text-sm">In Gersau</p></div></div>
                <div className="flex items-start space-x-3"><Phone className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-white mb-1">24/7</h3><p className="text-gray-400 text-sm">Immer erreichbar</p></div></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Jetzt Taxi buchen!</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors duration-200"><Phone className="w-5 h-5 mr-2" />076 611 31 31</a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default TaxiGersauPage;