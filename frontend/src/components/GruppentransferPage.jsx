import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, Users, Car } from 'lucide-react';

const GruppentransferPage = () => {
  return (
    <>
      <Helmet><title>Taxi Türlihof – Gruppentransfer & Familienfahrten</title><meta name="description" content="Komfortable Transfers für Gruppen und Familien ab Luzern, Küssnacht, Gersau, Schwyz und Zug." /><link rel="canonical" href="https://taxiturlihof.ch/gruppentransfer" /></Helmet>
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <Users className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Gruppentransfer & Familienfahrten</h1>
            <p className="text-xl text-gray-300 mb-8">Gemeinsam komfortabel ans Ziel</p>
            <a href="tel:+41766113131" className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"><Phone className="w-5 h-5 mr-2" />076 611 31 31</a>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Platz für die ganze Familie</h2>
            <p className="text-gray-300 text-lg mb-8">Unsere Mercedes-Fahrzeuge bieten ausreichend Platz für Gruppen bis zu 6 Personen inkl. Gepäck.</p>
            <Car className="w-16 h-16 text-yellow-500 mx-auto" />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default GruppentransferPage;
