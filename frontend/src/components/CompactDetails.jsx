import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Star, CreditCard, MapPin, HelpCircle, Users } from "lucide-react";

const CompactDetails = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      id: 0,
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      title: "Bewertungen & Referenzen",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-2xl font-bold text-gray-900">5.0</span>
              <span className="ml-2 text-gray-600">(39 Bewertungen)</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic mb-2">
                "Sehr pünktlich und freundlich. Perfekter Service!"
              </p>
              <p className="text-xs font-semibold text-gray-900">- Maria S.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic mb-2">
                "Saubere Mercedes-Fahrzeuge und professionelle Fahrer."
              </p>
              <p className="text-xs font-semibold text-gray-900">- Thomas M.</p>
            </div>
          </div>
          
          {/* QR Code for Reviews */}
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg border-2 border-yellow-200 inline-block">
              <h5 className="font-semibold text-gray-900 mb-3">📱 Bewerten Sie uns!</h5>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://google.com/search?q=Taxi+T%C3%BCrlihof&hl=de%23lrd=0x0:0x0,3"
                      alt="QR Code für Google Bewertungen"
                      className="w-20 h-20"
                    />
                  </div>
                  <p className="text-xs text-gray-600">QR-Code scannen</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 mb-1">Schnell bewerten:</p>
                  <p className="text-xs text-gray-600">• QR-Code mit Handy scannen</p>
                  <p className="text-xs text-gray-600">• Google Bewertung abgeben</p>
                  <p className="text-xs text-gray-600">• Anderen Kunden helfen</p>
                </div>
              </div>
              <a 
                href="https://google.com/search?q=Taxi+T%C3%BCrlihof&hl=de#lrd=0x0:0x0,3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Jetzt bewerten
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      title: "Zahlungsmethoden",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Bargeld", icon: "💰" },
            { name: "Kreditkarte", icon: "💳" },
            { name: "TWINT", icon: "📱" },
            { name: "PayPal", icon: "🏦" }
          ].map((method, index) => (
            <div key={index} className="text-center bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl mb-2">{method.icon}</div>
              <p className="text-sm font-medium text-gray-900">{method.name}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 2,
      icon: <MapPin className="w-5 h-5 text-green-600" />,
      title: "Servicegebiete Details",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🌟 Hauptgebiete</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Luzern</span>
                  <span className="text-sm text-gray-600">Altstadt, Bahnhof, KKL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Schwyz</span>
                  <span className="text-sm text-gray-600">Brunnen, Mythenregion</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Zug</span>
                  <span className="text-sm text-gray-600">Bahnhof, Zugersee</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🏔️ Ausflugsziele</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Weggis & Vitznau</span>
                  <span className="text-sm text-gray-600">Rigi-Bahn</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Arth-Goldau</span>
                  <span className="text-sm text-gray-600">Pilatus</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Flughäfen</span>
                  <span className="text-sm text-gray-600">Zürich, Basel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: <HelpCircle className="w-5 h-5 text-purple-600" />,
      title: "Häufige Fragen (FAQ)",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Bietet Taxi Türlihof Zuverlässig Service an?</h5>
            <p className="text-sm text-gray-600">Ja, wir sind rund um die Uhr verfügbar. Rufen Sie uns jederzeit unter 076 611 31 31 an.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Welche Fahrzeuge nutzen Sie?</h5>
            <p className="text-sm text-gray-600">Wir verfügen über eine moderne Mercedes-Flotte: C/E-Klasse, S-Klasse und V-Klasse Vans für bis zu 8 Personen.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Wie teuer ist ein Flughafentransfer?</h5>
            <p className="text-sm text-gray-600">Die Preise variieren je nach Abfahrtsort und Fahrzeugtyp. Kontaktieren Sie uns für ein individuelles Angebot.</p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      icon: <Users className="w-5 h-5 text-orange-600" />,
      title: "Über uns",
      content: (
        <div className="text-center space-y-6">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Taxi Türlihof – Ihr Partner seit 2010</h4>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wir sind ein familiengeführtes Taxi-Unternehmen aus der Zentralschweiz und bieten zuverlässige, 
              professionelle Transportdienstleistungen in der Region Luzern, Schwyz und Zug.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">15+</div>
              <p className="text-sm text-gray-600">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">100%</div>
              <p className="text-sm text-gray-600">Mercedes-Flotte</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">Zuverlässig</div>
              <p className="text-sm text-gray-600">Verfügbarkeit</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Weitere Informationen
          </h2>
          <p className="text-lg text-gray-600">
            Klicken Sie auf einen Bereich, um mehr zu erfahren
          </p>
        </div>

        <div className="space-y-4">
          {accordionItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Button
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-6 bg-white hover:bg-gray-50 text-left flex items-center justify-between border-0 shadow-none"
                variant="ghost"
              >
                <div className="flex items-center">
                  <div className="mr-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <div className="ml-4">
                  {activeAccordion === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </Button>
              
              {activeAccordion === item.id && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="border-t border-gray-200 pt-6">
                    {item.content}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompactDetails;