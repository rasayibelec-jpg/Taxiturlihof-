import React, { useState } from "react";
import { Card } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const CompactAbout = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Über Taxi Türlihof
        </h2>
        
        {/* Kurze Zusammenfassung */}
        <Card className="p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Ihr zuverlässiger Partner für Taxi-Services in Luzern, Schwyz und Zug. 
            Mit unserer modernen Mercedes-Flotte bringen wir Sie sicher und komfortabel an Ihr Ziel.
          </p>
          
          {/* Erweiterte Informationen */}
          {showMore && (
            <div className="border-t pt-6 text-left space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Unsere Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Flughafentransfers (Zürich, Basel)</li>
                    <li>• Geschäftsfahrten</li>
                    <li>• Lokale Fahrten in der Zentralschweiz</li>
                    <li>• Gruppenfahrten bis 8 Personen</li>
                    <li>• 24/7 verfügbar</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Warum Taxi Türlihof?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nur Mercedes-Fahrzeuge</li>
                    <li>• Erfahrene, lokale Fahrer</li>
                    <li>• Festpreise ohne Überraschungen</li>
                    <li>• Pünktlich und zuverlässig</li>
                    <li>• Online-Buchung möglich</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Mehr erfahren Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center mt-4 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
          >
            {showMore ? 'Weniger anzeigen' : 'Mehr erfahren'}
            {showMore ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )}
          </button>
        </Card>
      </div>
    </section>
  );
};

export default CompactAbout;