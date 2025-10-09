import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Briefcase, Clock, Shield, Star, Calculator, Phone, ArrowRight, CheckCircle, Users, CreditCard } from "lucide-react";
import PriceCalculator from './PriceCalculator';
import Breadcrumb from './Breadcrumb';

const GeschaeftstaximPage = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  const businessServices = [
    {
      title: "Executive Transfer",
      description: "Premium Limousinen-Service für Führungskräfte und VIPs",
      icon: Star,
      features: ["Mercedes S-Klasse", "Diskrete Fahrer", "Warteservice", "Rechnung per E-Mail"]
    },
    {
      title: "Meeting Shuttle", 
      description: "Zuverlässiger Transport zu Geschäftsterminen und Meetings",
      icon: Briefcase,
      features: ["Pünktliche Abholung", "Wartezeit inklusive", "Flexible Termine", "Corporate Rabatte"]
    },
    {
      title: "Airport Business",
      description: "Geschäfts-Flughafentransfer mit Express-Service",
      icon: Clock,
      features: ["Flugverfolgung", "Meet & Greet", "Gepäckservice", "Festpreise"]
    },
    {
      title: "Firmen-Account",
      description: "Monatliche Abrechnung für Unternehmen",
      icon: CreditCard,
      features: ["Sammelrechnung", "Online Reporting", "Mitarbeiter-Accounts", "Kostenstellen"]
    }
  ];

  const vorteile = [
    "Diskrete und professionelle Fahrer",
    "Mercedes Business-Klasse Fahrzeuge", 
    "24/7 Verfügbarkeit auch am Wochenende",
    "Rechnung mit ausgewiesener MwSt.",
    "Firmen-Accounts mit monatlicher Abrechnung",
    "Wartezeiten ohne Aufpreis (bis 30 Min)",
    "Kostenlose Stornierung bis 2h vorher",
    "Schweizweite Fahrten möglich"
  ];

  const preisbeispiele = [
    {
      route: "Luzern → Zürich City",
      distance: "50 km",
      duration: "45 Min",
      price: "CHF 180"
    },
    {
      route: "Schwyz → Bern",
      distance: "85 km", 
      duration: "75 Min",
      price: "CHF 300"
    },
    {
      route: "Zug → Basel",
      distance: "95 km",
      duration: "90 Min", 
      price: "CHF 350"
    },
    {
      route: "Luzern → Zürich Flughafen",
      distance: "55 km",
      duration: "50 Min",
      price: "CHF 250"
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Geschäftstaxi' }
  ];

  return (
    <>
      <Helmet>
        <title>Business Taxi & Geschäftstaxi Luzern | Taxi Türlihof</title>
        <meta name="description" content="Professionelles Business Taxi in Luzern, Schwyz, Zug. Mercedes-Geschäftstaxi für Meetings, Flughafentransfer, Executive Service. Firmen-Account verfügbar!" />
        <meta name="keywords" content="Business Taxi Luzern, Geschäftstaxi Schwyz, Executive Transfer Zug, Firmenwagen mieten, Meeting Transport, Business Flughafentransfer" />
        <link rel="canonical" href="https://www.taxiturlihof.ch/geschaeftsfahrten" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Premium Business Service
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Business Taxi & Geschäftstaxi
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                  Professioneller Geschäftstransport in der Zentralschweiz. 
                  Diskret, pünktlich und komfortabel für Ihre geschäftlichen Termine.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={() => setShowCalculator(true)}
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Business Fahrt buchen
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-800"
                    onClick={() => window.location.href = 'tel:+41766113131'}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Business Hotline: 076 611 31 31
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Business Preisbeispiele</h3>
                  
                  <div className="space-y-4">
                    {preisbeispiele.map((beispiel, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-semibold">{beispiel.route}</div>
                          <div className="text-yellow-300 font-bold text-lg">{beispiel.price}</div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>{beispiel.distance}</span>
                          <span>{beispiel.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-300">
                      * Preise inkl. MwSt., zzgl. Wartezeit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unsere Business Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Maßgeschneiderte Lösungen für Ihre geschäftlichen Mobilitätsbedürfnisse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <IconComponent className="w-6 h-6 text-gray-800" />
                        </div>
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full mt-4 bg-gray-800 hover:bg-gray-900"
                        onClick={() => setShowCalculator(true)}
                      >
                        {service.title} buchen
                        <ArrowRight className="w-4 h-4 ml-2" />
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
                Warum Business Kunden Taxi Türlihof wählen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Über 500+ Unternehmen vertrauen bereits auf unseren professionellen Service
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

        {/* Firmenkunden Section */}
        <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Firmen-Account einrichten
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Optimieren Sie Ihre Geschäftsreisen mit unserem Corporate Service
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="border-none shadow-xl">
                  <CardHeader className="bg-gray-800 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Corporate Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <strong>Monatliche Sammelrechnung</strong>
                          <p className="text-sm text-gray-600">Alle Fahrten auf einer übersichtlichen Rechnung</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <strong>Online Fahrtenbuch</strong>
                          <p className="text-sm text-gray-600">Digitale Übersicht aller Geschäftsfahrten</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <strong>Mitarbeiter-Accounts</strong>
                          <p className="text-sm text-gray-600">Individuelle Zugänge für Ihre Team-Mitglieder</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <strong>Corporate Rabatte</strong>
                          <p className="text-sm text-gray-600">Attraktive Mengenrabatte ab 10 Fahrten/Monat</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Kostenlosen Firmen-Account beantragen
                </h3>
                <p className="text-gray-600 mb-8">
                  Vereinfachen Sie Ihre Geschäftsfahrten und profitieren Sie von unserem 
                  Corporate Service. Kostenlose Einrichtung und keine Grundgebühren.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                    onClick={() => window.location.href = 'mailto:info@taxiturlihof.ch?subject=Firmen-Account Anfrage'}
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    Firmen-Account beantragen
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = 'tel:+41766113131'}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Beratung anfordern: 076 611 31 31
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bereit für professionelle Geschäftsfahrten?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Buchen Sie jetzt Ihr Business Taxi oder lassen Sie sich zu unserem Corporate Service beraten!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => setShowCalculator(true)}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Business Fahrt buchen
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                onClick={() => window.location.href = 'tel:+41766113131'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Business Hotline: 076 611 31 31
              </Button>
            </div>
          </div>
        </section>

        {/* Price Calculator Modal/Section */}
        {showCalculator && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Business Taxi Preisrechner
                </h2>
                <p className="text-gray-600">
                  Berechnen Sie sofort den Preis für Ihre Geschäftsfahrt
                </p>
              </div>
              <PriceCalculator />
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default GeschaeftstaximPage;