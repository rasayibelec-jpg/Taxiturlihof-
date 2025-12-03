import React, { useState } from "react";
import { Card } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const CompactAbout = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Über Taxi Türlihof
          </h2>
          
          {/* Kurze Zusammenfassung */}
          <p className="text-gray-700 mb-4">
            Ihr zuverlässiger Partner für Taxi-Services in Luzern, Schwyz und Zug. 
            Mit unserer modernen Mercedes-Flotte bringen wir Sie sicher und komfortabel an Ihr Ziel.
          </p>
          
          {/* Erweiterte Informationen */}
          {showMore && (
            <div className="border-t pt-4 text-left space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Unsere Services</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Flughafentransfers (Zürich, Basel)</li>
                    <li>• Geschäfts- und Lokalfahrten</li>
                    <li>• Gruppenfahrten bis 8 Personen</li>
                    <li>• Zuverlässig verfügbar</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Warum wir?</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Nur Mercedes-Fahrzeuge</li>
                    <li>• Erfahrene, lokale Fahrer</li>
                    <li>• Festpreise ohne Überraschungen</li>
                    <li>• Online-Buchung möglich</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Mehr erfahren Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center mt-3 text-yellow-600 hover:text-yellow-700 font-medium transition-colors text-sm"
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