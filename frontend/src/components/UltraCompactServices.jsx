import React from "react";
import { Link } from "react-router-dom";
import { Car, Plane, Building, Users } from "lucide-react";

const UltraCompactServices = () => {
  const services = [
    {
      icon: Car,
      title: "Taxi Service",
      description: "Zuverlässige Fahrten in Luzern, Schwyz und Zug"
    },
    {
      icon: Plane,
      title: "Flughafen Transfer",
      description: "Direkt zu Flughäfen Zürich und Basel"
    },
    {
      icon: Building,
      title: "Firmenkunden",
      description: "Geschäftstermine und Events"
    },
    {
      icon: Users,
      title: "Gruppenfahrten",
      description: "Bis zu 8 Personen in Mercedes V-Klasse"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unsere Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Alle Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UltraCompactServices;