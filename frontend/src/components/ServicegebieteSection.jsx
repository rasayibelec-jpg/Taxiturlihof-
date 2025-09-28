import React from "react";
import { Card, CardContent } from "./ui/card";
import { ExternalLink } from "lucide-react";
import "./ServicegebieteSection.css";

const ServicegebieteSection = () => {
  const servicegebiete = [
    {
      name: "Luzern",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Imx1emVybiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFkNGVkOCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNTYzZWIiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNsdXplcm4pIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPvCfj44gTHV6ZXJuPC90ZXh0Pjwvc3ZnPg==",
      alt: "Taxi Service Luzern am Vierwaldstättersee",
      description: "Historische Altstadt und Kapellbrücke",
      link: "https://taxiturlihof.ch/",
      linkText: "Taxi Luzern Servicegebiet"
    },
    {
      name: "Vierwaldstättersee", 
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNlZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA2OTFkOCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwZDkzZjAiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzZWUpIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPvCfjI8gVmllcndhbGRzdMOkdHRlcnNlZTwvdGV4dD48L3N2Zz4=",
      alt: "Taxi Fahrten rund um den Vierwaldstättersee",
      description: "Wunderschöne Fahrten rund um den See",
      link: "https://taxiturlihof.ch/landingpage/taxisevice-weggis/",
      linkText: "Taxi Vierwaldstättersee Servicegebiet"
    },
    {
      name: "Weggis & Vitznau",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IndlZ2dpcyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwNzk2YiIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNmE3OGEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3ZWdnaXMpIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPvCfj5AgV2VnZ2lzICZhbXA7IFZpdHpuYXU8L3RleHQ+PC9zdmc+",
      alt: "Taxi Service Weggis und Vitznau am See",
      description: "Malerische Seeufer-Gemeinden",
      link: "https://taxiturlihof.ch/landingpage/taxisevice-weggis/",
      linkText: "Taxi Weggis & Vitznau Servicegebiet"
    },
    {
      name: "Schwyz & Brunnen",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNjaHd5eiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzZkMjhkOSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5MzMzZWEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzY2h3eXopIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPvCfjrQgU2Nod3l6PC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPiZhbXA7IEJydW5uZW48L3RleHQ+PC9zdmc+",
      alt: "Taxi Service Schwyz und Brunnen", 
      description: "Traditionelle Schweizer Berglandschaft",
      link: "https://taxiturlihof.ch/landingpage/taxisevice-schwyz/",
      linkText: "Taxi Schwyz & Brunnen Servicegebiet"
    },
    {
      name: "Zug",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Inp1ZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2YzOTc0NCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmOTczMTYiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN6dWcpIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPvCfjpkgWnVnPC90ZXh0Pjwvc3ZnPg==",
      alt: "Taxi Service in Zug am Zugersee",
      description: "Moderne Stadt am Zugersee", 
      link: "https://taxiturlihof.ch/landingpage/taxisevice-zug/",
      linkText: "Taxi Zug Servicegebiet"
    },
    {
      name: "Arth-Goldau",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImFydGgiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkYzI2MjYiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZWYzNzM3IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYXJ0aCkiIC8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+8J+PjiBBcnRoLUdvbGRhdTwvdGV4dD48L3N2Zz4=",
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