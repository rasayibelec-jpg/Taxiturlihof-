import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Plane } from "lucide-react";
import SEOHead from "./SEOHead";

const FlughafentransferPage = () => {
  // SEO-optimized structured data for Airport Transfer
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Flughafentransfer Zürich Basel",
    "description": "Zuverlässiger Flughafentransfer von Luzern, Schwyz, Zug zu Flughafen Zürich und Basel",
    "url": "https://www.taxiturlihof.ch/flughafentransfer",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Taxi Türlihof",
      "telephone": "+41766113131"
    },
    "areaServed": [
      {
        "@type": "Airport",
        "name": "Flughafen Zürich"
      },
      {
        "@type": "Airport", 
        "name": "EuroAirport Basel"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Flughafentransfer Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfer Flughafen Zürich",
            "description": "Zuverlässiger Transfer zum Flughafen Zürich von der Zentralschweiz"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Transfer Flughafen Basel",
            "description": "Komfortabler Transfer zum EuroAirport Basel"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Flughafentransfer Zürich & Basel | Taxi Türlihof | Ab Luzern"
        description="Flughafentransfer Zürich & Basel ➤ Von Luzern, Schwyz, Zug ➤ Mercedes-Flotte ➤ 24/7 Service ☎️ 076 611 31 31 ➤ Pünktlich & zuverlässig ➤ Gepäckservice"
        keywords="Flughafentransfer Zürich, Airport Transfer Basel, Luzern Flughafen Zürich, Taxi Flughafen Zürich, Schwyz Airport Basel, Zug Flughafentransfer, Mercedes Airport Transfer, 24h Flughafentaxi"
        url="https://www.taxiturlihof.ch/flughafentransfer"
        structuredData={structuredData}
      />
      {/* Hero Section with Beautiful Airport Background */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Flughafentransfer Zürich & Basel
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              Zuverlässiger Transfer von der Zentralschweiz zu allen Flughäfen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
              >
                <Phone className="w-6 h-6" />
                <span>076 611 31 31</span>
              </a>
              <a 
                href="#buchen" 
                className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
              >
                <Plane className="w-6 h-6" />
                <span>Transfer Buchen</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Flughäfen */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unsere Flughafentransfer-Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bequemer und zuverlässiger Transfer zu allen wichtigen Flughäfen der Schweiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Plane className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Flughafen Zürich</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-600">Der größte Flughafen der Schweiz</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Fahrtzeit von Luzern:</span>
                    <Badge className="bg-blue-100 text-blue-800">ca. 1 Stunde</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Preis:</span>
                    <a href="tel:0766113131" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                      📞 auf Anfrage
                    </a>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Abfahrtsorte:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Luzern</Badge>
                      <Badge variant="outline">Schwyz</Badge>
                      <Badge variant="outline">Zug</Badge>
                      <Badge variant="outline">Weggis</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                  <Plane className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Flughafen Basel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-600">EuroAirport Basel-Mulhouse-Freiburg</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Fahrtzeit von Luzern:</span>
                    <Badge className="bg-purple-100 text-purple-800">ca. 1.5 Stunden</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Preis:</span>
                    <a href="tel:0766113131" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                      📞 auf Anfrage
                    </a>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Abfahrtsorte:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Luzern</Badge>
                      <Badge variant="outline">Schwyz</Badge>
                      <Badge variant="outline">Zug</Badge>
                      <Badge variant="outline">Brunnen</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Warum Taxi Türlihof für Ihren Flughafentransfer?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pünktlichkeit</h3>
              <p className="text-gray-600">
                Wir berücksichtigen Verkehr und Flugzeiten - Sie verpassen garantiert keinen Flug
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Komfort</h3>
              <p className="text-gray-600">
                Mercedes-Flotte mit viel Platz für Gepäck und entspannte Fahrt
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Service</h3>
              <p className="text-gray-600">
                Auch für frühe Morgenstunden oder nächtliche Flüge verfügbar
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Preise & Strecken */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Flughafentransfer Preise
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Individuelle Preise auf Anfrage - kontaktieren Sie uns für ein unverbindliches Angebot
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Flughafen Zürich</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Luzern → Flughafen Zürich</span>
                  <a href="tel:0766113131" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Schwyz → Flughafen Zürich</span>
                  <a href="tel:0766113131" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Zug → Flughafen Zürich</span>
                  <a href="tel:0766113131" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Weggis → Flughafen Zürich</span>
                  <a href="tel:0766113131" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Flughafen Basel</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Luzern → Flughafen Basel</span>
                  <a href="tel:0766113131" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Schwyz → Flughafen Basel</span>
                  <a href="tel:0766113131" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>Zug → Flughafen Basel</span>
                  <a href="tel:0766113131" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Brunnen → Flughafen Basel</span>
                  <a href="tel:0766113131" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                    📞 auf Anfrage
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen zum Flughafentransfer
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie früh sollte ich den Transfer buchen?
              </h3>
              <p className="text-gray-600">
                Idealerweise 24 Stunden im Voraus, aber wir können oft auch kurzfristige Buchungen umsetzen. Rufen Sie uns einfach an!
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was passiert bei Flugverspätungen?
              </h3>
              <p className="text-gray-600">
                Wir überwachen Ihren Flug und passen die Abholzeit automatisch an. Bei Verspätungen entstehen keine zusätzlichen Kosten.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Haben Ihre Fahrzeuge genug Platz für Gepäck?
              </h3>
              <p className="text-gray-600">
                Ja, unsere Mercedes-Fahrzeuge haben große Kofferräume. Für Gruppen mit viel Gepäck empfehlen wir unsere V-Klasse Vans.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sind die Preise fix oder gibt es Aufschläge?
              </h3>
              <p className="text-gray-600">
                Unsere Flughafentransfer-Preise werden individuell kalkuliert und sind abhängig von Strecke, Fahrzeugtyp und Uhrzeit. Kontaktieren Sie uns für ein unverbindliches Angebot.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Beautiful Airport Background */}
      <section 
        id="buchen" 
        className="relative py-16 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(147, 51, 234, 0.8)), url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Jetzt Flughafentransfer buchen
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stressfrei zum Flug - zuverlässig und pünktlich!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Jetzt anrufen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Plane className="w-6 h-6" />
              <span>Online Buchen</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-400 opacity-75">
            <p className="text-sm">
              ✈️ Flughafen Zürich & Basel • 🚗 Mercedes-Flotte • ⭐ 5.0 Sterne • 📞 24/7 Service
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlughafentransferPage;