import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import Reviews from './Reviews';

const BewertungenPage = () => {
  return (
    <>
      <Helmet><title>Taxi Türlihof – Kundenbewertungen & Erfahrungen</title><meta name="description" content="Lesen Sie echte Kundenmeinungen über Taxi Türlihof. Vertrauen und Zufriedenheit seit Jahren." /><link rel="canonical" href="https://taxiturlihof.ch/bewertungen" /></Helmet>
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Kundenbewertungen</h1>
            <p className="text-xl text-gray-300">Was unsere Kunden sagen</p>
          </div>
        </section>
        <Reviews />
        <Footer />
      </div>
    </>
  );
};
export default BewertungenPage;
