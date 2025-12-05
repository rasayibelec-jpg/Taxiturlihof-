import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { DollarSign, CheckCircle, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreisePage = () => {
  const beispielpreise = [
    { von: 'Luzern', nach: 'Flughafen Zürich', preis: 'ab CHF 250' },
    { von: 'Schwyz', nach: 'Flughafen Zürich', preis: 'ab CHF 350' },
    { von: 'Zug', nach: 'Flughafen Zürich', preis: 'ab CHF 200' },
    { von: 'Küssnacht', nach: 'Flughafen Zürich', preis: 'ab CHF 230' },
    { von: 'Gersau', nach: 'Flughafen Zürich', preis: 'ab CHF 280' },
    { von: 'Weggis', nach: 'Flughafen Zürich', preis: 'ab CHF 260' },
    { von: 'Vitznau', nach: 'Flughafen Zürich', preis: 'ab CHF 270' },
    { von: 'Meggen', nach: 'Flughafen Zürich', preis: 'ab CHF 240' },
    { von: 'Kriens', nach: 'Flughafen Zürich', preis: 'ab CHF 240' },
    { von: 'Luzern', nach: 'Flughafen Basel', preis: 'ab CHF 280' },
    { von: 'Schwyz', nach: 'Flughafen Basel', preis: 'ab CHF 380' },
    { von: 'Zug', nach: 'Flughafen Basel', preis: 'ab CHF 230' }
  ];
  return (
    <>
      <Helmet><title>Taxi Türlihof – Fixpreise für Taxi & Flughafentransfer</title><meta name="description" content="Transparente Fixpreise für Taxi-Fahrten ab Luzern, Küssnacht, Gersau, Schwyz und Zug. Keine versteckten Kosten." /><link rel="canonical" href="https://taxiturlihof.ch/preise" /></Helmet>
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Header />
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-[#0b1120]">
          <div className="max-w-7xl mx-auto text-center">
            <DollarSign className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Transparente Fixpreise</h1>
            <p className="text-xl text-gray-300 mb-8">Keine versteckten Kosten</p>
            <Link to="/preisrechner" className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"><Calculator className="w-5 h-5 mr-2" />Preis berechnen</Link>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Beispielpreise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beispielpreise.map((route, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-400">Von {route.von}</p>
                  <p className="text-sm text-gray-400">Nach {route.nach}</p>
                  <div className="text-center py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl mt-4">{route.preis}</div>
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
export default PreisePage;
