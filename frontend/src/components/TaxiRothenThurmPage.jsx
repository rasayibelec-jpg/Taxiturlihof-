import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MessageCircle } from 'lucide-react';

const TaxiRothenThurmPage = () => {
  return (<><Helmet><title>Taxi Rothenthurm – Taxi Turlihof | Flughafentransfer</title><meta name="description" content="Taxi Turlihof - Ihr Taxi-Service in Rothenthurm. Flughafentransfer. Jetzt buchen: 076 611 31 31" /><link rel="canonical" href="https://taxiturlihof.ch/taxi-rothenthurm" /></Helmet>
      <div className="min-h-screen bg-black text-white"><Header />
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"><div className="max-w-7xl mx-auto text-center"><h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Taxi Rothenthurm</h1><p className="text-xl text-gray-300 mb-8">Ihr Taxi-Service in Rothenthurm, Schwyz</p><a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"><Phone className="w-5 h-5 mr-2" />076 611 31 31</a></div></section>
        <section className="py-16 px-4 bg-black"><div className="max-w-4xl mx-auto"><div className="bg-gray-900 rounded-lg p-8 mb-12"><h2 className="text-3xl font-bold mb-6 text-white">Taxi Rothenthurm</h2><p className="text-lg text-gray-300">Taxi Turlihof - Ihr Taxi-Service in Rothenthurm.</p></div></div></section><Footer /></div></>
  );
};
export default TaxiRothenThurmPage;