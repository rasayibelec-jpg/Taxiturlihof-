import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { coverageAreas } from "../data/mockData";

const Coverage = () => {
  return (
    <section id="coverage" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unser Einzugsgebiet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir bedienen die gesamte Zentralschweiz mit zuverlässigen 
            Taxi-Services in Luzern, Schwyz und Zug.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {coverageAreas.map((area) => (
            <Card key={area.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                  <MapPin className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  {area.city}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-3">Bediente Gebiete:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.zones.map((zone, index) => (
                      <Badge key={index} variant="outline" className="text-gray-700 border-gray-300">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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