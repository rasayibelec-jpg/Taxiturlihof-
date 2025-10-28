import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Eye, Lock, Database, Cookie } from "lucide-react";
import SEOHead from "./SEOHead";

const DatenschutzPage = () => {
  const seoData = {
    title: "Datenschutzerklärung | Taxi Türlihof",
    description: "Datenschutzerklärung von Taxi Türlihof. Informationen zum Umgang mit Ihren personenbezogenen Daten gemäß DSGVO und Schweizer Datenschutzgesetz.",
    keywords: "Datenschutz Taxi Türlihof, DSGVO, Datenschutzerklärung, Privatsphäre, Datensicherheit",
    url: "https://www.taxiturlihof.ch/datenschutz"
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
                <Shield className="w-10 h-10 text-yellow-500" />
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Datenschutzerklärung
              </h1>
              <p className="text-2xl opacity-90 max-w-2xl mx-auto">
                Ihre Privatsphäre ist uns wichtig
              </p>
            </div>
          </div>
        </section>

        {/* Datenschutz Content */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-yellow-500" />
                  Datenschutz auf einen Blick
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir behandeln 
                  Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der 
                  Verarbeitung von personenbezogenen Daten im Rahmen unserer Website und unserer 
                  Dienstleistungen auf.
                </p>
              </CardContent>
            </Card>

            {/* Responsible Party */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-yellow-500" />
                  Verantwortliche Stelle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-white font-semibold">Taxi Türlihof</p>
                  <p className="text-gray-300">Yasar Türlihof</p>
                  <p className="text-gray-300">Türlihofstrasse</p>
                  <p className="text-gray-300">Zentralschweiz, Schweiz</p>
                  <p className="text-gray-300 mt-2">
                    Telefon: <a href="tel:0766113131" className="text-yellow-500 hover:text-yellow-600">076 611 31 31</a>
                  </p>
                  <p className="text-gray-300">
                    E-Mail: <a href="mailto:info@taxiturlihof.ch" className="text-yellow-500 hover:text-yellow-600">info@taxiturlihof.ch</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-yellow-500" />
                  Datenerfassung auf dieser Website
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Welche Daten werden erhoben?</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Wir erheben folgende Daten:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Name und Kontaktdaten (E-Mail, Telefonnummer)</li>
                    <li>Buchungsinformationen (Abholort, Zielort, Datum, Uhrzeit)</li>
                    <li>Zahlungsinformationen (über sichere Zahlungsanbieter)</li>
                    <li>Technische Daten (IP-Adresse, Browser-Typ, Betriebssystem)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Wofür nutzen wir Ihre Daten?</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Ihre Daten werden ausschließlich zur Erbringung unserer Dienstleistungen verwendet:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Durchführung und Abwicklung von Taxifahrten</li>
                    <li>Kommunikation bezüglich Ihrer Buchung</li>
                    <li>Zahlungsabwicklung</li>
                    <li>Verbesserung unserer Dienstleistungen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-yellow-500" />
                  Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem 
                  Endgerät gespeichert werden und die Ihr Browser speichert. Cookies richten auf 
                  Ihrem Rechner keinen Schaden an und enthalten keine Viren.
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Arten von Cookies</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li><strong>Technisch notwendige Cookies:</strong> Für die Funktion der Website erforderlich</li>
                    <li><strong>Analyse-Cookies:</strong> Zur Verbesserung der Website-Nutzung (anonymisiert)</li>
                  </ul>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies 
                  informiert werden und Cookies nur im Einzelfall erlauben.
                </p>
              </CardContent>
            </Card>

            {/* Third Party Services */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Externe Dienstleister</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Google Maps</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Diese Website nutzt Google Maps zur Darstellung von Karten und zur Routenplanung. 
                    Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Stripe (Zahlungsabwicklung)</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Für die Zahlungsabwicklung nutzen wir Stripe. Die Datenübertragung erfolgt 
                    verschlüsselt über SSL/TLS. Stripe ist PCI-DSS Level 1 zertifiziert.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-500" />
                  Ihre Rechte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed mb-2">
                  Sie haben jederzeit das Recht:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
                  <li>Berichtigung unrichtiger Daten zu verlangen</li>
                  <li>Löschung Ihrer Daten zu fordern</li>
                  <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                  <li>Widerspruch gegen die Verarbeitung einzulegen</li>
                  <li>Datenübertragbarkeit zu verlangen</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Bei Fragen wenden Sie sich bitte an: <a href="mailto:datenschutz@taxiturlihof.ch" className="text-yellow-500 hover:text-yellow-600 underline">datenschutz@taxiturlihof.ch</a>
                </p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-yellow-500" />
                  Datensicherheit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure 
                  Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von 
                  Ihrem Browser unterstützt wird.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Unsere Mitarbeiter und alle Personen, die an der Datenverarbeitung beteiligt sind, 
                  sind zur Verschwiegenheit und zur Einhaltung der datenschutzrechtlichen Bestimmungen 
                  verpflichtet.
                </p>
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

export default DatenschutzPage;