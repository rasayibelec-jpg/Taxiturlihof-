import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Plane, Briefcase, ChevronDown, ChevronUp } from "lucide-react";

const CompactServices = () => {
  const [showDetails, setShowDetails] = useState(false);

  const mainServices = [
    {
      icon: <MapPin className="w-8 h-8 text-yellow-600" />,
      title: "Lokale Fahrten",
      description: "Stadtfahrten in Luzern, Schwyz, Zug",
      shortDesc: "Ab CHF 6.60 Grundtaxe"
    },
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "Flughafentransfer", 
      description: "Zürich & Basel Airport",
      shortDesc: "Preis auf Anfrage"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: "Geschäftsfahrten",
      description: "Termine, Meetings, Events",
      shortDesc: "Zuverlässig & diskret"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Services */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unsere Hauptleistungen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professioneller Taxi-Service für alle Ihre Transportbedürfnisse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {mainServices.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-yellow-200">
              <CardHeader className="pb-4">
                <div className="bg-gray-50 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-yellow-800">
                    {service.shortDesc}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Details Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
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
            <Card className="p-6 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                🚗 Unsere Mercedes-Flotte
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">Standard</p>
                  <p className="text-gray-600">Mercedes C/E-Klasse<br/>1-4 Personen</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Premium</p>
                  <p className="text-gray-600">Mercedes S-Klasse<br/>1-4 Personen</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Van</p>
                  <p className="text-gray-600">Mercedes V-Klasse<br/>bis 8 Personen</p>
                </div>
              </div>
            </Card>

            {/* Pricing Info */}
            <Card className="p-6 bg-yellow-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                💰 Transparente Preise
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grundpreise */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Grundpreise (alle Fahrzeuge)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                      <span>Grundtaxe</span>
                      <span className="font-bold text-yellow-600">CHF 6.60</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                      <span>Wartezeit</span>
                      <span className="font-bold text-orange-600">CHF 73.00</span>
                    </div>
                  </div>
                </div>

                {/* Kilometerpreise */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Pro Kilometer</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                      <span>Standard (C/E-Klasse)</span>
                      <span className="font-bold text-blue-600">CHF 4.20</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                      <span>Premium/Van (S/V-Klasse)</span>
                      <span className="font-bold text-green-600">CHF 5.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spezialfahrten */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Spezielle Services</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Flughafentransfer Zürich</span>
                      <span className="font-bold text-blue-600">auf Anfrage</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Preis abhängig von Abfahrtsort</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Flughafentransfer Basel</span>
                      <span className="font-bold text-blue-600">auf Anfrage</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Preis abhängig von Abfahrtsort</p>
                  </div>
                </div>
              </div>

              {/* Hinweise */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">💡 Wichtige Hinweise:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Alle Preise inkl. MwSt.</li>
                  <li>• Keine Zuschläge für Nachts, Wochenende oder Feiertage</li>
                  <li>• Wartezeit: kostenlos bis 5 Min, danach nach Aufwand</li>
                  <li>• Exakte Preise über Preisrechner oder telefonisch</li>
                </ul>
              </div>
            </Card>

            {/* Service Areas */}
            <Card className="p-6 bg-blue-50">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                📍 Unsere Servicegebiete
              </h3>
              
              {/* Service Area Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1566789168779-73d46d92b809"
                    alt="Luzern Altstadt"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg opacity-60"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-semibold text-sm">Luzern</p>
                  </div>
                </div>
                
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1517664604184-9c1d2962d0a6"
                    alt="Vierwaldstättersee"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg opacity-60"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-semibold text-sm">Vierwaldstättersee</p>
                  </div>
                </div>
                
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1541696724920-864a966cc4c9"
                    alt="Zug am Zugersee"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg opacity-60"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-semibold text-sm">Zug</p>
                  </div>
                </div>
              </div>
              
              {/* Area List */}
              <div className="flex flex-wrap gap-2">
                {["Luzern", "Schwyz", "Zug", "Weggis", "Vitznau", "Brunnen", "Arth-Goldau"].map((area, index) => (
                  <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border">
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompactServices;