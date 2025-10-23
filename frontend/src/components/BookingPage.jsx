import React from "react";
import Breadcrumb from "./Breadcrumb";
import BookingSystem from "./BookingSystem";
import SEOHead from "./SEOHead";
import { Card } from "./ui/card";
import { Calendar, Phone, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ReservationService", 
    "name": "Taxi Online Buchung",
    "description": "Buchen Sie Ihr Taxi online in Luzern, Schwyz und Zug. Mercedes-Flotte, Zuverlässig Service, sofortige E-Mail-Bestätigung.",
    "url": "https://www.taxiturlihof.ch/buchen",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Taxi Türlihof",
      "telephone": "+41766113131",
      "email": "info@taxiturlihof.ch"
    },
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "serviceType": "Online Booking",
        "availableLanguage": "de"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Taxi Online Buchen Luzern, Schwyz, Zug | Mercedes Taxi reservieren | Taxi Türlihof"
        description="🚗 Taxi online buchen in Luzern, Schwyz, Zug! Mercedes-Flotte, Zuverlässig Service, sofortige Bestätigung per E-Mail. Standard, Premium & Van verfügbar. Jetzt reservieren!"
        keywords="Taxi online buchen Luzern, Mercedes Taxi reservieren, Online Buchung Schwyz, Taxi vorbestellen Zug, 24h Taxi buchen, Premium Taxi bestellen, Van mieten"
        url="https://www.taxiturlihof.ch/buchen"
        structuredData={structuredData}
      />
      <Breadcrumb />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Online buchen
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Buchen Sie Ihre Fahrt bequem online - Bestätigung per E-Mail
            </p>
          </div>
        </div>
      </section>

      {/* Booking System */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSystem />
        </div>
      </section>

      {/* Alternative Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Andere Optionen
            </h2>
            <p className="text-lg text-gray-600">
              Benötigen Sie erst eine Preiskalkulation oder bevorzugen Sie den direkten Kontakt?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preis berechnen</h3>
              <p className="text-gray-600 mb-6">
                Kalkulieren Sie zunächst den ungefähren Fahrpreis für Ihre Route
              </p>
              <Link 
                to="/preisrechner"
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Zum Preisrechner
              </Link>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Telefonisch buchen</h3>
              <p className="text-gray-600 mb-6">
                Für spontane Fahrten oder bei speziellen Wünschen rufen Sie uns an
              </p>
              <a 
                href="tel:076 611 31 31"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                076 611 31 31
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;