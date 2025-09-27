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
    <section className="py-16 bg-gray-100">
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

        {/* Service Cards Grid - Dark Theme */}
        <div className="servicegebiete grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', margin: '30px 0'}}>
          {servicegebiete.map((gebiet, index) => (
            <a
              key={index}
              href={gebiet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card block group cursor-pointer"
              style={{
                background: '#111827',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
              }}
            >
              {/* Image */}
              <img
                src={gebiet.image}
                alt={gebiet.alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}
              />
              
              {/* Title */}
              <h3 style={{
                margin: '8px 0 4px',
                fontSize: '20px',
                color: '#f59e0b'
              }}>
                {gebiet.name}
              </h3>
              
              {/* Description */}
              <p style={{margin: '4px 0'}}>
                {gebiet.description}
              </p>
              
              {/* SEO Link */}
              <p className="seo-link" style={{
                marginTop: '6px',
                fontSize: '14px'
              }}>
                <span style={{
                  color: '#f59e0b',
                  textDecoration: 'underline'
                }}>
                  {gebiet.linkText}
                </span>
              </p>
            </a>
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