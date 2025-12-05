import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MapPin, Car, CheckCircle } from 'lucide-react';

const UeberUnsPage = () => {
  return (
    <>
      <Helmet><title>Taxi Türlihof – Ihr Taxi Unternehmen in Luzern & Umgebung</title><meta name="description" content="Taxi Türlihof – professionell, zuverlässig und lokal verankert. Lernen Sie unser Unternehmen kennen." /><link rel="canonical" href="https://taxiturlihof.ch/ueber-uns" /></Helmet>
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Über Taxi Türlihof</h1>
            <p className="text-xl text-gray-300 mb-8">Ihr zuverlässiger Partner in der Zentralschweiz</p>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">Taxi Türlihof ist Ihr professioneller Taxi-Service mit Sitz in Arth, Schwyz. Wir bedienen die gesamte Zentralschweiz mit Fokus auf Luzern, Küssnacht, Gersau, Schwyz und Zug.</p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">Mit unserer modernen Mercedes-Flotte, erfahrenen Fahrern und transparenten Fixpreisen garantieren wir Ihnen höchste Qualität und Zufriedenheit.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center"><Car className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Mercedes-Flotte</h3></div>
              <div className="text-center"><CheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Erfahrene Fahrer</h3></div>
              <div className="text-center"><MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Lokal verwurzelt</h3></div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default UeberUnsPage;
