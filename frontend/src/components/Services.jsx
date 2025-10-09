import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Plane, Car, Briefcase, Package, ArrowRight, Phone, Calculator } from "lucide-react";
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
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200 overflow-hidden">
                {/* Service Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
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
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col gap-3">
                    {/* Primary CTA - Service-specific Link */}
                    {service.id === 1 && ( // Flughafentransfer
                      <Link to="/flughafentransfer" className="w-full">
                        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white group">
                          <Plane className="w-4 h-4 mr-2" />
                          Flughafentransfer buchen
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                    
                    {service.id === 2 && ( // Stadtfahrten
                      <div className="flex gap-2">
                        <Link to="/taxi-luzern" className="flex-1">
                          <Button variant="outline" className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                            <Car className="w-4 h-4 mr-2" />
                            Luzern
                          </Button>
                        </Link>
                        <Link to="/taxi-zug" className="flex-1">
                          <Button variant="outline" className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                            <Car className="w-4 h-4 mr-2" />
                            Zug
                          </Button>
                        </Link>
                      </div>
                    )}
                    
                    {service.id === 3 && ( // Geschäftsfahrten
                      <Link to="/geschaeftsfahrten" className="w-full">
                        <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white group">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Business Taxi buchen
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                    
                    
                    {/* Secondary Actions */}
                    <div className="flex gap-2">
                      <Link to="/preisrechner" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Calculator className="w-4 h-4 mr-2" />
                          Preis berechnen
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => window.location.href = 'tel:+41766113131'}>
                        <Phone className="w-4 h-4 mr-2" />
                        Anrufen
                      </Button>
                    </div>
                  </div>
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