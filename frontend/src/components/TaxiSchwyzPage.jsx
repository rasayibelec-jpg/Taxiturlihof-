import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Clock, Star, Car, Mountain } from "lucide-react";

const TaxiSchwyzPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Taxi Schwyz - Sicher durch die Berglandschaft
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              24/7 Mercedes-Taxi-Service in Schwyz und Brunnen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
              >
                <Phone className="w-6 h-6" />
                <span>076 611 31 31</span>
              </a>
              <a 
                href="#buchen" 
                className="flex items-center space-x-2 bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
              >
                <Car className="w-6 h-6" />
                <span>Online Buchen</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Taxi Türlihof in Schwyz */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ihr zuverlässiger Taxi-Partner in Schwyz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mit Taxi Turlihof gelangen Sie sicher durch die Berglandschaft und erreichen 
              jedes Ziel in Schwyz und Brunnen - von der Mythenregion bis zum Vierwaldstättersee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Berglandschaft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Erfahrene Fahrer, die alle Bergstraßen und Routen in Schwyz perfekt kennen
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">24/7 Verfügbar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Auch in den Bergen immer erreichbar - rund um die Uhr für Sie da
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Car className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Mercedes-Flotte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sichere, moderne Fahrzeuge für alle Wetterbedingungen in den Bergen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schwyz Ziele */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Beliebte Ziele in Schwyz & Brunnen
            </h2>
            <p className="text-xl text-gray-600">
              Wir bringen Sie zu allen wichtigen Orten in der Mythenregion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Schwyz Bahnhof",
              "Brunnen Bahnhof", 
              "Mythenzentrum",
              "Victorinox Museum",
              "Gersau",
              "Morschach",
              "Stoos",
              "Muotathal"
            ].map((destination, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-green-50 transition-colors duration-200">
                <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">{destination}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen zu Taxi Schwyz
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fahren Sie auch auf den Stoos?
              </h3>
              <p className="text-gray-600">
                Ja, wir fahren Sie gerne zur Stoosbahn-Talstation in Schwyz. Von dort können Sie mit der steilsten Standseilbahn der Welt auf den Stoos fahren.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sind Ihre Fahrzeuge für Bergstraßen geeignet?
              </h3>
              <p className="text-gray-600">
                Selbstverständlich! Unsere Mercedes-Flotte ist perfekt für alle Wetterbedingungen und Bergstraßen in der Region Schwyz ausgerüstet.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="buchen" className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Jetzt Taxi in Schwyz buchen
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Sicher durch die Berglandschaft - rufen Sie uns an!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Jetzt anrufen: 076 611 31 31</span>
            </a>
            <a 
              href="/#buchen" 
              className="flex items-center space-x-2 bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Car className="w-6 h-6" />
              <span>Online Buchen</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxiSchwyzPage;