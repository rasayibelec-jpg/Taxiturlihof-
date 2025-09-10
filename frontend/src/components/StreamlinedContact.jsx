import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Star, CreditCard, MapPin, HelpCircle, Users } from "lucide-react";

const StreamlinedContact = () => {
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Contact */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kontakt & Service
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            24/7 für Sie erreichbar – rufen Sie uns an oder schreiben Sie uns
          </p>

          {/* Contact Options - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Phone - Prominent */}
            <Card className="p-8 text-center border-2 border-green-200 bg-green-50">
              <div className="bg-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Anrufen</h3>
              <a 
                href="tel:076 611 31 31"
                className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors duration-200 block mb-2"
              >
                076 611 31 31
              </a>
              <p className="text-sm text-gray-600 font-medium">24/7 Service</p>
            </Card>

            {/* Email */}
            <Card className="p-8 text-center border-2 border-blue-200 bg-blue-50">
              <div className="bg-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">E-Mail</h3>
              <a 
                href="mailto:info@taxiturlihof.ch"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 block mb-2"
              >
                info@taxiturlihof.ch
              </a>
              <p className="text-sm text-gray-600">Antwort in 24h</p>
            </Card>

            {/* WhatsApp */}
            <Card className="p-8 text-center border-2 border-yellow-200 bg-yellow-50">
              <div className="bg-yellow-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">WhatsApp</h3>
              <a 
                href="https://wa.me/41766113131"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-yellow-600 hover:text-yellow-700 transition-colors duration-200 block mb-2"
              >
                076 611 31 31
              </a>
              <p className="text-sm text-gray-600">Schnelle Antwort</p>
            </Card>
          </div>
        </div>

        {/* Additional Info - Collapsible */}
        <div className="text-center">
          <Button
            onClick={() => setShowExtraInfo(!showExtraInfo)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 mb-8"
          >
            {showExtraInfo ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Weniger Informationen
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Weitere Informationen
              </>
            )}
          </Button>

          {showExtraInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 animate-in slide-in-from-top-4 duration-300">
              
              {/* Reviews */}
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Bewertungen</h4>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">5.0 (39 Bewertungen)</p>
                  
                  {/* QR Code - Compact */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=https://google.com/search?q=Taxi+T%C3%BCrlihof&hl=de%23lrd=0x0:0x0,3"
                      alt="QR Code"
                      className="w-15 h-15 mx-auto mb-2"
                    />
                    <p className="text-xs text-gray-600">Bewerten</p>
                  </div>
                </div>
              </Card>

              {/* Payment */}
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <CreditCard className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-3">Zahlung</h4>
                  <div className="space-y-2 text-sm">
                    <p>💰 Bargeld</p>
                    <p>💳 Kreditkarte</p>
                    <p>📱 TWINT</p>
                    <p>🏦 PayPal</p>
                  </div>
                </div>
              </Card>

              {/* Service Areas */}
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-3">Servicegebiete</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• Luzern</p>
                    <p>• Schwyz</p>
                    <p>• Zug</p>
                    <p>• Weggis & Vitznau</p>
                    <p>• Brunnen</p>
                    <p>• Arth-Goldau</p>
                  </div>
                </div>
              </Card>

              {/* Fleet */}
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-3">Flotte</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Standard:</strong> 1-4 Pers.</p>
                    <p><strong>Premium:</strong> 1-4 Pers.</p>
                    <p><strong>Van:</strong> bis 8 Pers.</p>
                    <a 
                      href="/flotte" 
                      className="inline-block mt-2 text-purple-600 hover:text-purple-700 font-medium text-xs"
                    >
                      Bilder ansehen →
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Location Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Service-Region: Luzern • Schwyz • Zug
          </p>
          <p className="text-sm text-gray-500">
            Taxi Türlihof – Ihr zuverlässiger Partner seit 2010
          </p>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedContact;