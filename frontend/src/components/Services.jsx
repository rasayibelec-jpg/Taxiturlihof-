import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plane, Car, Briefcase, Package } from "lucide-react";
import { services } from "../data/mockData";

const iconMap = {
  plane: Plane,
  car: Car,
  briefcase: Briefcase,
  package: Package,
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Dienstleistungen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der historischen Stadt Luzern bis zu den malerischen Bergdörfern - wir bringen Sie sicher an Ihr Ziel in der schönsten Region der Schweiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-yellow-100 p-3 rounded-full group-hover:bg-yellow-200 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Spezielle Preisdetails für Flughafentransfer */}
                  {service.priceDetails && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Preise:</h4>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div>
                          <strong>Flughafen Zürich:</strong>
                          <div className="ml-2">
                            • Von Luzern: {service.priceDetails.zurich.luzern}<br/>
                            • Von Schwyz: {service.priceDetails.zurich.schwyz}<br/>
                            • Von Zug: {service.priceDetails.zurich.zug}
                          </div>
                        </div>
                        <div>
                          <strong>Flughafen Basel:</strong>
                          <div className="ml-2">
                            • Von Luzern: {service.priceDetails.basel.luzern}<br/>
                            • Von Schwyz: {service.priceDetails.basel.schwyz}<br/>
                            • Von Zug: {service.priceDetails.basel.zug}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;