import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Waves, Mountain, TreePine, Train } from "lucide-react";

const Coverage = () => {
  return (
    <section id="coverage" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Servicegebiete
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der historischen Stadt Luzern bis zu den malerischen Bergdörfern - wir bringen Sie sicher an Ihr Ziel in der schönsten Region der Schweiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 mb-4">
              <CardHeader className="pb-4">
                <div className="bg-yellow-100 p-3 rounded-full w-fit group-hover:bg-yellow-200 transition-colors duration-300 mx-auto">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  Luzern
                </CardTitle>
              </CardHeader>
            </Card>
            <p className="text-gray-600 leading-relaxed px-4">
              Mit Taxi Turlihof, Ihrem Taxi in der Nähe, erreichen Sie die Altstadt, die Kapellbrücke und alle Sehenswürdigkeiten bequem und pünktlich.
            </p>
          </div>

          <div className="text-center">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 mb-4">
              <CardHeader className="pb-4">
                <div className="bg-blue-100 p-3 rounded-full w-fit group-hover:bg-blue-200 transition-colors duration-300 mx-auto">
                  <Waves className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Vierwaldstättersee
                </CardTitle>
              </CardHeader>
            </Card>
            <p className="text-gray-600 leading-relaxed px-4">
              Ihr zuverlässiger Taxi Service am Vierwaldstättersee – Taxi Turlihof bringt Sie entspannt zu Ausflügen rund um den See.
            </p>
          </div>

          <div className="text-center">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 mb-4">
              <CardHeader className="pb-4">
                <div className="bg-green-100 p-3 rounded-full w-fit group-hover:bg-green-200 transition-colors duration-300 mx-auto">
                  <Mountain className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  Weggis & Vitznau
                </CardTitle>
              </CardHeader>
            </Card>
            <p className="text-gray-600 leading-relaxed px-4">
              Ob Bahnhof, Hotel oder Seeufer – mit Taxi Turlihof sind Sie in Weggis & Vitznau jederzeit mobil.
            </p>
          </div>

          <div className="text-center">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 mb-4">
              <CardHeader className="pb-4">
                <div className="bg-purple-100 p-3 rounded-full w-fit group-hover:bg-purple-200 transition-colors duration-300 mx-auto">
                  <TreePine className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Schwyz & Brunnen
                </CardTitle>
              </CardHeader>
            </Card>
            <p className="text-gray-600 leading-relaxed px-4">
              Mit Taxi Turlihof gelangen Sie sicher durch die Berglandschaft und erreichen jedes Ziel in Schwyz und Brunnen.
            </p>
          </div>

          <div className="text-center">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 mb-4">
              <CardHeader className="pb-4">
                <div className="bg-teal-100 p-3 rounded-full w-fit group-hover:bg-teal-200 transition-colors duration-300 mx-auto">
                  <Train className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                  Zug
                </CardTitle>
              </CardHeader>
            </Card>
            <p className="text-gray-600 leading-relaxed px-4">
              Stressfrei unterwegs mit Taxi Turlihof – Ihr Taxi Bahnhof und zuverlässiger Partner am Zugersee.
            </p>
          </div>

          <div className="text-center">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 mb-4">
              <CardHeader className="pb-4">
                <div className="bg-orange-100 p-3 rounded-full w-fit group-hover:bg-orange-200 transition-colors duration-300 mx-auto">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  Arth-Goldau
                </CardTitle>
              </CardHeader>
            </Card>
            <p className="text-gray-600 leading-relaxed px-4">
              Von Arth-Goldau direkt auf die Rigi oder den Pilatus: Taxi Turlihof bringt Sie schnell und komfortabel ans Ziel.
            </p>
          </div>
        </div>

        {/* Zusätzliche Informationen unter den Karten */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🚖 Ihr zuverlässiger Partner in der Zentralschweiz
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Taxi Turlihof steht für Pünktlichkeit, Komfort und lokale Expertise. 
                Egal ob Geschäftstermin, Flughafentransfer oder Ausflug zu den schönsten 
                Orten der Region – wir bringen Sie sicher ans Ziel.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">24</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Service</h4>
                  <p className="text-sm text-gray-600">Rund um die Uhr für Sie da</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🌟</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Lokale Expertise</h4>
                  <p className="text-sm text-gray-600">Wir kennen jeden Winkel der Region</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">✓</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Zuverlässig</h4>
                  <p className="text-sm text-gray-600">Pünktlich und professionell</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <p className="text-center text-gray-600 mb-4">
                  <strong>Kontaktieren Sie uns für eine unverbindliche Beratung:</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="tel:076 611 31 31" 
                    className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                  >
                    <span>📞</span>
                    <span>076 611 31 31</span>
                  </a>
                  <a 
                    href="mailto:info@taxiturlihof.ch" 
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                  >
                    <span>✉️</span>
                    <span>info@taxiturlihof.ch</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Zusätzliche Fahrten möglich
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Gerne fahren wir Sie auch zu anderen Zielen in der Schweiz. 
              Sprechen Sie uns einfach an - wir finden eine Lösung für Ihre Transportbedürfnisse.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-yellow-600 text-white px-4 py-2">Flughafen Zürich</Badge>
              <Badge className="bg-yellow-600 text-white px-4 py-2">Bahnhöfe</Badge>
              <Badge className="bg-yellow-600 text-white px-4 py-2">Spitäler</Badge>
              <Badge className="bg-yellow-600 text-white px-4 py-2">Veranstaltungen</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;