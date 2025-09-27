import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, ExternalLink } from "lucide-react";

const ServiceAreas = () => {
  const serviceAreas = [
    {
      name: "Luzern",
      url: "https://www.taxiturlihof.ch/servicegebiet/luzern",
      image: "https://images.unsplash.com/photo-1566789168779-73d46d92b809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Historische Altstadt & Kapellbrücke",
      color: "yellow"
    },
    {
      name: "Vierwaldstättersee",
      url: "https://www.taxiturlihof.ch/servicegebiet/vierwaldstaettersee",
      image: "https://images.unsplash.com/photo-1517664604184-9c1d2962d0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Malerische Seeregion & Bergpanorama",
      color: "blue"
    },
    {
      name: "Schwyz & Brunnen",
      url: "https://www.taxiturlihof.ch/servicegebiet/schwyz-brunnen",
      image: "https://images.unsplash.com/photo-1570178735417-91eedf9a5c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Ursprung der Schweiz & Mythen",
      color: "purple"
    },
    {
      name: "Zug",
      url: "https://www.taxiturlihof.ch/servicegebiet/zug",
      image: "https://images.unsplash.com/photo-1541696724920-864a966cc4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Zugersee & moderne Stadtmitte",
      color: "teal"
    },
    {
      name: "Weggis & Vitznau",
      url: "https://www.taxiturlihof.ch/servicegebiet/weggis-vitznau",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Rigi-Region & Bergbahnen",
      color: "green"
    },
    {
      name: "Arth-Goldau",
      url: "https://www.taxiturlihof.ch/servicegebiet/arth-goldau",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Verkehrsknotenpunkt & Tierpark",
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      yellow: {
        bg: "bg-yellow-100",
        hover: "hover:bg-yellow-200",
        border: "border-yellow-300",
        text: "text-yellow-800",
        button: "bg-yellow-600 hover:bg-yellow-700"
      },
      blue: {
        bg: "bg-blue-100", 
        hover: "hover:bg-blue-200",
        border: "border-blue-300",
        text: "text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      purple: {
        bg: "bg-purple-100",
        hover: "hover:bg-purple-200", 
        border: "border-purple-300",
        text: "text-purple-800",
        button: "bg-purple-600 hover:bg-purple-700"
      },
      teal: {
        bg: "bg-teal-100",
        hover: "hover:bg-teal-200",
        border: "border-teal-300", 
        text: "text-teal-800",
        button: "bg-teal-600 hover:bg-teal-700"
      },
      green: {
        bg: "bg-green-100",
        hover: "hover:bg-green-200",
        border: "border-green-300",
        text: "text-green-800", 
        button: "bg-green-600 hover:bg-green-700"
      },
      orange: {
        bg: "bg-orange-100",
        hover: "hover:bg-orange-200",
        border: "border-orange-300",
        text: "text-orange-800",
        button: "bg-orange-600 hover:bg-orange-700"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ Unsere Servicegebiete
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Von der historischen Stadt Luzern bis zu den malerischen Bergdörfern - 
            wir bringen Sie sicher an Ihr Ziel in der schönsten Region der Schweiz.
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 font-semibold text-lg">
              🖱️ Klicken Sie auf ein Servicegebiet für detaillierte Informationen
            </p>
          </div>
        </div>

        {/* Service Area Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceAreas.map((area, index) => {
            const colorClasses = getColorClasses(area.color);
            
            return (
              <a
                key={index}
                href={area.url}
                className="group block transform hover:scale-105 transition-all duration-300"
                title={`Servicegebiet ${area.name} - Klicken für Details`}
              >
                <Card className={`overflow-hidden border-2 ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 hover:shadow-2xl`}>
                  
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Click Indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`${colorClasses.button} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Details
                      </div>
                    </div>
                    
                    {/* Area Name Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">
                        {area.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className={`p-6 ${colorClasses.bg}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`${colorClasses.text} font-medium mb-3`}>
                          {area.description}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Taxi-Service verfügbar</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div className={`${colorClasses.button} text-white p-2 rounded-full group-hover:animate-pulse`}>
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              📞 Ihr Gebiet nicht dabei?
            </h3>
            <p className="text-gray-600 mb-4">
              Kontaktieren Sie uns! Wir decken auch umliegende Gebiete ab.
            </p>
            <a
              href="tel:0766113131"
              className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              📞 076 611 31 31
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;