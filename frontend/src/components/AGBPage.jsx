import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, Shield, Clock, AlertCircle } from "lucide-react";
import SEOHead from "./SEOHead";

const AGBPage = () => {
  const seoData = {
    title: "AGB - Allgemeine Geschäftsbedingungen | Taxi Türlihof",
    description: "Allgemeine Geschäftsbedingungen für Taxi-Dienstleistungen von Taxi Türlihof. Buchungsbedingungen, Stornierung und Haftung.",
    keywords: "AGB Taxi Türlihof, Geschäftsbedingungen Taxi, Buchungsbedingungen, Stornierung Taxi, Taxi AGB Schweiz",
    url: "https://www.taxiturlihof.ch/agb"
  };

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
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="bg-yellow-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-yellow-500">
                <FileText className="w-10 h-10 text-yellow-500" />
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Allgemeine Geschäftsbedingungen
              </h1>
              <p className="text-2xl opacity-90 max-w-2xl mx-auto">
                Taxi Türlihof - Transparente Geschäftsbedingungen
              </p>
            </div>
          </div>
        </section>

        {/* AGB Content */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-500" />
                  Geltungsbereich
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Taxi Türlihof bietet professionelle Transportdienstleistungen gemäß den geltenden 
                  gesetzlichen Bestimmungen der Schweiz. Diese Allgemeinen Geschäftsbedingungen (AGB) 
                  regeln das Vertragsverhältnis zwischen Taxi Türlihof und seinen Kunden.
                </p>
              </CardContent>
            </Card>

            {/* Booking Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-500" />
                  Buchungen und Stornierung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Buchungsbedingungen</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Buchungen sind verbindlich. Nach Bestätigung durch Taxi Türlihof kommt ein 
                    Beförderungsvertrag zustande. Wir empfehlen, Buchungen für wichtige Termine 
                    mindestens 24 Stunden im Voraus vorzunehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Stornierungsbedingungen</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Änderungen oder Stornierungen müssen mindestens 24 Stunden im Voraus erfolgen:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Kostenlose Stornierung bis 24 Stunden vor Fahrtbeginn</li>
                    <li>Bei Stornierung innerhalb von 24 Stunden: 50% des Fahrpreises</li>
                    <li>Bei Nichterscheinen (No-Show): 100% des Fahrpreises</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-yellow-500" />
                  Preise und Zahlung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Tarifstruktur</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Preise verstehen sich inkl. MwSt. und basieren auf der aktuellen Tarifstruktur:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Grundtarif: CHF 6.60</li>
                    <li>Pro Kilometer: CHF 4.20</li>
                    <li>Wartezeit: CHF 72.00 pro Stunde</li>
                    <li>Nacht- und Wochenendzuschläge können anfallen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Zahlungsmethoden</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Wir akzeptieren Barzahlung, Kartenzahlung und Online-Zahlung via Stripe. 
                    Bei Online-Buchungen erfolgt die Zahlung per Kreditkarte oder Rechnung.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liability */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                  Haftung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Haftungsausschluss</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Für Verspätungen durch höhere Gewalt (z.B. extreme Wetterbedingungen, Unfälle, 
                    Straßensperrungen) übernehmen wir keine Haftung. Wir empfehlen, bei wichtigen 
                    Terminen ausreichend Zeitpuffer einzuplanen.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Versicherung</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Alle unsere Fahrzeuge sind gemäß den gesetzlichen Bestimmungen versichert. 
                    Die Haftung ist auf die Deckungssummen der Versicherung begrenzt.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-500" />
                  Datenschutz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Datenschutz wird gemäß DSGVO und Schweizer Datenschutzgesetz gewährleistet. 
                  Ihre personenbezogenen Daten werden ausschließlich zur Abwicklung der 
                  Transportdienstleistung verwendet.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Weitere Informationen finden Sie in unserer{" "}
                  <a href="/datenschutz" className="text-yellow-500 hover:text-yellow-600 underline">
                    Datenschutzerklärung
                  </a>.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Fragen zu unseren AGB?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Bei Fragen zu unseren Allgemeinen Geschäftsbedingungen stehen wir Ihnen 
                  gerne zur Verfügung.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:0766113131"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
                  >
                    📞 076 611 31 31
                  </a>
                  <a 
                    href="mailto:rasayibelec@gmail.com"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
                  >
                    ✉️ E-Mail senden
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>Stand: Oktober 2024</p>
              <p>Taxi Türlihof - Alle Rechte vorbehalten</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AGBPage;
