import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Mountain } from "lucide-react";
import SEOHead from "./SEOHead";

const TaxiSchwyzPage = () => {
  // SEO-optimized structured data for Taxi Schwyz
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Taxi Türlihof Schwyz",
    "description": "Zuverlässig Taxi-Service in Schwyz und Brunnen. Sicher durch die Berglandschaft mit Mercedes-Flotte.",
    "url": "https://www.taxiturlihof.ch/taxi-schwyz",
    "telephone": "+41766113131",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Schwyz",
      "addressCountry": "CH"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Schwyz"
      },
      {
        "@type": "City",
        "name": "Brunnen"
      },
      {
        "@type": "City",
        "name": "Stoos"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="Taxi Schwyz & Brunnen | Zuverlässig Berglandschaft Taxi | Taxi Türlihof"
        description="Taxi Schwyz ➤ Mercedes-Flotte für Bergstraßen ➤ Zuverlässig Service ☎️ 076 611 31 31 ➤ Schwyz, Brunnen, Stoos, Muotathal ➤ Sicher durch die Mythenregion"
        keywords="Taxi Schwyz, Taxi Brunnen, Taxi Stoos, Schwyz Bahnhof Taxi, Brunnen Bahnhof Taxi, Berg Taxi Schwyz, Mythenregion Taxi, Muotathal Taxi, Gersau Taxi, Morschach Taxi"
        url="https://www.taxiturlihof.ch/taxi-schwyz"
        structuredData={structuredData}
      />
      {/* Hero Section with Traditional Swiss Mountain Background */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1749024508888-3d1e8e6e928a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxTY2h3eXolMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzU5MDE4NDcwfDA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-yellow-300 font-semibold">🏔️ Traditionelle Schweizer Berglandschaft</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
              Taxi Schwyz & Brunnen
            </h1>
            <h2 className="text-3xl font-semibold mb-4 text-yellow-200 drop-shadow-md">
              Sicher durch die Berglandschaft
            </h2>
            <p className="text-2xl mb-8 opacity-90 drop-shadow-md">
              Zuverlässig Mercedes-Taxi-Service in der Mythenregion
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

      {/* Warum Taxi Türlihof in Schwyz */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ihr zuverlässiger Taxi-Partner in Schwyz
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mit Taxi Turlihof gelangen Sie sicher durch die Berglandschaft und erreichen 
              jedes Ziel in Schwyz und Brunnen - von der Mythenregion bis zum Vierwaldstättersee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border border-gray-800 text-center hover:border-yellow-600 transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gray-800 p-3 rounded-full w-fit mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Berglandschaft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Erfahrene Fahrer, die alle Bergstraßen und Routen in Schwyz perfekt kennen
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 text-center hover:border-yellow-600 transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gray-800 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Zuverlässig Verfügbar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Auch in den Bergen immer erreichbar - rund um die Uhr für Sie da
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 text-center hover:border-yellow-600 transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gray-800 p-3 rounded-full w-fit mx-auto mb-4">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Mercedes-Flotte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Sichere, moderne Fahrzeuge für alle Wetterbedingungen in den Bergen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Berglandschaft Showcase */}
      <section 
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1657053136972-241e05e6623f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxTY2h3eXolMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzU5MDE4NDcwfDA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-blue-900/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            🏔️ Mythenregion - Unser Servicegebiet
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Von den majestätischen Mythen bis zum kristallklaren Vierwaldstättersee - 
            wir kennen jeden Winkel dieser wunderschönen Berglandschaft
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Mountain className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Grosser Mythen</h3>
              <p className="text-white/90">1899m Höhe - Wahrzeichen von Schwyz</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <MapPin className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Vierwaldstättersee</h3>
              <p className="text-white/90">Kristallklarer Bergsee mit Panorama</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Car className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sichere Bergfahrten</h3>
              <p className="text-white/90">Mercedes-Flotte für alle Bergstraßen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schwyz Ziele */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Beliebte Ziele in Schwyz & Brunnen
            </h2>
            <p className="text-xl text-gray-300">
              Wir bringen Sie zu allen wichtigen Orten in der Mythenregion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Schwyz Bahnhof",
              "Brunnen Bahnhof", 
              "Mythenzentrum",
              "Victorinox Museum",
              "Gersau",
              "Morschach",
              "Stoos",
              "Muotathal"
            ].map((destination, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-green-50 transition-colors duration-200">
                <MapPin className="w-6 h-6 text-white mx-auto mb-2" />
                <h3 className="font-semibold text-white">{destination}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Häufige Fragen zu Taxi Schwyz
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Fahren Sie auch auf den Stoos?
              </h3>
              <p className="text-gray-300">
                Ja, wir fahren Sie gerne zur Stoosbahn-Talstation in Schwyz. Von dort können Sie mit der steilsten Standseilbahn der Welt auf den Stoos fahren.
              </p>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Sind Ihre Fahrzeuge für Bergstraßen geeignet?
              </h3>
              <p className="text-gray-300">
                Selbstverständlich! Unsere Mercedes-Flotte ist perfekt für alle Wetterbedingungen und Bergstraßen in der Region Schwyz ausgerüstet.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA with Classic Swiss Alps Background */}
      <section 
        id="buchen" 
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1564703821142-e88574e6cfa8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxTd2lzcyUyMG1vdW50YWluc3xlbnwwfHx8fDE3NTkwMTg0NjN8MA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm inline-block rounded-full px-6 py-2 mb-6">
            <span className="text-yellow-300 font-semibold">🚖 Taxi Service Schwyz & Brunnen</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            Jetzt Taxi in der Berglandschaft buchen
          </h2>
          <p className="text-xl mb-8 drop-shadow-md">
            Traditionelle Schweizer Berglandschaft sicher erleben - rufen Sie uns an!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-white px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Jetzt anrufen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
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

export default TaxiSchwyzPage;