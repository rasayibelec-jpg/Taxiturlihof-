import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Phone, Clock, Star, Car, Mountain, Train } from "lucide-react";
import SEOHead from "./SEOHead";
import CompactCalculatorCTA from "./CompactCalculatorCTA";

const TaxiArthGoldauPage = () => {
  const seoData = {
    title: "Taxi Arth-Goldau | Zuverlässiger Taxi-Service am Fuße der Rigi",
    description: "Taxi Service Arth-Goldau ✓ Bahnhof Transfers ✓ Rigi-Fahrten ✓ Zuverlässig verfügbar ✓ Mercedes-Flotte ☎️ 076 611 31 31 - Ihr lokaler Taxi-Partner",
    keywords: "Taxi Arth-Goldau, Bahnhof Goldau Taxi, Rigi Taxi Service, Taxi zum Bahnhof Arth-Goldau, Mercedes Taxi Goldau, 24h Taxi Arth, Pilatus Taxi",
    url: "https://www.taxiturlihof.ch/taxi-arth-goldau"
  };

  const highlights = [
    {
      icon: <Train className="w-6 h-6 text-blue-600" />,
      title: "Bahnhof-Service",
      description: "Direkter Transfer zum/vom Bahnhof Arth-Goldau"
    },
    {
      icon: <Mountain className="w-6 h-6 text-green-600" />,
      title: "Berg-Ausflüge", 
      description: "Fahrten zur Rigi-Bahn und Pilatus-Bahn"
    },
    {
      icon: <Car className="w-6 h-6 text-yellow-600" />,
      title: "Lokaler Service",
      description: "Bestens vertraut mit Arth-Goldau und Umgebung"
    }
  ];

  const beliebteZiele = [
    "Bahnhof Arth-Goldau",
    "Rigi Kaltbad", 
    "Goldau Tierpark",
    "Lauerz",
    "Steinen",
    "Sattel",
    "Schwyz Zentrum",
    "Brunnen Hafen"
  ];

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description} 
        keywords={seoData.keywords}
        url={seoData.url}
      />
      
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section 
          className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative z-10">
            <div className="max-w-3xl">
              <Badge className="bg-yellow-600 text-white mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                Servicegebiet Arth-Goldau
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Taxi Service in Arth-Goldau
              </h1>
              
              <p className="text-xl mb-6 text-gray-200">
                Ihr zuverlässiger Taxi-Partner am Fuße der Rigi. Von Bahnhof-Transfers 
                bis hin zu Berg-Ausflügen - wir bringen Sie sicher ans Ziel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => window.location.href = 'tel:+41766113131'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen: 076 611 31 31
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-white"
                  onClick={() => window.location.href = '/preisrechner'}
                >
                  Online Preis berechnen
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Warum Taxi Türlihof in Arth-Goldau?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Als lokaler Anbieter kennen wir Arth-Goldau und die Umgebung wie unsere Westentasche
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      {highlight.icon}
                    </div>
                    <CardTitle>{highlight.title}</CardTitle>
                    <CardDescription>{highlight.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Beliebte Ziele */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Beliebte Fahrziele ab Arth-Goldau
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Ob Bahnhof-Transfer, Berg-Ausflug oder lokale Fahrten - 
                  wir kennen den schnellsten Weg zu Ihrem Ziel.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {beliebteZiele.map((ziel, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-gray-300">{ziel}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button 
                    className="bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={() => window.location.href = '/preisrechner'}
                  >
                    Fahrt nach Arth-Goldau berechnen
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gray-900 border border-gray-800 p-6">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Lokaler Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-300" />
                        <div>
                          <div className="font-medium">Zuverlässig Verfügbar</div>
                          <div className="text-sm text-gray-300">Auch nachts und am Wochenende</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-gray-300" />
                        <div>
                          <div className="font-medium">Mercedes-Flotte</div>
                          <div className="text-sm text-gray-300">Komfort und Sicherheit</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-300" />
                        <div>
                          <div className="font-medium">Ortskenntnis</div>
                          <div className="text-sm text-gray-300">Schnellste Routen</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        076 611 31 31
                      </div>
                      <Button 
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                        onClick={() => window.location.href = 'tel:+41766113131'}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Sofort anrufen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Besonderheiten Arth-Goldau */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Arth-Goldau entdecken
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tor zu den Bergen und wichtiger Verkehrsknotenpunkt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-blue-600" />
                    Bahnhof Arth-Goldau
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Wichtiger Bahnknotenpunkt mit Verbindungen nach Zürich, 
                    Luzern und zur Rigi-Bahn.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-green-600" />
                    Rigi-Ausgangspunkt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Start zur berühmten Rigi-Bahn und zu Wanderungen 
                    auf der "Königin der Berge".
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                    Tierpark Goldau
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Beliebtes Ausflugsziel für Familien mit einheimischen 
                    Tieren in naturnaher Umgebung.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculator CTA */}
        <CompactCalculatorCTA />
      </div>
    </>
  );
};

export default TaxiArthGoldauPage;