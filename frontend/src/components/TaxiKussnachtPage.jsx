import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MapPin, Clock, CheckCircle, MessageCircle, Luggage } from 'lucide-react';

const TaxiKussnachtPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Taxi Turlihof",
    "areaServed": "Küssnacht",
    "description": "Moderner und pünktlicher Flughafentransfer ab Küssnacht.",
    "url": "https://taxiturlihof.ch/taxi-kussnacht"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Bietet ihr Fixpreise an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle Flughafentransfers haben klare Fixpreise."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich per WhatsApp reservieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Reservierungen sind jederzeit per WhatsApp möglich."
        }
      },
      {
        "@type": "Question",
        "name": "Ist zusätzliches Gepäck ein Problem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein, unsere Fahrzeuge haben genügend Platz."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Bietet ihr Fixpreise an?",
      answer: "Ja, alle Flughafentransfers haben klare Fixpreise."
    },
    {
      question: "Kann ich per WhatsApp reservieren?",
      answer: "Ja, Reservierungen sind jederzeit per WhatsApp möglich."
    },
    {
      question: "Ist zusätzliches Gepäck ein Problem?",
      answer: "Nein, unsere Fahrzeuge haben genügend Platz."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Taxi Turlihof – Taxi Küssnacht & Flughafentransfer</title>
        <meta name="description" content="Taxi Turlihof bietet in Küssnacht schnellen, modernen Flughafentransfer nach Zürich und Basel. Fixpreise, saubere Fahrzeuge, pünktlicher Service." />
        <meta name="keywords" content="Taxi Küssnacht, Flughafentransfer Küssnacht, Taxi Zürich Flughafen, Taxi Basel Flughafen, Küssnacht Taxi" />
        <link rel="canonical" href="https://taxiturlihof.ch/taxi-kussnacht" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Taxi Turlihof – Taxi Küssnacht & Flughafentransfer" />
        <meta property="og:description" content="Moderner und pünktlicher Flughafentransfer ab Küssnacht nach Zürich und Basel." />
        <meta property="og:url" content="https://taxiturlihof.ch/taxi-kussnacht" />
        <meta property="og:type" content="website" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Taxi Küssnacht – Modern, Schnell & Direkt
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ihr zuverlässiger Partner für Flughafentransfers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41766113131"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                076 611 31 31
              </a>
              <a
                href="https://wa.me/41766113131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg shadow-xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Flughafentransfer nach Zürich & Basel
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Taxi Turlihof bietet in Küssnacht einen schnellen, modernen und stressfreien 
                Flughafentransfer nach Zürich und Basel. Klare Fixpreise, saubere Fahrzeuge 
                und ein pünktlicher Service sorgen für eine entspannte Anreise.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Fixpreise</h3>
                    <p className="text-gray-400 text-sm">Transparente Preise ohne Überraschungen</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Pünktlich</h3>
                    <p className="text-gray-400 text-sm">Zuverlässig zu Ihrer gewünschten Zeit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Luggage className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Viel Platz</h3>
                    <p className="text-gray-400 text-sm">Genügend Raum für Ihr Gepäck</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div className="bg-gray-900 rounded-lg shadow-xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Unsere Flughafentransfers ab Küssnacht
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <span className="text-white font-medium">Küssnacht → Flughafen Zürich</span>
                  <span className="text-blue-400 font-semibold">Fixpreis auf Anfrage</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <span className="text-white font-medium">Küssnacht → Flughafen Basel</span>
                  <span className="text-blue-400 font-semibold">Fixpreis auf Anfrage</span>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-900 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Häufig gestellte Fragen
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-800 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 mt-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Jetzt Taxi buchen!
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Rufen Sie uns an oder schreiben Sie per WhatsApp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+41766113131"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  076 611 31 31
                </a>
                <a
                  href="https://wa.me/41766113131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TaxiKussnachtPage;
