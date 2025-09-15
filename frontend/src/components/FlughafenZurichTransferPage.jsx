import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Plane, CheckCircle, Calculator, Users } from "lucide-react";
import SEOHead from "./SEOHead";
import Breadcrumb from "./Breadcrumb";

const FlughafenZurichTransferPage = () => {
  // SEO-optimized structured data for Airport Transfer Zurich
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Flughafentransfer Zürich ab Luzern",
    "description": "Zuverlässiger und pünktlicher Transfer vom Flughafen Zürich nach Luzern, Schwyz, Zug und ganze Zentralschweiz mit Mercedes-Flotte",
    "url": "https://www.taxiturlihof.ch/flughafen-zurich-transfer",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Taxi Türlihof",
      "telephone": "+41766113131",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Luzern",
        "addressCountry": "CH"
      }
    },
    "areaServed": [
      {
        "@type": "Airport",
        "name": "Flughafen Zürich",
        "iataCode": "ZUR"
      }
    ],
    "offers": {
      "@type": "Offer",
      "description": "Flughafentransfer Zürich nach Luzern",
      "priceRange": "CHF 200-300",
      "priceCurrency": "CHF"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Flughafentransfer Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Zürich Airport → Luzern",
            "description": "Direkter Transfer vom Flughafen Zürich nach Luzern"
          },
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "250",
            "priceCurrency": "CHF",
            "referenceQuantity": {
              "@type": "QuantitativeValue",
              "value": "1",
              "unitText": "TRIP"
            }
          }
        }
      ]
    }
  };

  const popularRoutes = [
    { from: "Flughafen Zürich", to: "Luzern Bahnhof", time: "55 Min", price: "250", popular: true },
    { from: "Flughafen Zürich", to: "Luzern Altstadt", time: "60 Min", price: "260", popular: true },
    { from: "Flughafen Zürich", to: "Schwyz", time: "75 Min", price: "280", popular: false },
    { from: "Flughafen Zürich", to: "Zug", time: "45 Min", price: "220", popular: true },
    { from: "Flughafen Zürich", to: "Weggis", time: "65 Min", price: "270", popular: false },
    { from: "Flughafen Zürich", to: "Brunnen", time: "80 Min", price: "290", popular: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Flughafentransfer Zürich ab Luzern | Mercedes Taxi | Taxi Türlihof"
        description="Flughafentransfer Zürich ✈️ Ab CHF 220 ✈️ Mercedes-Flotte ✈️ 24/7 verfügbar ☎️ 076 611 31 31 ✈️ Pünktlich & zuverlässig ✈️ Von/nach Luzern, Schwyz, Zug"
        keywords="Flughafentransfer Zürich, Airport Transfer Zürich, Luzern Flughafen Zürich, Taxi Flughafen Zürich, Zürich Airport Luzern, Mercedes Airport Transfer, 24h Flughafentaxi, Flughafen Transfer Zentralschweiz"
        url="https://www.taxiturlihof.ch/flughafen-zurich-transfer"
        structuredData={structuredData}
      />
      
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Plane className="w-12 h-12 text-blue-200 mr-4" />
              <div className="w-16 h-px bg-blue-200"></div>
              <Car className="w-10 h-10 text-blue-200 mx-4" />
              <div className="w-16 h-px bg-blue-200"></div>
              <MapPin className="w-12 h-12 text-blue-200 ml-4" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Flughafentransfer Zürich
            </h1>
            <p className="text-2xl mb-4 opacity-90">
              Zuverlässiger Transfer von/nach Flughafen Zürich
            </p>
            <p className="text-xl mb-8 opacity-80">
              Mercedes-Flotte • 24/7 Service • Ab CHF 220 • Luzern ↔ Zug ↔ Schwyz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
              >
                <Phone className="w-6 h-6" />
                <span>Sofort buchen: 076 611 31 31</span>
              </a>
              <a 
                href="#preise" 
                className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
              >
                <Calculator className="w-6 h-6" />
                <span>Preise berechnen</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Warum Taxi Türlihof für Ihren Flughafentransfer Zürich?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Als etablierter Taxi-Service der Zentralschweiz garantieren wir Ihnen pünktlichen, 
              komfortablen und zuverlässigen Transport zum und vom Flughafen Zürich.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Pünktlichkeit garantiert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Flugzeiten werden überwacht. Bei Verspätungen warten wir kostenfrei.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Real-time Flug-Tracking</li>
                  <li>✓ 60 Min kostenloses Warten</li>
                  <li>✓ SMS-Benachrichtigung</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Mercedes-Komfort</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Moderne Mercedes-Flotte mit viel Platz für Gepäck und Passagiere.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Mercedes C/E/S-Klasse</li>
                  <li>✓ Mercedes V-Klasse (8 Personen)</li>
                  <li>✓ Klimaanlage & WLAN</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">24/7 Verfügbar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Rund um die Uhr erreichbar - auch für frühe oder späte Flüge.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Auch an Feiertagen</li>
                  <li>✓ Kurzfristige Buchungen</li>
                  <li>✓ Mehrsprachige Fahrer</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Routes & Prices */}
      <section id="preise" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Flughafentransfer Zürich Preise & Strecken
            </h2>
            <p className="text-xl text-gray-600">
              Transparente Festpreise für alle Destinationen in der Zentralschweiz
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Popular Routes */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Beliebte Strecken
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularRoutes.map((route, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                      route.popular ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{route.from}</span>
                          <div className="w-8 h-px bg-gray-400"></div>
                          <span className="font-semibold text-gray-900">{route.to}</span>
                          {route.popular && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Beliebt</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {route.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">CHF {route.price}</div>
                        <div className="text-xs text-gray-500">Festpreis</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Process */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-600">
                  So einfach buchen Sie Ihren Transfer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Anruf oder Online-Buchung</h4>
                      <p className="text-sm text-gray-600">Rufen Sie 076 611 31 31 an oder buchen Sie online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Flugdaten angeben</h4>
                      <p className="text-sm text-gray-600">Flugnummer, Ankunfts-/Abflugzeit, Terminal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Bestätigung erhalten</h4>
                      <p className="text-sm text-gray-600">SMS mit Fahrer-Kontakt und Mercedes-Details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Entspannt reisen</h4>
                      <p className="text-sm text-gray-600">Ihr Fahrer wartet mit Namensschild am Terminal</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Profi-Tipp:</h4>
                  <p className="text-sm text-green-700">
                    Buchen Sie 24h im Voraus für garantierte Verfügbarkeit. 
                    Bei kurzfristigen Buchungen sind wir trotzdem meist verfügbar!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unsere Mercedes-Flotte für Flughafentransfers
            </h2>
            <p className="text-xl text-gray-600">
              Wählen Sie das passende Fahrzeug für Ihren Flughafentransfer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Mercedes C/E-Klasse</CardTitle>
                <CardDescription>Standard Transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 p-4 rounded-lg mb-4">
                  <Car className="w-12 h-12 text-blue-600 mx-auto" />
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>1-4 Personen</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>2-3 große Koffer</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">CHF 220-280</div>
                <p className="text-xs text-gray-500">Je nach Destination</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-yellow-200 border-2">
              <CardHeader>
                <Badge className="bg-yellow-100 text-yellow-800 mb-2">Beliebt</Badge>
                <CardTitle className="text-xl text-gray-900">Mercedes S-Klasse</CardTitle>
                <CardDescription>Komfort Transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <Car className="w-12 h-12 text-yellow-600 mx-auto" />
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>1-4 Personen</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>4-5 große Koffer</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-2">CHF 280-350</div>
                <p className="text-xs text-gray-500">Premium Komfort</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Mercedes V-Klasse</CardTitle>
                <CardDescription>Gruppen Transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <Car className="w-12 h-12 text-green-600 mx-auto" />
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>5-8 Personen</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>6-8 große Koffer</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">CHF 350-420</div>
                <p className="text-xs text-gray-500">Ideal für Gruppen</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen zum Flughafentransfer Zürich
            </h2>
            <p className="text-xl text-gray-600">
              Alles was Sie über unseren Airport Transfer Service wissen sollten
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie früh sollte ich meinen Flughafentransfer buchen?
              </h3>
              <p className="text-gray-600">
                Idealerweise 24 Stunden im Voraus für garantierte Verfügbarkeit. Wir können aber oft auch kurzfristige Buchungen (sogar 1-2 Stunden vorher) umsetzen. Rufen Sie einfach an: 076 611 31 31
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was passiert bei Flugverspätungen oder -ausfällen?
              </h3>
              <p className="text-gray-600">
                Wir überwachen alle Flüge in Echtzeit. Bei Verspätungen warten wir bis zu 60 Minuten kostenfrei. Bei Ausfällen können Sie kostenfrei stornieren oder auf einen anderen Flug umbuchen.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wo finde ich meinen Fahrer am Flughafen Zürich?
              </h3>
              <p className="text-gray-600">
                Bei Ankünften: In der Ankunftshalle mit Namensschild. Bei Abflügen: Vor dem Haupteingang Ihres Terminals. Sie erhalten 30 Min vor Ankunft eine SMS mit Fahrer-Kontakt und genauem Treffpunkt.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sind die Preise fix oder kommen noch Zusatzkosten dazu?
              </h3>
              <p className="text-gray-600">
                Alle angegebenen Preise sind Festpreise inklusive MwSt. Keine versteckten Kosten, keine Aufschläge für Nachtzuschlag oder Feiertage. Nur bei Umwegen auf Kundenwunsch können geringe Mehrkosten entstehen.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welche Zahlungsmethoden akzeptieren Sie?
              </h3>
              <p className="text-gray-600">
                Wir akzeptieren Bargeld, alle gängigen Kreditkarten, TWINT und PayPal. Bei Online-Buchungen können Sie bequem vorab bezahlen oder vor Ort beim Fahrer.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Das sagen unsere Kunden über unseren Flughafentransfer
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
                "Perfekter Service! Trotz 2h Flugverspätung hat der Fahrer geduldig gewartet. Mercedes war tadellos sauber und sehr komfortabel für die Fahrt nach Luzern."
              </p>
              <p className="font-semibold text-gray-900">- Stefan K., Geschäftsreisender</p>
              <p className="text-xs text-gray-500">Zürich → Luzern Transfer</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Ausgezeichnet! V-Klasse war ideal für unsere 6-köpfige Familie mit viel Gepäck. Fahrer war sehr freundlich und hilfsbereit. Gerne wieder!"
              </p>
              <p className="font-semibold text-gray-900">- Familie Weber</p>
              <p className="text-xs text-gray-500">Familien-Transfer nach Schwyz</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Zuverlässig und pünktlich wie ein Schweizer Uhrwerk. Nutze den Service regelmäßig für Geschäftsreisen. Immer saubere Mercedes und professionelle Fahrer."
              </p>
              <p className="font-semibold text-gray-900">- Dr. Anna M., Consulting</p>
              <p className="text-xs text-gray-500">Regelmäßige Business-Transfers</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Jetzt Flughafentransfer Zürich buchen
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stressfrei, pünktlich und komfortabel - Ihr zuverlässiger Partner für alle Flughafentransfers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Sofort buchen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Plane className="w-6 h-6" />
              <span>Online Buchen</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-blue-400 opacity-75">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Service</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">60 Min</div>
              <div className="text-sm">Kostenloses Warten</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5.0⭐</div>
              <div className="text-sm">Google Bewertung</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">CHF 220</div>
              <div className="text-sm">Ab Preis</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlughafenZurichTransferPage;