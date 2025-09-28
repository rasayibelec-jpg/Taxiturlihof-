import React from "react";
import { Card, CardContent } from "./ui/card";
import { ExternalLink } from "lucide-react";
import "./ServicegebieteSection.css";

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
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNjaHd5eiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzJkNzIzZCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM0YjU1NjMiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzY2h3eXopIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj7wn4+0IFNjaHd5eiAmYW1wOyBCcnVubmVuPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmY1ZTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+VHJhZGl0aW9uZWxsZSBTY2h3ZWl6ZXIgQmVyZ2xhbmRzY2hhZnQ8L3RleHQ+PC9zdmc+",
      alt: "Taxi Service Schwyz und Brunnen - Traditionelle Schweizer Berglandschaft", 
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

        {/* Service Cards Grid - Dark Theme mit CSS */}
        <div className="servicegebiete">
          {servicegebiete.map((gebiet, index) => (
            <a
              key={index}
              href={gebiet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
            >
              {/* Image */}
              <img
                src={gebiet.image}
                alt={gebiet.alt}
                loading="lazy"
                decoding="async"
              />
              
              {/* Title */}
              <h3>{gebiet.name}</h3>
              
              {/* Description */}
              <p>{gebiet.description}</p>
              
              {/* SEO Link */}
              <p className="seo-link">
                <span>{gebiet.linkText}</span>
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