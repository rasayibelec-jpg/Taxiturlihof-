import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Camera, Mountain, Plane } from "lucide-react";
import SEOHead from "./SEOHead";
import Breadcrumb from "./Breadcrumb";

const BlogLuzernSehenswuerdigkeiten = () => {
  // SEO-optimized structured data for Blog Article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Die 10 besten Sehenswürdigkeiten in Luzern - Ihr Taxi-Guide 2025",
    "description": "Entdecken Sie Luzerns Top-Sehenswürdigkeiten mit unserem Mercedes-Taxi-Service. Kapellbrücke, KKL, Pilatus und mehr - bequem und komfortabel erreichen.",
    "author": {
      "@type": "Organization",
      "name": "Taxi Türlihof"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Taxi Türlihof",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.taxiturlihof.ch/logo.png"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15",
    "mainEntityOfPage": "https://www.taxiturlihof.ch/blog/luzern-sehenswuerdigkeiten",
    "image": "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/lxvw2ugl_Notes_250207_194337_224.jpg",
    "articleSection": "Tourismus",
    "keywords": "Luzern Sehenswürdigkeiten, Kapellbrücke, KKL Luzern, Pilatus, Taxi Luzern, Mercedes Taxi, Luzern Tourismus"
  };

  const sehenswuerdigkeiten = [
    {
      name: "Kapellbrücke & Wasserturm",
      description: "Das Wahrzeichen von Luzern - die älteste überdachte Holzbrücke Europas",
      taxiInfo: "5 Min vom Bahnhof • Fotostopp inklusive",
      highlights: ["Historische Giebelbilder", "Wasserturm Museum", "Perfekte Fotomotive"],
      category: "Historisch",
      duration: "30-45 Min",
      address: "Kapellbrücke, 6002 Luzern"
    },
    {
      name: "KKL Luzern (Kultur- und Kongresszentrum)",
      description: "Architektonisches Meisterwerk von Jean Nouvel am Vierwaldstättersee",
      taxiInfo: "Direkt vor dem Haupteingang • Parkplatz verfügbar",
      highlights: ["Konzerte & Events", "Kunstmuseum", "See-Panorama"],
      category: "Kultur",
      duration: "1-3 Stunden",
      address: "Europaplatz 1, 6005 Luzern"
    },
    {
      name: "Löwendenkmal",
      description: "Das 'traurigste und bewegendste Stück Stein der Welt' - Mark Twain",
      taxiInfo: "10 Min Fahrt • Parkplatz nearby",
      highlights: ["Historisches Denkmal", "Park-Umgebung", "Schweizer Geschichte"],
      category: "Historisch", 
      duration: "20-30 Min",
      address: "Denkmalstrasse 4, 6002 Luzern"
    },
    {
      name: "Pilatus Bergbahn",
      description: "Die steilste Zahnradbahn der Welt - atemberaubende Aussicht garantiert",
      taxiInfo: "20 Min nach Alpnachstad • Return-Service möglich",
      highlights: ["Weltrekord-Zahnradbahn", "2132m Höhe", "360° Panorama"],
      category: "Natur",
      duration: "Halber Tag",
      address: "Alpnachstad, 6053 Alpnach Dorf"
    },
    {
      name: "Museggmauer & Türme",
      description: "Mittelalterliche Stadtmauer mit 9 Türmen - einzigartige Stadtaussicht",
      taxiInfo: "15 Min Fahrt • Parkplatz am Fuss der Mauer",
      highlights: ["Mittelalterliche Architektur", "Stadtpanorama", "Historische Türme"],
      category: "Historisch",
      duration: "45-60 Min", 
      address: "Museggmauer, 6004 Luzern"
    },
    {
      name: "Vierwaldstättersee",
      description: "Kristallklarer Bergsee mit Dampfschifffahrten und Bergpanorama",
      taxiInfo: "Verschiedene Anlegestellen • Schiff-Taxi Kombination",
      highlights: ["Dampfschifffahrt", "Bergpanorama", "Seeufer-Spaziergang"],
      category: "Natur",
      duration: "2-4 Stunden",
      address: "Bahnhofquai, 6002 Luzern"
    },
    {
      name: "Verkehrshaus der Schweiz",
      description: "Das beliebteste Museum der Schweiz - Technik zum Anfassen",
      taxiInfo: "10 Min Fahrt • Direkter Drop-off möglich",
      highlights: ["Interaktive Ausstellungen", "IMAX Kino", "Planetarium"],
      category: "Museum",
      duration: "3-5 Stunden",
      address: "Lidostrasse 5, 6006 Luzern"
    },
    {
      name: "Rigi - Königin der Berge", 
      description: "Sonnenaufgang-Berg mit Europas erster Bergbahn",
      taxiInfo: "25 Min nach Vitznau • Bergbahn-Transfer verfügbar",
      highlights: ["Sonnenaufgang-Touren", "Historische Bergbahn", "Wellness & Spa"],
      category: "Natur",
      duration: "Halber bis ganzer Tag",
      address: "Vitznau, 6354 Vitznau"
    },
    {
      name: "Altstadt Luzern",
      description: "Malerische Gassen mit historischen Häusern und Shopping-Möglichkeiten",
      taxiInfo: "Zentral gelegen • Mehrere Drop-off Punkte",
      highlights: ["Historische Häuser", "Shopping", "Restaurants & Cafés"],
      category: "Kultur",
      duration: "2-3 Stunden",
      address: "Altstadt, 6002 Luzern"
    },
    {
      name: "Bourbaki Panorama",
      description: "Rundbild aus dem Jahr 1881 - beeindruckendes 360° Erlebnis",
      taxiInfo: "5 Min vom Bahnhof • Kurzer Fußweg",
      highlights: ["360° Rundbild", "Historisches Erlebnis", "Audioguide"],
      category: "Museum",
      duration: "45-60 Min",
      address: "Löwenplatz 11, 6004 Luzern"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Die 10 besten Sehenswürdigkeiten in Luzern - Taxi-Guide 2025"
        description="🏰 Luzern Sehenswürdigkeiten Guide ➤ Kapellbrücke, KKL, Pilatus, Rigi ➤ Mit Mercedes-Taxi bequem erreichen ➤ Insider-Tipps & optimale Routen ☎️ 076 611 31 31"
        keywords="Luzern Sehenswürdigkeiten, Kapellbrücke Luzern, KKL Luzern, Pilatus Bergbahn, Rigi Königin der Berge, Taxi Luzern Tourismus, Mercedes Taxi Sightseeing, Luzern Altstadt, Vierwaldstättersee, Verkehrshaus"
        url="https://www.taxiturlihof.ch/blog/luzern-sehenswuerdigkeiten"
        type="article"
        structuredData={structuredData}
      />
      
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Die 10 besten Sehenswürdigkeiten in Luzern
            </h1>
            <p className="text-2xl mb-4 opacity-90">
              Ihr kompletter Sightseeing-Guide mit Mercedes-Taxi-Service 2025
            </p>
            <p className="text-xl mb-8 opacity-80">
              Entdecken Sie Luzerns Highlights bequem und komfortabel - von der Kapellbrücke bis zum Pilatus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
              >
                <Phone className="w-6 h-6" />
                <span>Sightseeing-Tour buchen</span>
              </a>
              <a 
                href="#sehenswuerdigkeiten" 
                className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
              >
                <Camera className="w-6 h-6" />
                <span>Guide entdecken</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Luzern entdecken - bequem mit dem Mercedes-Taxi
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Luzern ist zweifellos eine der schönsten Städte der Schweiz und ein absolutes Must-See für jeden Besucher der Zentralschweiz. 
                Mit seiner malerischen Lage am Vierwaldstättersee, umgeben von imposanten Bergen und einer charmanten Altstadt, 
                bietet Luzern eine einzigartige Mischung aus Kultur, Geschichte und Natur.
              </p>
              <p>
                Als <strong>lokaler Taxi-Service</strong> kennen wir jeden Winkel von Luzern und bringen Sie bequem zu allen Sehenswürdigkeiten. 
                Vergessen Sie Parkplatzsuche und Orientierungsprobleme - wir kümmern uns um den Transport, 
                während Sie sich auf das Erleben und Genießen konzentrieren können.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                <h3 className="font-semibold text-blue-800 mb-2">💡 Unser Sightseeing-Service:</h3>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Mercedes-Komfort für entspannte Fahrten</li>
                  <li>• Lokale Fahrer mit Insider-Wissen</li>
                  <li>• Flexible Stopps und Fotopausen</li>
                  <li>• Optimale Routen ohne Verkehrsstress</li>
                  <li>• Kombinierbar mit Flughafentransfer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sehenswürdigkeiten List */}
      <section id="sehenswuerdigkeiten" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top 10 Luzern Sehenswürdigkeiten im Detail
            </h2>
            <p className="text-xl text-gray-600">
              Alle Highlights mit Taxi-Service-Informationen und Insider-Tipps
            </p>
          </div>

          <div className="space-y-8">
            {sehenswuerdigkeiten.map((attraction, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <CardTitle className="text-2xl text-gray-900">{attraction.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`${
                            attraction.category === 'Historisch' ? 'border-amber-300 text-amber-700' :
                            attraction.category === 'Kultur' ? 'border-purple-300 text-purple-700' :
                            attraction.category === 'Natur' ? 'border-green-300 text-green-700' :
                            'border-blue-300 text-blue-700'
                          }`}
                        >
                          {attraction.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-lg text-gray-600">
                        {attraction.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                        <ul className="text-gray-700 space-y-1">
                          {attraction.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Besuchsdauer: {attraction.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{attraction.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Taxi Service Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <Car className="w-5 h-5 mr-2" />
                        Mit Taxi Türlihof:
                      </h4>
                      <p className="text-blue-700 text-sm mb-3">{attraction.taxiInfo}</p>
                      <div className="space-y-2">
                        <a 
                          href="tel:076 611 31 31"
                          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200"
                        >
                          📞 Jetzt Fahrt buchen
                        </a>
                        <p className="text-xs text-blue-600 text-center">
                          Sofort verfügbar • Mercedes-Komfort
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sightseeing Tours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Empfohlene Sightseeing-Touren
            </h2>
            <p className="text-xl text-gray-600">
              Optimierte Routen für verschiedene Interessen und Zeitbudgets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-amber-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Camera className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Klassik-Tour (3 Stunden)</CardTitle>
                <CardDescription>Perfekt für Erstbesucher</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2 mb-4">
                  <li>• Kapellbrücke & Wasserturm</li>
                  <li>• KKL Luzern</li>
                  <li>• Löwendenkmal</li>
                  <li>• Altstadt-Rundgang</li>
                  <li>• Seeufer-Panorama</li>
                </ul>
                <div className="text-2xl font-bold text-amber-600 mb-2">CHF 180</div>
                <p className="text-xs text-gray-500">Inkl. Fotostopps & Wartezeiten</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-blue-200 border-2">
              <CardHeader>
                <Badge className="bg-blue-100 text-blue-800 mb-2">Beliebt</Badge>
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Berg & See (6 Stunden)</CardTitle>
                <CardDescription>Das Beste aus zwei Welten</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2 mb-4">
                  <li>• Alle Klassik-Tour Highlights</li>
                  <li>• Pilatus Bergbahn (optional)</li>
                  <li>• Vierwaldstättersee-Fahrt</li>
                  <li>• Vitznau oder Weggis</li>
                  <li>• Mittagspause inklusive</li>
                </ul>
                <div className="text-2xl font-bold text-blue-600 mb-2">CHF 350</div>
                <p className="text-xs text-gray-500">Bergbahn-Tickets extra</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Plane className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Airport-Kombi (4 Stunden)</CardTitle>
                <CardDescription>Sightseeing + Flughafentransfer</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2 mb-4">
                  <li>• Abholung Hotel/Bahnhof</li>
                  <li>• 2h Luzern Highlights</li>
                  <li>• Kapellbrücke & KKL</li>
                  <li>• Transfer Flughafen Zürich</li>
                  <li>• Gepäck-Service</li>
                </ul>
                <div className="text-2xl font-bold text-green-600 mb-2">CHF 420</div>
                <p className="text-xs text-gray-500">Perfekt vor dem Abflug</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insider Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Insider-Tipps für Ihren Luzern-Besuch
            </h2>
            <p className="text-xl text-gray-600">
              Geheimtipps von unseren erfahrenen Taxi-Fahrern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⏰ Beste Besuchszeiten</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><strong>Kapellbrücke:</strong> Früh morgens (8-9 Uhr) für weniger Touristen</li>
                <li><strong>Pilatus:</strong> Bei klarem Wetter - wir checken täglich die Webcams</li>
                <li><strong>KKL:</strong> Abends bei Beleuchtung besonders schön</li>
                <li><strong>Verkehrshaus:</strong> Wochentags weniger überfüllt</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📸 Beste Fotospots</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><strong>Kapellbrücke:</strong> Vom Reuss-Ufer (südliche Seite)</li>
                <li><strong>Stadtpanorama:</strong> Von der Museggmauer</li>
                <li><strong>KKL:</strong> Vom Europaplatz mit See im Hintergrund</li>
                <li><strong>Pilatus:</strong> Sonnenaufgang-Touren möglich (auf Anfrage)</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🍽️ Restaurant-Empfehlungen</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><strong>Balances:</strong> Fine Dining mit Seeblick</li>
                <li><strong>Rathaus Brauerei:</strong> Traditionell schweizer Küche</li>
                <li><strong>Restaurant Pfistern:</strong> Günstig und authentisch</li>
                <li><strong>Café de Ville:</strong> Bester Kaffee der Altstadt</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💡 Spar-Tipps</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><strong>Tell-Pass:</strong> Kombiniert öffentliche Verkehrsmittel + Bergbahnen</li>
                <li><strong>Museum Pass:</strong> Mehrere Museen zum Fixpreis</li>
                <li><strong>Taxi-Kombi:</strong> Mehrere Ziele kombiniert = günstiger</li>
                <li><strong>Gruppe:</strong> Mercedes V-Klasse ab 5 Personen wirtschaftlicher</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bereit für Ihre Luzern-Entdeckungsreise?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Lassen Sie sich von unseren Mercedes-Taxis zu allen Highlights bringen - 
            entspannt, bequem und mit lokalem Insider-Wissen!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Sightseeing-Tour buchen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Car className="w-6 h-6" />
              <span>Online Buchen</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-blue-400 opacity-75">
            <div className="text-center">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm">Top-Sehenswürdigkeiten</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Zuverlässig</div>
              <div className="text-sm">Service verfügbar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Mercedes</div>
              <div className="text-sm">Komfort garantiert</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Lokal</div>
              <div className="text-sm">Insider-Wissen</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogLuzernSehenswuerdigkeiten;