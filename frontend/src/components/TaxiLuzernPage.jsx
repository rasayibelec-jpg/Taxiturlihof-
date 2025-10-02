import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Users } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import SEOHead from "./SEOHead";

const TaxiLuzernPage = () => {
  // SEO-optimized structured data for Taxi Luzern
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Taxi Türlihof Luzern",
    "description": "24/7 Taxi-Service in Luzern mit Mercedes-Flotte. Zuverlässiger Transport in der ganzen Stadt.",
    "url": "https://www.taxiturlihof.ch/taxi-luzern",
    "telephone": "+41766113131",
    "priceRange": "CHF 6.60 - CHF 300",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Luzern",
      "addressCountry": "CH"
    },
    "areaServed": {
      "@type": "City",
      "name": "Luzern"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Taxi Services Luzern",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Taxi Luzern Stadtfahrten",
            "description": "Schnelle und zuverlässige Fahrten in Luzern"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luzern Bahnhof Transfer",
            "description": "Transfer vom und zum Luzern Bahnhof"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Taxi Luzern | 24/7 Mercedes Taxi-Service | Taxi Türlihof"
        description="Taxi Luzern ➤ 24/7 Mercedes-Flotte ➤ Sofort verfügbar ☎️ 076 611 31 31 ➤ Luzern Bahnhof, Altstadt, Kapellbrücke ➤ Transparente Preise ab CHF 6.60"
        keywords="Taxi Luzern, Taxi Luzern Bahnhof, Taxi Luzern 24h, Mercedes Taxi Luzern, Kapellbrücke Taxi, Altstadt Luzern Taxi, KKL Luzern Taxi, Pilatus Taxi, Verkehrshaus Taxi, Luzern Airport Transfer"
        url="https://www.taxiturlihof.ch/taxi-luzern"
        structuredData={structuredData}
      />
      <Breadcrumb />
      {/* Hero Section with Beautiful Lucerne Background */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Taxi Luzern - Ihr zuverlässiger Partner
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              24/7 Mercedes-Taxi-Service in der Stadt Luzern
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-white text-yellow-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
              >
                <Phone className="w-6 h-6" />
                <span>076 611 31 31</span>
              </a>
              <a 
                href="#buchen" 
                className="flex items-center space-x-2 bg-yellow-800 hover:bg-yellow-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
              >
                <Car className="w-6 h-6" />
                <span>Online Buchen</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Taxi Türlihof in Luzern */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Warum Taxi Türlihof in Luzern wählen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Als lokaler Taxi-Service kennen wir Luzern wie unsere Westentasche. 
              Von der Altstadt bis zur Kapellbrücke - wir bringen Sie schnell und sicher ans Ziel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">24/7 Verfügbar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rund um die Uhr erreichbar - auch nachts, am Wochenende und an Feiertagen
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Car className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Mercedes-Flotte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Moderne, saubere Mercedes-Fahrzeuge für höchsten Komfort
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Lokale Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Wir kennen alle Routen, Shortcuts und die besten Wege durch Luzern
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Luzern Sehenswürdigkeiten */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Beliebte Ziele in Luzern
            </h2>
            <p className="text-xl text-gray-600">
              Wir bringen Sie zu allen wichtigen Orten in und um Luzern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Luzern Bahnhof",
              "Kapellbrücke", 
              "Altstadt Luzern",
              "KKL Luzern",
              "Pilatus Bergbahn",
              "Verkehrshaus",
              "Hotel Schweizerhof",
              "Universität Luzern"
            ].map((destination, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-yellow-50 transition-colors duration-200">
                <MapPin className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">{destination}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparente Preise für Taxi Luzern
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600">Grundtaxe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">CHF 6.60</div>
                <p className="text-gray-600">Pro Fahrt (alle Fahrzeugtypen)</p>
              </CardContent>
            </Card>

            <Card className="text-center border-yellow-200 border-2">
              <CardHeader>
                <Badge className="bg-yellow-600 text-white mb-2">Beliebt</Badge>
                <CardTitle className="text-2xl text-yellow-600">Standard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">CHF 4.20</div>
                <p className="text-gray-600">Pro Kilometer</p>
                <p className="text-sm text-gray-500 mt-2">Mercedes C-Klasse, E-Klasse</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600">Premium/Van</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">CHF 5.00</div>
                <p className="text-gray-600">Pro Kilometer</p>
                <p className="text-sm text-gray-500 mt-2">Mercedes S-Klasse, V-Klasse</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Andere Städte */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Weitere Servicegebiete von Taxi Türlihof
            </h2>
            <p className="text-xl text-gray-600">
              Wir sind auch in anderen Städten der Zentralschweiz für Sie da
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Taxi Schwyz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Sicher durch die Berglandschaft - Ihr Taxi-Service in Schwyz und Brunnen
                </p>
                <a 
                  href="/taxi-schwyz"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  Mehr erfahren
                  <MapPin className="w-4 h-4 ml-2" />
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-teal-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Taxi Zug</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Stressfrei am Zugersee - Ihr Bahnhof-Taxi und zuverlässiger Partner
                </p>
                <a 
                  href="/taxi-zug"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
                >
                  Mehr erfahren
                  <MapPin className="w-4 h-4 ml-2" />
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Flughafentransfer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Zuverlässiger Transfer zu allen Schweizer Flughäfen
                </p>
                <a 
                  href="/flughafentransfer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Mehr erfahren
                  <Car className="w-4 h-4 ml-2" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bewertungen */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Was unsere Kunden über uns sagen
            </h2>
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-2xl font-bold text-gray-900">5.0</span>
              <span className="ml-2 text-gray-600">(39 Bewertungen)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Sehr pünktlich und freundlich. Perfekter Service vom Luzern Bahnhof zum Hotel."
              </p>
              <p className="font-semibold text-gray-900">- Maria S.</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Saubere Mercedes-Fahrzeuge und sehr professionelle Fahrer. Empfehlenswert!"
              </p>
              <p className="font-semibold text-gray-900">- Thomas M.</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "24/7 erreichbar, auch spontane Fahrten kein Problem. Top Service!"
              </p>
              <p className="font-semibold text-gray-900">- Andrea K.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen zu Taxi Luzern
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie lange dauert es bis ein Taxi in Luzern kommt?
              </h3>
              <p className="text-gray-600">
                In der Regel sind wir innerhalb von 5-10 Minuten bei Ihnen, abhängig von Ihrem Standort in Luzern und der aktuellen Verkehrssituation.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fahren Sie auch vom Flughafen Zürich nach Luzern?
              </h3>
              <p className="text-gray-600">
                Ja, wir bieten zuverlässige Flughafentransfers von und zum Flughafen Zürich an. Die Fahrt dauert ca. 1 Stunde und kostet zwischen CHF 200-300.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kann ich ein Taxi für mehrere Personen buchen?
              </h3>
              <p className="text-gray-600">
                Selbstverständlich! Wir haben Mercedes V-Klasse Vans für bis zu 8 Personen sowie Standard-Fahrzeuge für 1-4 Personen.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="buchen" className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Jetzt Taxi in Luzern buchen
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rufen Sie uns an oder buchen Sie online - wir sind rund um die Uhr für Sie da!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-yellow-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Jetzt anrufen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-yellow-800 hover:bg-yellow-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Car className="w-6 h-6" />
              <span>Online Buchen</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-yellow-400 opacity-75">
            <p className="text-sm">
              ⭐ 5.0 Sterne • 39 Bewertungen • 24/7 Service • Mercedes-Flotte
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxiLuzernPage;