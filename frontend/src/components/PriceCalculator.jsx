import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { MapPin, Calculator, Navigation, Star, Phone } from "lucide-react";
import { contactInfo } from "../data/mockData";
import { useToast } from "../hooks/use-toast";

const PriceCalculator = () => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  // Häufige Ziele mit geschätzten Distanzen von Luzern
  const favoriteDestinations = [
    { name: "Flughafen Zürich", distance: 47, fromCity: "Luzern" },
    { name: "Flughafen Basel", distance: 85, fromCity: "Luzern" },
    { name: "Bahnhof Luzern", distance: 2, fromCity: "Luzern" },
    { name: "Bahnhof Zug", distance: 23, fromCity: "Zug" },
    { name: "Brunnen", distance: 25, fromCity: "Schwyz" },
    { name: "Einsiedeln", distance: 35, fromCity: "Schwyz" }
  ];

  // Mock-Distanzberechnung mit realistischeren Werten
  const calculateDistance = (start, end) => {
    if (!start || !end) return 0;
    
    // Realistische Distanzen für häufige Strecken
    const routeDistances = {
      // Von Goldau/Arth-Goldau
      'goldau zürich': 45,
      'arth goldau zürich': 45,
      'goldau flughafen zürich': 50,
      'arth goldau flughafen zürich': 50,
      
      // Von Luzern
      'luzern flughafen zürich': 47,
      'luzern zürich': 43,
      'luzern flughafen basel': 85,
      'luzern-zug': 23,
      'luzern-schwyz': 30,
      'luzern-brunnen': 25,
      
      // Von Zug
      'zug-zürich': 25,
      'zug-flughafen zürich': 30,
      'zug-luzern': 23,
      'zug-schwyz': 18,
      
      // Von Schwyz
      'schwyz-luzern': 30,
      'schwyz-zürich': 40,
      'schwyz-zug': 18,
      'schwyz-brunnen': 8,
      'schwyz-einsiedeln': 15,
      
      // Weitere wichtige Strecken
      'arth-goldau-zürich': 45,
      'brunnen-luzern': 25,
      'einsiedeln-zürich': 55,
    };
    
    // Normalisiere die Eingaben für bessere Suche
    const normalizeLocation = (location) => {
      return location.toLowerCase()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
        .replace(/\s+/g, ' ').trim();
    };
    
    const startNorm = normalizeLocation(start);
    const endNorm = normalizeLocation(end);
    
    // Suche nach exakten Route-Matches
    const routeKey1 = `${startNorm}-${endNorm}`;
    const routeKey2 = `${endNorm}-${startNorm}`; // Auch umgekehrte Richtung
    
    if (routeDistances[routeKey1]) {
      return routeDistances[routeKey1];
    }
    if (routeDistances[routeKey2]) {
      return routeDistances[routeKey2];
    }
    
    // Suche nach Teilübereinstimmungen
    for (const [route, distance] of Object.entries(routeDistances)) {
      const [routeStart, routeEnd] = route.split('-');
      if ((startNorm.includes(routeStart) || routeStart.includes(startNorm)) &&
          (endNorm.includes(routeEnd) || routeEnd.includes(endNorm))) {
        return distance;
      }
      if ((startNorm.includes(routeEnd) || routeEnd.includes(startNorm)) &&
          (endNorm.includes(routeStart) || routeStart.includes(endNorm))) {
        return distance;
      }
    }
    
    // Fallback: Realistische Schätzung basierend auf Schweizer Geographie
    const estimatedDistance = Math.max(10, Math.min(100, (start.length + end.length) * 2));
    return Math.round(estimatedDistance);
  };

  const calculatePrice = (distanceKm) => {
    const grundtarif = 6.60;
    const pricePerKm = 4.20;
    const totalPrice = grundtarif + (distanceKm * pricePerKm);
    return Math.round(totalPrice * 100) / 100; // Runde auf 2 Dezimalstellen
  };

  const handleCalculate = () => {
    if (!startAddress.trim() || !endAddress.trim()) {
      toast({
        title: "Eingabe erforderlich",
        description: "Bitte geben Sie Start- und Zieladresse ein.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      const estimatedDistance = calculateDistance(startAddress, endAddress);
      const estimatedPrice = calculatePrice(estimatedDistance);
      
      setDistance(estimatedDistance);
      setCalculatedPrice(estimatedPrice);
      setIsCalculating(false);

      toast({
        title: "Berechnung abgeschlossen!",
        description: `Geschätzte Distanz: ${estimatedDistance} km`,
      });
    }, 1500);
  };

  const handleFavoriteClick = (destination) => {
    setEndAddress(destination.name);
    if (!startAddress.trim()) {
      setStartAddress(destination.fromCity + " Zentrum");
    }
  };

  const handleBookNow = () => {
    const message = `Hallo! Ich möchte eine Fahrt buchen:\n\nVon: ${startAddress}\nNach: ${endAddress}\nGeschätzte Distanz: ${distance} km\nGeschätzter Preis: CHF ${calculatedPrice?.toFixed(2)}\n\nVielen Dank!`;
    const phoneNumber = contactInfo.phone.replace(/\s/g, '').replace(/^0/, '+41');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Preisrechner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berechnen Sie den geschätzten Preis für Ihre Fahrt. 
            Geben Sie einfach Start- und Zieladresse ein.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Calculator className="w-7 h-7 mr-3" />
                Fahrtkosten berechnen
              </CardTitle>
              <CardDescription className="text-yellow-100">
                Basierend auf: Grundtarif CHF 6.60 + CHF 4.20 pro Kilometer
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Eingabefelder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    Startadresse
                  </label>
                  <Input
                    placeholder="z.B. Bahnhofstrasse 1, Luzern"
                    value={startAddress}
                    onChange={(e) => setStartAddress(e.target.value)}
                    className="h-12 text-lg border-2 border-gray-200 focus:border-yellow-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Navigation className="w-4 h-4 mr-2 text-red-600" />
                    Zieladresse
                  </label>
                  <Input
                    placeholder="z.B. Flughafen Zürich"
                    value={endAddress}
                    onChange={(e) => setEndAddress(e.target.value)}
                    className="h-12 text-lg border-2 border-gray-200 focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Favoriten */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Häufige Ziele
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {favoriteDestinations.map((destination, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleFavoriteClick(destination)}
                      className="h-auto p-3 hover:bg-yellow-50 hover:border-yellow-500 text-left"
                    >
                      <div>
                        <div className="font-semibold text-sm">{destination.name}</div>
                        <div className="text-xs text-gray-500">von {destination.fromCity}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Berechnen Button */}
              <div className="text-center mb-8">
                <Button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white h-14 px-8 text-lg font-semibold"
                  size="lg"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Berechnung läuft...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 mr-3" />
                      BERECHNUNG STARTEN
                    </>
                  )}
                </Button>
              </div>

              {/* Ergebnis */}
              {calculatedPrice && distance && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Geschätzte Distanz</div>
                      <div className="text-2xl font-bold text-gray-900">{distance} km</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Geschätzter Preis</div>
                      <div className="text-3xl font-bold text-green-600">CHF {calculatedPrice.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        (CHF 6.60 + {distance} × CHF 4.20)
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        onClick={handleBookNow}
                        className="bg-green-600 hover:bg-green-700 text-white w-full h-12"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Jetzt Buchen
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                      💡 Dies ist eine Schätzung. Der finale Preis wird bei der Fahrt berechnet.
                    </Badge>
                  </div>
                </div>
              )}

              {/* Hinweise */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Hinweise zur Preisberechnung:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Grundtarif: CHF 6.60 (bei jeder Fahrt)</li>
                  <li>• Kilometerpreis: CHF 4.20 pro km</li>
                  <li>• Wartezeit: CHF 73.00 pro Stunde (falls erforderlich)</li>
                  <li>• Alle Preise verstehen sich inklusive MwSt.</li>
                  <li>• Festpreise für Flughafentransfers verfügbar</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;