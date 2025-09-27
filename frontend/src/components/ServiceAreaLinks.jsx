import React from "react";

const ServiceAreaLinks = () => {
  const serviceAreas = [
    {
      name: "Luzern",
      url: "https://www.taxiturlihof.ch/servicegebiet/luzern",
      emoji: "🏰",
      color: "bg-yellow-600 hover:bg-yellow-500"
    },
    {
      name: "Vierwaldstättersee", 
      url: "https://www.taxiturlihof.ch/servicegebiet/vierwaldstaettersee",
      emoji: "🏔️",
      color: "bg-blue-600 hover:bg-blue-500"
    },
    {
      name: "Schwyz & Brunnen",
      url: "https://www.taxiturlihof.ch/servicegebiet/schwyz-brunnen", 
      emoji: "⛰️",
      color: "bg-purple-600 hover:bg-purple-500"
    },
    {
      name: "Zug",
      url: "https://www.taxiturlihof.ch/servicegebiet/zug",
      emoji: "🚂", 
      color: "bg-teal-600 hover:bg-teal-500"
    },
    {
      name: "Weggis & Vitznau",
      url: "https://www.taxiturlihof.ch/servicegebiet/weggis-vitznau",
      emoji: "🏞️",
      color: "bg-green-600 hover:bg-green-500"
    },
    {
      name: "Arth-Goldau",
      url: "https://www.taxiturlihof.ch/servicegebiet/arth-goldau",
      emoji: "🦌",
      color: "bg-orange-600 hover:bg-orange-500"
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🗺️ Unsere Servicegebiete
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 font-semibold text-lg">
              👆 Klicken Sie auf ein Servicegebiet für detaillierte Informationen
            </p>
          </div>
        </div>

        {/* Service Area Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serviceAreas.map((area, index) => (
            <a
              key={index}
              href={area.url}
              className={`${area.color} text-white px-4 py-6 rounded-xl font-semibold text-center transition-all duration-200 transform hover:scale-105 hover:shadow-xl block`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Servicegebiet ${area.name} - Klicken für Details`}
            >
              <div className="text-3xl mb-2">{area.emoji}</div>
              <div className="text-sm font-bold">{area.name}</div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Von der historischen Stadt Luzern bis zu den malerischen Bergdörfern - 
            wir bringen Sie sicher an Ihr Ziel in der schönsten Region der Schweiz.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaLinks;