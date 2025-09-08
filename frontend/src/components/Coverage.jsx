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
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
            <CardHeader className="pb-4">
              <div className="bg-yellow-100 p-3 rounded-full w-fit group-hover:bg-yellow-200 transition-colors duration-300">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                Luzern
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Mit Taxi Turlihof, Ihrem Taxi in der Nähe, erreichen Sie die Altstadt, die Kapellbrücke und alle Sehenswürdigkeiten bequem und pünktlich.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
            <CardHeader className="pb-4">
              <div className="bg-blue-100 p-3 rounded-full w-fit group-hover:bg-blue-200 transition-colors duration-300">
                <Waves className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                Vierwaldstättersee
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Ihr zuverlässiger Taxi Service am Vierwaldstättersee – Taxi Turlihof bringt Sie entspannt zu Ausflügen rund um den See.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
            <CardHeader className="pb-4">
              <div className="bg-green-100 p-3 rounded-full w-fit group-hover:bg-green-200 transition-colors duration-300">
                <Mountain className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                Weggis & Vitznau
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Ob Bahnhof, Hotel oder Seeufer – mit Taxi Turlihof sind Sie in Weggis & Vitznau jederzeit mobil.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
            <CardHeader className="pb-4">
              <div className="bg-purple-100 p-3 rounded-full w-fit group-hover:bg-purple-200 transition-colors duration-300">
                <TreePine className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                Schwyz & Brunnen
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Mit Taxi Turlihof gelangen Sie sicher durch die Berglandschaft und erreichen jedes Ziel in Schwyz und Brunnen.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
            <CardHeader className="pb-4">
              <div className="bg-teal-100 p-3 rounded-full w-fit group-hover:bg-teal-200 transition-colors duration-300">
                <Train className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                Zug
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Stressfrei unterwegs mit Taxi Turlihof – Ihr Taxi Bahnhof und zuverlässiger Partner am Zugersee.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
            <CardHeader className="pb-4">
              <div className="bg-orange-100 p-3 rounded-full w-fit group-hover:bg-orange-200 transition-colors duration-300">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                Arth-Goldau
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Von Arth-Goldau direkt auf die Rigi oder den Pilatus: Taxi Turlihof bringt Sie schnell und komfortabel ans Ziel.
              </CardDescription>
            </CardHeader>
          </Card>
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