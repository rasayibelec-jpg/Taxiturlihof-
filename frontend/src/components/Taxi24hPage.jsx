import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, Clock, MessageCircle } from 'lucide-react';

const Taxi24hPage = () => {
  return (
    <>
      <Helmet><title>Taxi Türlihof – 24h Taxi Service Luzern & Umgebung</title><meta name="description" content="Rund um die Uhr Taxi-Service ab Luzern, Küssnacht, Gersau, Schwyz und Zug. Immer erreichbar." /><link rel="canonical" href="https://taxiturlihof.ch/24h-taxi" /></Helmet>
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">24h Taxi Service</h1>
            <p className="text-xl text-gray-300 mb-8">Rund um die Uhr für Sie da</p>
            <a href="tel:+41766113131" className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"><Phone className="w-5 h-5 mr-2" />076 611 31 31</a>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Immer erreichbar</h2>
            <p className="text-gray-300 text-lg mb-8">Tag und Nacht, an 365 Tagen im Jahr – Taxi Türlihof ist für Sie da. Keine Nachtzuschläge, keine Wochenendgebühren.</p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Taxi24hPage;
