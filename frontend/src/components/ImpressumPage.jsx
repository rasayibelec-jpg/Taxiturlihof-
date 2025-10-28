import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, Phone, Mail, MapPin, FileText } from "lucide-react";
import SEOHead from "./SEOHead";

const ImpressumPage = () => {
  const seoData = {
    title: "Impressum | Taxi Türlihof - Kontaktdaten und Angaben",
    description: "Impressum von Taxi Türlihof. Alle gesetzlich erforderlichen Angaben zum Unternehmen und Kontaktinformationen.",
    keywords: "Impressum Taxi Türlihof, Kontakt, Unternehmensdaten, Taxi Schweiz",
    url: "https://www.taxiturlihof.ch/impressum"
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
                <Building2 className="w-10 h-10 text-yellow-500" />
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Impressum
              </h1>
              <p className="text-2xl opacity-90 max-w-2xl mx-auto">
                Angaben gemäß Schweizer Recht
              </p>
            </div>
          </div>
        </section>

        {/* Impressum Content */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Company Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-yellow-500" />
                  Angaben zum Unternehmen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Firmenname</h3>
                  <p className="text-gray-300">Taxi Türlihof</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Inhaber</h3>
                  <p className="text-gray-300">Yaşar Çelebi</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Adresse</h3>
                  <p className="text-gray-300">
                    Zentralschweiz<br />
                    Schweiz
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-yellow-500" />
                  Kontakt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Telefon</h3>
                    <a href="tel:0766113131" className="text-yellow-500 hover:text-yellow-600">
                      076 611 31 31
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">E-Mail</h3>
                    <a href="mailto:info@taxiturlihof.ch" className="text-yellow-500 hover:text-yellow-600">
                      info@taxiturlihof.ch
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Servicegebiet</h3>
                    <p className="text-gray-300">Luzern, Schwyz, Zug und Umgebung</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-yellow-500" />
                  Geschäftsinformationen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Handelsregistereintrag</h3>
                  <p className="text-gray-300">
                    Eingetragen im Handelsregister der Schweiz
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mehrwertsteuernummer</h3>
                  <p className="text-gray-300">
                    CHE-XXX.XXX.XXX MWST
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Berufsgenossenschaft</h3>
                  <p className="text-gray-300">
                    Mitglied im Schweizerischen Taxiverband
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Haftungsausschluss</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Inhalt der Website</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die 
                    Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch 
                    keine Gewähr übernehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Externe Links</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte 
                    wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets 
                    der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Copyright */}
            <Card>
              <CardHeader>
                <CardTitle>Urheberrecht</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                  unterliegen dem Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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

export default ImpressumPage;
