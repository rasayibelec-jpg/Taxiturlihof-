import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Train } from "lucide-react";
import SEOHead from "./SEOHead";

const TaxiZugPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Taxi Türlihof Zug",
    "description": "Zuverlässig Taxi-Service in Zug am Zugersee. Mercedes-Flotte für Business und Freizeit. Zug Bahnhof, Altstadt und Umgebung.",
    "url": "https://www.taxiturlihof.ch/taxi-zug",
    "telephone": "+41766113131",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zug",
      "addressCountry": "CH"
    },
    "areaServed": {
      "@type": "City", 
      "name": "Zug"
    },
    "serviceType": [
      "Business Taxi",
      "Bahnhof Transfer",
      "Flughafentransfer",
      "Stadtfahrten"
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Taxi Zug | Zuverlässiger Business & Freizeit Transport am Zugersee | Taxi Türlihof"
        description="Taxi Zug ➤ Zuverlässiger Mercedes-Service am Zugersee ☎️ 076 611 31 31 ➤ Business Transport, Zug Bahnhof, Altstadt ➤ Schnell & zuverlässig ab CHF 6.60"
        keywords="Taxi Zug, Taxi Zug Bahnhof, Business Taxi Zug, Zugersee Taxi, Zug Altstadt Taxi, 24h Taxi Zug, Mercedes Taxi Zug, Flughafentransfer Zug"
        url="https://www.taxiturlihof.ch/taxi-zug"
        structuredData={structuredData}
      />
      {/* Hero Section with REAL Lake Zug Background */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1541696724920-864a966cc4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Taxi Zug - Ihr zuverlässiger Partner am Zugersee
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              Stressfrei unterwegs mit Zuverlässig Mercedes-Taxi-Service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-bold text-lg shadow-lg"
              >
                <Phone className="w-6 h-6" />
                <span>076 611 31 31</span>
              </a>
              <a 
                href="#buchen" 
                className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg shadow-lg"
              >
                <Car className="w-6 h-6" />
                <span>Online Buchen</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Taxi Türlihof in Zug */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Taxi Zug - Ihr Taxi Bahnhof Partner
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stressfrei unterwegs mit Taxi Turlihof – Ihr Taxi Bahnhof und zuverlässiger 
              Partner am Zugersee für alle Ihre Transportbedürfnisse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border border-gray-800 text-center hover:border-yellow-600 transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gray-800 p-3 rounded-full w-fit mx-auto mb-4">
                  <Train className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-white">Bahnhof-Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Direkter Service vom und zum Bahnhof Zug - immer pünktlich zu Ihrem Zug
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 text-center hover:border-yellow-600 transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gray-800 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-white">Zuverlässig Verfügbar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Rund um die Uhr erreichbar - auch für frühe Züge oder späte Ankünfte
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 text-center hover:border-yellow-600 transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gray-800 p-3 rounded-full w-fit mx-auto mb-4">
                  <Car className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-white">Business-Fahrten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Perfekt für Geschäftsreisende - diskret, pünktlich und komfortabel
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Zug Ziele */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Beliebte Ziele in und um Zug
            </h2>
            <p className="text-xl text-gray-300">
              Wir bringen Sie überall in der Region Zug hin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Bahnhof Zug",
              "Zugersee", 
              "Altstadt Zug",
              "Zugerberg",
              "Baar",
              "Cham",
              "Steinhausen",
              "Walchwil"
            ].map((destination, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">
                <MapPin className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-white">{destination}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Business-Services in Zug
            </h2>
            <p className="text-xl text-gray-300">
              Zug als Wirtschaftsstandort - wir bringen Sie zu allen wichtigen Terminen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border border-gray-800 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 p-2 rounded-full mr-3">
                  <Train className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-white">Bahnhof-Transfer</h3>
              </div>
              <p className="text-gray-300">
                Zuverlässiger Transport vom und zum Bahnhof Zug. Wir sorgen dafür, dass Sie Ihren Zug nicht verpassen.
              </p>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 p-2 rounded-full mr-3">
                  <Car className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-white">Firmen-Fahrten</h3>
              </div>
              <p className="text-gray-300">
                Geschäftsfahrten zu Kunden, Meetings oder Events - diskret und professionell.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Häufige Fragen zu Taxi Zug
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Wie schnell sind Sie am Bahnhof Zug?
              </h3>
              <p className="text-gray-300">
                Vom Bahnhof Zug aus erreichen wir die meisten Ziele in der Stadt innerhalb von 5-15 Minuten.
              </p>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Bieten Sie auch Firmen-Accounts an?
              </h3>
              <p className="text-gray-300">
                Ja, für Unternehmen in Zug bieten wir spezielle Business-Tarife und Abrechnungsmodelle an. Kontaktieren Sie uns für ein individuelles Angebot.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="buchen" className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Jetzt Taxi in Zug buchen
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stressfrei am Zugersee unterwegs - Ihr zuverlässiger Taxi-Partner!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Jetzt anrufen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-teal-800 hover:bg-teal-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Car className="w-6 h-6" />
              <span>Online Buchen</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxiZugPage;