import React from "react";
import { Card, CardContent } from "./ui/card";
import { ExternalLink } from "lucide-react";

const ServicegebieteSection = () => {
  const servicegebiete = [
    {
      name: "Luzern",
      image: "https://images.unsplash.com/photo-1566789168779-73d46d92b809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Taxi Service Luzern am Vierwaldstättersee",
      description: "Historische Altstadt und Kapellbrücke",
      link: "https://taxiturlihof.ch/",
      linkText: "Taxi Luzern Servicegebiet"
    },
    {
      name: "Vierwaldstättersee", 
      image: "https://images.unsplash.com/photo-1517664604184-9c1d2962d0a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Taxi Fahrten rund um den Vierwaldstättersee",
      description: "Wunderschöne Fahrten rund um den See",
      link: "https://taxiturlihof.ch/landingpage/taxisevice-weggis/",
      linkText: "Taxi Vierwaldstättersee Servicegebiet"
    },
    {
      name: "Weggis & Vitznau",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      alt: "Taxi Service Weggis und Vitznau am See",
      description: "Malerische Seeufer-Gemeinden",
      link: "https://taxiturlihof.ch/landingpage/taxisevice-weggis/",
      linkText: "Taxi Weggis & Vitznau Servicegebiet"
    },
    {
      name: "Schwyz & Brunnen",
      image: "https://images.unsplash.com/photo-1570178735417-91eedf9a5c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Taxi Service Schwyz und Brunnen", 
      description: "Traditionelle Schweizer Berglandschaft",
      link: "https://taxiturlihof.ch/landingpage/taxisevice-schwyz/",
      linkText: "Taxi Schwyz & Brunnen Servicegebiet"
    },
    {
      name: "Zug",
      image: "https://images.unsplash.com/photo-1541696724920-864a966cc4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Taxi Service in Zug am Zugersee",
      description: "Moderne Stadt am Zugersee", 
      link: "https://taxiturlihof.ch/landingpage/taxisevice-zug/",
      linkText: "Taxi Zug Servicegebiet"
    },
    {
      name: "Arth-Goldau",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Taxi Service Arth-Goldau am Fuße der Rigi",
      description: "Tor zu Rigi und Pilatus",
      link: "https://taxiturlihof.ch/taxi/taxi-goldau/", 
      linkText: "Taxi Arth-Goldau Servicegebiet"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ Unsere Servicegebiete
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der historischen Stadt Luzern bis zu den malerischen Bergdörfern - 
            wir bringen Sie sicher an Ihr Ziel in der schönsten Region der Schweiz.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="servicegebiete grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicegebiete.map((gebiet, index) => (
            <div key={index} className="card group">
              <Card className="overflow-hidden border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={gebiet.image}
                    alt={gebiet.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Link Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Details
                    </div>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                      {gebiet.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 bg-white">
                  <p className="text-gray-600 mb-4 font-medium">
                    {gebiet.description}
                  </p>
                  
                  {/* SEO Link */}
                  <p className="seo-link">
                    <a
                      href={gebiet.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {gebiet.linkText}
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
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

export default ServicegebieteSection;