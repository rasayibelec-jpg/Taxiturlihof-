import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calculator, MapPin, Clock, Route } from "lucide-react";
import { pricingStructure } from "../data/mockData";

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Preisliste
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparente und faire Preise für alle unsere Services. 
            Keine versteckten Kosten - Sie wissen immer, was Sie bezahlen.
          </p>
        </div>

        {/* Preisstruktur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                <Calculator className="w-8 h-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Grundtarif
              </CardTitle>
              <div className="text-3xl font-bold text-yellow-600 mt-2">
                {pricingStructure.basicRate.price}
              </div>
              <CardDescription className="text-gray-600 mt-2">
                {pricingStructure.basicRate.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                <Route className="w-8 h-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Pro Kilometer
              </CardTitle>
              <div className="text-3xl font-bold text-yellow-600 mt-2">
                {pricingStructure.perKilometer.price}
              </div>
              <CardDescription className="text-gray-600 mt-2">
                {pricingStructure.perKilometer.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Wartezeit
              </CardTitle>
              <div className="text-3xl font-bold text-yellow-600 mt-2">
                {pricingStructure.waitingTime.price}
              </div>
              <CardDescription className="text-gray-600 mt-2">
                {pricingStructure.waitingTime.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Zusatzinformationen */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Wichtige Hinweise
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-yellow-600" />
                Preisberechnung
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Alle Preise verstehen sich inklusive MwSt.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Wartezeit wird minutengenau abgerechnet
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Nachtfahrten ohne Aufschlag
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-600" />
                Service-Hinweise
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Kostenvoranschlag vor Fahrtantritt
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Festpreise für Flughafentransfers verfügbar
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Gruppenrabatte auf Anfrage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;