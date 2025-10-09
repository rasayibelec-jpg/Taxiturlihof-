import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Package, Clock, Shield, Truck, Calculator, Phone, ArrowRight, CheckCircle, FileText, MapPin } from "lucide-react";
import PriceCalculator from './PriceCalculator';
import Breadcrumb from './Breadcrumb';

const KurierfahrtenPage = () => {

  const kurierServices = [
    {
      title: "Eilkurier Same Day",
      description: "Expressversand am gleichen Tag - innerhalb von 2-4 Stunden",
      icon: Clock,
      features: ["Abholung innerhalb 30 Min", "Direkttransport", "SMS-Tracking", "Zustellnachweis"],
      preis: "Preis auf Anfrage"
    },
    {
      title: "Dokumentenkurier", 
      description: "Sichere Übertragung wichtiger Geschäftsdokumente",
      icon: FileText,
      features: ["Rechtssichere Zustellung", "Einschreiben-Ersatz", "Empfangsbestätigung", "Versicherung inkl."],
      preis: "Preis auf Anfrage"
    },
    {
      title: "Paket Express",
      description: "Schneller Versand von Paketen bis 30kg in der Zentralschweiz",
      icon: Package,
      features: ["Bis 30kg Gewicht", "Handling inklusive", "Foto-Nachweis", "Bis 60x40x40cm"],
      preis: "Preis auf Anfrage"
    },
    {
      title: "Medizin Kurier",
      description: "Spezialtransport für Medikamente und medizinische Proben", 
      icon: Shield,
      features: ["Kühlkette möglich", "Diskreter Transport", "24/7 Service", "Zertifizierte Fahrer"],
      preis: "Preis auf Anfrage"
    }
  ];

  const preisInfo = {
    title: "Individuelle Preisgestaltung",
    description: "Jeder Kurierauftrag ist einzigartig. Unsere Preise richten sich nach:",
    factors: [
      "Entfernung und Fahrtzeit",
      "Eiligkeit der Sendung", 
      "Gewicht und Größe",
      "Spezielle Anforderungen (Kühlkette, etc.)",
      "Tageszeit und Wochentag",
      "Versicherungswert"
    ]
  };

  const vorteile = [
    "Express-Abholung innerhalb 30 Minuten",
    "Live-Tracking per SMS und WhatsApp", 
    "Zustellnachweis mit Foto und Unterschrift",
    "Versicherung bis CHF 1'000 inklusive",
    "24/7 Service auch an Wochenenden",
    "Rechtssichere Dokumentenübertragung",
    "Kühlketten-Transport möglich",
    "Schweizweite Zustellung"
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Kurierfahrten' }
  ];

  return (
    <>
      <Helmet>
        <title>Kurier & Expressdienst Luzern Schwyz Zug | Taxi Türlihof</title>
        <meta name="description" content="Schneller Kurierdienst in Luzern, Schwyz, Zug. Same-Day Expressversand, Dokumentenkurier, Medizin-Transport. 24/7 Service mit Live-Tracking!" />
        <meta name="keywords" content="Kurier Luzern, Expressdienst Schwyz, Same Day Delivery Zug, Dokumentenkurier, Medizin Transport, Eilkurier Zentralschweiz" />
        <link rel="canonical" href="https://www.taxiturlihof.ch/kurierfahrten" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6">
                  <Package className="w-4 h-4 mr-2" />
                  Express Kurierdienst
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Kurier & Expressdienst
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Schnell, sicher und zuverlässig - Ihr Kurierdienst in der Zentralschweiz. 
                  Same-Day Delivery mit Live-Tracking und Zustellnachweis.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={() => window.location.href = 'tel:+41766113131'}
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Kurier anfragen
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                    onClick={() => window.location.href = 'tel:+41766113131'}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Express Hotline: 076 611 31 31
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">{preisInfo.title}</h3>
                  
                  <div className="text-center mb-6">
                    <div className="bg-yellow-300/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg inline-block">
                      <span className="text-xl font-bold text-black">
                        💰 Preis auf Anfrage
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-blue-100 mb-4 text-center">{preisInfo.description}</p>
                  
                  <div className="space-y-3">
                    {preisInfo.factors.map((factor, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-3 flex items-center">
                        <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-black font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-white font-medium">{factor}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button 
                      size="lg"
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      onClick={() => window.location.href = 'tel:+41766113131'}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Kostenvoranschlag anfordern
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kurier Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unsere Kurier-Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professionelle Kurierdienste für jeden Bedarf - von Eilsendungen bis Spezial-Transport
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kurierServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-3">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          {service.title}
                        </CardTitle>
                        <Badge className="bg-yellow-100 text-yellow-800 font-bold">
                          {service.preis}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.location.href = 'tel:+41766113131'}
                      >
                        {service.title} anfragen
                        <Phone className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vorteile Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Warum Taxi Türlihof als Kurierdienst?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Über 2000+ erfolgreich zugestellte Sendungen sprechen für unsere Zuverlässigkeit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vorteile.map((vorteil, index) => (
                <Card key={index} className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 font-medium">{vorteil}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking & Process Section */}
        <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                So einfach funktioniert unser Kurierdienst
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">1. Auftrag erteilen</h3>
                  <p className="text-gray-600 text-sm">
                    Anruf, WhatsApp oder Online - wir sind sofort erreichbar
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">2. Abholung</h3>
                  <p className="text-gray-600 text-sm">
                    Express-Abholung innerhalb von 30 Minuten
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">3. Transport</h3>
                  <p className="text-gray-600 text-sm">
                    Live-Tracking per SMS - Sie wissen immer wo Ihre Sendung ist
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">4. Zustellung</h3>
                  <p className="text-gray-600 text-sm">
                    Zustellnachweis mit Foto und Unterschrift per WhatsApp
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benötigen Sie einen Express-Kurier?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Beauftragen Sie jetzt unseren Kurierdienst - Abholung innerhalb 30 Minuten garantiert!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => window.location.href = 'tel:+41766113131'}
              >
                <Package className="w-5 h-5 mr-2" />
                Kurier anfragen
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                onClick={() => window.location.href = 'tel:+41766113131'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Express Hotline: 076 611 31 31
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-800 font-medium">
                WhatsApp Express: 
                <a 
                  href="https://wa.me/41766113131" 
                  className="ml-2 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  076 611 31 31
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Removed Price Calculator - all prices on request */}
      </div>
    </>
  );
};

export default KurierfahrtenPage;