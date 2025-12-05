import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import CompactContact from './CompactContact';

const KontaktPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Taxi Türlihof - Kontakt",
    "description": "Kontaktieren Sie Taxi Türlihof für Flughafentransfer, Bahnhof Taxi und lokale Fahrten.",
    "url": "https://taxiturlihof.ch/kontakt"
  };

  return (
    <>
      <Helmet>
        <title>Taxi Türlihof – Kontakt & Buchung</title>
        <meta name="description" content="Kontaktieren Sie Taxi Türlihof für Flughafentransfer, Bahnhof Taxi und lokale Fahrten." />
        <meta name="keywords" content="Taxi Kontakt, Taxi buchen, Taxi Türlihof Kontakt, Taxi Luzern Kontakt" />
        <link rel="canonical" href="https://taxiturlihof.ch/kontakt" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />

        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Kontakt & Buchung
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Wir freuen uns auf Ihre Anfrage
            </p>
          </div>
        </section>

        <CompactContact />

        <Footer />
      </div>
    </>
  );
};

export default KontaktPage;
