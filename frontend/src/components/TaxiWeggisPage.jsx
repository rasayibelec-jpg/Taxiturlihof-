import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Phone, Clock, Star, Car, Mountain, Waves } from "lucide-react";
import SEOHead from "./SEOHead";
import CompactCalculatorCTA from "./CompactCalculatorCTA";

const TaxiWeggisPage = () => {
  const seoData = {
    title: "Taxi Weggis & Vitznau | Taxi-Service am Vierwaldstättersee",
    description: "Taxi Service Weggis & Vitznau ✓ Seepromenade Transfers ✓ Rigi-Fahrten ✓ Zuverlässig verfügbar ✓ Mercedes-Flotte ☎️ 076 611 31 31 - Ihr Taxi am See",
    keywords: "Taxi Weggis, Taxi Vitznau, Vierwaldstättersee Taxi, Rigi Taxi Service, Seepromenade Transfer, Mercedes Taxi Weggis, 24h Taxi Vitznau",
    url: "https://www.taxiturlihof.ch/taxi-weggis"
  };

  const highlights = [
    {
      icon: <Waves className="w-6 h-6 text-white" />,
      title: "See-Service",
      description: "Fahrten entlang der malerischen Seepromenade"
    },
    {
      icon: <Mountain className="w-6 h-6 text-white" />,
      title: "Rigi-Zugang", 
      description: "Direkter Transfer zur Rigi-Bahn Vitznau"
    },
    {
      icon: <Car className="w-6 h-6 text-yellow-500" />,
      title: "Lokaler Service",
      description: "Bestens vertraut mit Weggis und Vitznau"
    }
  ];

  const beliebteZiele = [
    "Rigi-Bahn Vitznau",
    "Seepromenade Weggis", 
    "Park Hotel Vitznau",
    "Weggis Zentrum",
    "Vitznau Bahnhof",
    "Gersau",
    "Küssnacht am Rigi",
    "Luzern Bahnhof"
  ];

  const seeAttraktionen = [
    {
      title: "Rigi-Bahn Vitznau",
      description: "Historische Zahnradbahn auf die 'Königin der Berge'",
      icon: <Mountain className="w-5 h-5 text-white" />
    },
    {
      title: "Seepromenade Weggis",
      description: "Wunderschöne Uferpromenade mit Palmen und Seeblick",
      icon: <Waves className="w-5 h-5 text-white" />
    },
    {
      title: "Park Hotel Vitznau",
      description: "Luxushotel direkt am Vierwaldstättersee",
      icon: <Star className="w-5 h-5 text-yellow-500" />
    }
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
          className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
          }}
        >
        </section>

        {/* Service Highlights */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Taxi Service am Vierwaldstättersee
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Der Vierwaldstättersee verbindet Natur, Geschichte und Panorama – von Luzern bis Brunnen.<br/>
                Genießen Sie entspannte Fahrten entlang des Ufers, vorbei an charmanten Dörfern und majestätischen Bergen.<br/>
                Taxi Türlihof – Ihr zuverlässiger Fahrdienst rund um den Vierwaldstättersee.
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

        {/* See-Attraktionen */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Entdecken Sie Weggis & Vitznau
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Perlen am Vierwaldstättersee mit einzigartigen Attraktionen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {seeAttraktionen.map((attraktion, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {attraktion.icon}
                      {attraktion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{attraktion.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Beliebte Ziele */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Beliebte Fahrziele ab Weggis & Vitznau
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Von der romantischen Seepromenade bis zur spektakulären Rigi - 
                  wir kennen alle Wege am Vierwaldstättersee.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {beliebteZiele.map((ziel, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      <span className="text-gray-300">{ziel}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button 
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                    onClick={() => window.location.href = '/preisrechner'}
                  >
                    Fahrt nach Weggis/Vitznau berechnen
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gray-900 border border-gray-800 p-6">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Waves className="w-5 h-5 text-blue-500" />
                      See-Service
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
                          <div className="text-sm text-gray-300">Komfort für Seefahrten</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-300" />
                        <div>
                          <div className="font-medium">Ortskenntnis</div>
                          <div className="text-sm text-gray-300">Schönste Panoramarouten</div>
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

        {/* Panorama Fahrten */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Panorama-Fahrten am Vierwaldstättersee
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Erleben Sie die schönsten Ausblicke während der Fahrt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border border-gray-800 overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1517664604184-9c1d2962d0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                ></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Seestraße Weggis</h3>
                  <p className="text-gray-300 mb-4">
                    Malerische Fahrt entlang der Uferpromenade mit Blick auf die Berge.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/preisrechner'}
                  >
                    Fahrt planen
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border border-gray-800 overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                ></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Rigi-Route Vitznau</h3>
                  <p className="text-gray-300 mb-4">
                    Spektakuläre Fahrt zur historischen Rigi-Bahn mit Bergpanorama.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/preisrechner'}
                  >
                    Fahrt planen
                  </Button>
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

export default TaxiWeggisPage;