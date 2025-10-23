import React from "react";
import Breadcrumb from "./Breadcrumb";
import PriceCalculator from "./PriceCalculator";
import SEOHead from "./SEOHead";
import { Card } from "./ui/card";
import { Calculator, Phone, Car } from "lucide-react";
import { Link } from "react-router-dom";

const PriceCalculatorPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Taxi Preisrechner",
    "description": "Berechnen Sie Taxipreise in Luzern, Schwyz und Zug. Schnellste und günstigste Route mit Echtzeit-Verkehrsdaten.",
    "url": "https://www.taxiturlihof.ch/preisrechner",
    "applicationCategory": "TransportationApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "6.60",
      "priceCurrency": "CHF",
      "description": "Grundtarif + 4.20 CHF/km"
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "Taxi Türlihof",
      "telephone": "+41766113131"
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Taxi Preisrechner Luzern, Schwyz, Zug | Route & Preis berechnen | Taxi Türlihof"
        description="🚗 Berechnen Sie Taxipreise in Luzern, Schwyz, Zug. Schnellste vs günstigste Route mit Echtzeit-Verkehrsdaten. Mercedes Taxi ab CHF 6.60 + 4.20/km. Jetzt online buchen!"
        keywords="Taxi Preisrechner Luzern, Taxipreis berechnen Schwyz, Fahrpreis Zug, schnellste Route Taxi, günstigste Taxifahrt, Online Preisrechner, Mercedes Taxi Kosten, Flughafentransfer Preis"
        url="https://www.taxiturlihof.ch/preisrechner"
        structuredData={structuredData}
      />
      <Breadcrumb />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Preisrechner
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Berechnen Sie den Fahrpreis für Ihre Route schnell und transparent
            </p>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceCalculator />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bereit für die Buchung?
            </h2>
            <p className="text-lg text-gray-600">
              Haben Sie Ihren Preis berechnet? Dann buchen Sie jetzt Ihre Fahrt!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Online buchen</h3>
              <p className="text-gray-600 mb-6">
                Bequem über unser Buchungsformular mit sofortiger Bestätigung
              </p>
              <Link 
                to="/buchen"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Zur Buchung
              </Link>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Telefonisch buchen</h3>
              <p className="text-gray-600 mb-6">
                Direkter Kontakt für spontane Fahrten oder spezielle Wünsche
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

export default PriceCalculatorPage;