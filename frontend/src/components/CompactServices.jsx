import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Plane, Briefcase, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const CompactServices = () => {
  const [showDetails, setShowDetails] = useState(false);

  const mainServices = [
    {
      icon: <MapPin className="w-8 h-8 text-yellow-600" />,
      title: "Lokale Fahrten",
      description: "Stadtfahrten in Luzern, Schwyz, Zug",
      shortDesc: "Ab CHF 6.60 Grundtaxe",
      backgroundImage: "https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "Flughafentransfer", 
      description: "Zürich & Basel Airport",
      shortDesc: "Preis auf Anfrage",
      backgroundImage: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: "Geschäftsfahrten",
      description: "Termine, Meetings, Events",
      shortDesc: "Zuverlässig & diskret",
      backgroundImage: "https://images.unsplash.com/photo-1647281194826-11459827b123?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <section className="py-12 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Services */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Unsere Hauptleistungen
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professioneller Taxi-Service für alle Ihre Transportbedürfnisse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {mainServices.map((service, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-xl transition-all duration-300 border-0 hover:border-2 hover:border-yellow-400 overflow-hidden relative group"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${service.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/60 group-hover:via-black/20 group-hover:to-black/5 transition-all duration-300"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="relative z-10">
                <CardHeader className="pb-4">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:bg-white/95 transition-all duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-white drop-shadow-lg">
                    {service.title}
                  </CardTitle>
                  <p className="text-white/90 drop-shadow-md font-medium">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-yellow-300/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-sm font-bold text-black drop-shadow-sm">
                      {service.shortDesc}
                    </span>
                  </div>
                  
                  {/* Service-specific buttons */}
                  <div className="flex flex-col gap-2">
                    {index === 0 && ( // Lokale Fahrten
                      <div className="flex gap-1">
                        <Link to="/taxi-luzern" className="flex-1">
                          <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                            Luzern
                          </Button>
                        </Link>
                        <Link to="/taxi-zug" className="flex-1">
                          <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                            Zug
                          </Button>
                        </Link>
                      </div>
                    )}
                    
                    {index === 1 && ( // Flughafentransfer
                      <Link to="/flughafentransfer" className="w-full">
                        <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                          <Plane className="w-4 h-4 mr-1" />
                          Jetzt buchen
                        </Button>
                      </Link>
                    )}
                    
                    {index === 2 && ( // Geschäftsfahrten
                      <Link to="/geschaeftsfahrten" className="w-full">
                        <Button size="sm" className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                          <Briefcase className="w-4 h-4 mr-1" />
                          Business buchen
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* More Details Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            className="border-gray-300 text-gray-900 hover:bg-gray-100 bg-white"
          >
            {showDetails ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Weniger anzeigen
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Mehr erfahren
              </>
            )}
          </Button>
        </div>

        {/* Detailed Information - Collapsible */}
        {showDetails && (
          <div className="mt-12 space-y-8 animate-in slide-in-from-top-4 duration-300">
            
            {/* Fleet Info */}
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                🚗 Unsere Mercedes-Flotte
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-yellow-400">Standard</p>
                  <p className="text-gray-300">Mercedes C/E-Klasse<br/>1-4 Personen</p>
                </div>
                <div>
                  <p className="font-semibold text-yellow-400">Premium</p>
                  <p className="text-gray-300">Mercedes S-Klasse<br/>1-4 Personen</p>
                </div>
                <div>
                  <p className="font-semibold text-yellow-400">Van</p>
                  <p className="text-gray-300">Mercedes V-Klasse<br/>bis 8 Personen</p>
                </div>
              </div>
            </Card>

            {/* Pricing Info */}
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                💰 Transparente Preise
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grundpreise */}
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">Grundpreise (alle Fahrzeuge)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                      <span className="text-gray-200">Grundtaxe</span>
                      <span className="font-bold text-yellow-400">CHF 6.60</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                      <span className="text-gray-200">Wartezeit</span>
                      <span className="font-bold text-orange-400">CHF 73.00</span>
                    </div>
                  </div>
                </div>

                {/* Kilometerpreise */}
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">Pro Kilometer</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                      <span className="text-gray-200">Standard (C/E-Klasse)</span>
                      <span className="font-bold text-blue-400">CHF 4.20</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                      <span className="text-gray-200">Premium/Van (S/V-Klasse)</span>
                      <span className="font-bold text-green-400">CHF 5.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spezialfahrten */}
              <div className="mt-6">
                <h4 className="font-semibold text-yellow-400 mb-3">Spezielle Services</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-900/50 p-3 rounded-lg border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-200">Flughafentransfer Zürich</span>
                      <a 
                        href="tel:0766113131" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors duration-200"
                      >
                        📞 Anrufen
                      </a>
                    </div>
                    <p className="text-xs text-gray-400">Preis abhängig von Abfahrtsort - auf Anfrage</p>
                  </div>
                  
                  <div className="bg-blue-900/50 p-3 rounded-lg border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-200">Flughafentransfer Basel</span>
                      <a 
                        href="tel:0766113131" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors duration-200"
                      >
                        📞 Anrufen
                      </a>
                    </div>
                    <p className="text-xs text-gray-400">Preis abhängig von Abfahrtsort - auf Anfrage</p>
                  </div>
                </div>
              </div>

              {/* Hinweise */}
              <div className="mt-6 p-4 bg-gray-900/70 rounded-lg border border-gray-700">
                <h5 className="font-semibold text-yellow-400 mb-2">💡 Wichtige Hinweise:</h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Alle Preise inkl. MwSt.</li>
                  <li>• Keine Zuschläge für Nachts, Wochenende oder Feiertage</li>
                  <li>• Wartezeit: CHF 73.00 pro Stunde</li>
                  <li>• Exakte Preise über Preisrechner oder telefonisch</li>
                </ul>
              </div>
            </Card>

            {/* Alte Servicegebiete-Sektion entfernt */}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompactServices;