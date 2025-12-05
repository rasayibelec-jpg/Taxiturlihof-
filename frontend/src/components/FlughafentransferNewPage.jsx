import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MessageCircle, Plane, CheckCircle, Clock, Luggage } from 'lucide-react';
import { Link } from 'react-router-dom';

const FlughafentransferNewPage = () => {
  return (
    <>
      <Helmet>
        <title>Taxi Türlihof – Flughafentransfer Zürich & Basel</title>
        <meta name="description" content="Direktfahrten von Luzern, Küssnacht, Gersau, Schwyz und Zug zu den Flughäfen Zürich und Basel. Fixpreise und Komfort garantiert." />
        <link rel="canonical" href="https://taxiturlihof.ch/flughafentransfer" />
      </Helmet>
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <Plane className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Flughafentransfer Zürich & Basel</h1>
            <p className="text-xl text-gray-300 mb-8">Stressfrei zum Flughafen – Pünktlich, komfortabel, zum Fixpreis</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
                <Phone className="w-5 h-5 mr-2" />076 611 31 31
              </a>
              <Link to="/buchen" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">Jetzt buchen</Link>
            </div>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Ihre Vorteile</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center"><Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Pünktlich</h3></div>
              <div className="text-center"><CheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Fixpreise</h3></div>
              <div className="text-center"><Luggage className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Gepäckservice</h3></div>
              <div className="text-center"><Plane className="w-12 h-12 text-yellow-500 mx-auto mb-4" /><h3 className="font-semibold mb-2">Flight-Tracking</h3></div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default FlughafentransferNewPage;
