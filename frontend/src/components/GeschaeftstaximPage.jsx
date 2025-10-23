import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Briefcase, Clock, Shield, Star, Calculator, Phone, ArrowRight, CheckCircle } from "lucide-react";
import Breadcrumb from './Breadcrumb';

const GeschaeftstaximPage = () => {

  const businessServices = [
    {
      title: "Executive Transfer",
      description: "Premium Limousinen-Service für Führungskräfte und VIPs",
      icon: Star,
      features: ["Mercedes S-Klasse", "Diskrete Fahrer", "Warteservice", "Rechnung per E-Mail"]
    },
    {
      title: "Airport Business",
      description: "Geschäfts-Flughafentransfer mit Express-Service",
      icon: Clock,
      features: ["Flugverfolgung", "Meet & Greet", "Gepäckservice", "Festpreise"]
    }
  ];

  const vorteile = [
    "Diskrete und professionelle Fahrer",
    "Mercedes Business-Klasse Fahrzeuge", 
    "Zuverlässiger Service auch am Wochenende",
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
      price: "ab CHF 180"
    },
    {
      route: "Schwyz → Bern",
      distance: "85 km", 
      duration: "75 Min",
      price: "ab CHF 300"
    },
    {
      route: "Zug → Basel",
      distance: "95 km",
      duration: "90 Min", 
      price: "ab CHF 350"
    },
    {
      route: "Luzern → Zürich Flughafen",
      distance: "55 km",
      duration: "50 Min",
      price: "ab CHF 250"
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

      <div className="min-h-screen bg-black">
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
                    onClick={() => window.location.href = '/preisrechner'}
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
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Unsere Business Services
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Maßgeschneiderte Lösungen für Ihre geschäftlichen Mobilitätsbedürfnisse
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                      <CardDescription className="text-gray-300">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full mt-4 bg-gray-800 hover:bg-gray-900"
                        onClick={() => window.location.href = '/preisrechner'}
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
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Warum Business Kunden Taxi Türlihof wählen
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Über 500+ Unternehmen vertrauen bereits auf unseren professionellen Service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vorteile.map((vorteil, index) => (
                <Card key={index} className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-300 font-medium">{vorteil}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Preistabelle Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Business Taxi Preisliste
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transparente Festpreise für Ihre Geschäftsfahrten - ohne versteckte Kosten
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-900 border border-gray-800 overflow-hidden shadow-xl">
                <CardHeader className="bg-gray-800 text-white text-center">
                  <CardTitle className="text-2xl">
                    🚗 Business Taxi Preistabelle
                  </CardTitle>
                  <p className="text-gray-300 mt-2">Alle Preise inklusive MwSt. und Anfahrt</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white border-b">
                            Strecke
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white border-b">
                            Preis ab*
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white border-b">
                            Fahrtzeit
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white border-b">
                            Aktion
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {preisbeispiele.map((route, index) => (
                          <tr key={index} className="hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-white">
                              {route.route}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-white">
                              {route.price}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {route.duration}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Button 
                                size="sm"
                                onClick={() => window.location.href = '/preisrechner'}
                                className="bg-gray-800 hover:bg-gray-900 text-white"
                              >
                                Jetzt buchen
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-gray-800 px-6 py-4 text-center">
                    <p className="text-sm text-gray-300">
                      <strong>*</strong> Preise gelten für Standard Business-Fahrzeuge (Mercedes C/E-Klasse). 
                      Premium-Fahrzeuge und Van-Service auf Anfrage. Wartezeit bis 30 Min inklusive.
                    </p>
                    <div className="mt-3 flex justify-center gap-4">
                      <Button 
                        onClick={() => window.location.href = '/preisrechner'}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Preis für andere Strecken berechnen
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = 'tel:+41766113131'}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Sonderpreis anfragen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Removed Firmenkunden Section */}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit für professionelle Geschäftsfahrten?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Buchen Sie jetzt Ihr Business Taxi oder lassen Sie sich zu unserem Corporate Service beraten!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => window.location.href = '/preisrechner'}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Business Fahrt buchen
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-900 text-white hover:bg-gray-900 hover:text-white"
                onClick={() => window.location.href = 'tel:+41766113131'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Business Hotline: 076 611 31 31
              </Button>
            </div>
          </div>
        </section>

        {/* Removed Price Calculator Modal - redirects to /preisrechner instead */}
      </div>
    </>
  );
};

export default GeschaeftstaximPage;