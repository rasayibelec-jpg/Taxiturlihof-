import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { MapPin, Calculator, Navigation, Phone, Clock, Route, CheckCircle, AlertCircle } from "lucide-react";
import { contactInfo } from "../data/mockData";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

const PriceCalculator = () => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStatus, setCalculationStatus] = useState(null);
  const { toast } = useToast();

  const handleCalculatePrice = async () => {
    if (!startAddress.trim() || !endAddress.trim()) {
      toast({
        title: "Fehlende Eingaben",
        description: "Bitte geben Sie sowohl Start- als auch Zieladresse ein.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    setCalculationStatus(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      const response = await axios.post(`${backendUrl}/api/calculate-price`, {
        origin: startAddress,
        destination: endAddress,
        departure_time: new Date().toISOString()
      });

      if (response.data) {
        setCalculatedPrice(response.data);
        setCalculationStatus({
          type: 'success',
          message: 'Preis erfolgreich berechnet!'
        });
        
        toast({
          title: "✅ Preis berechnet!",
          description: `Geschätzte Kosten: CHF ${response.data.total_fare}`,
        });
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.message || 
                          'Fehler bei der Preisberechnung. Bitte versuchen Sie es erneut.';
      
      setCalculationStatus({
        type: 'error',
        message: errorMessage
      });
      
      toast({
        title: "❌ Berechnungsfehler",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };
      { start: 'goldau', end: 'flughafen zurich', km: 48 },
      { start: 'arth', end: 'zurich', km: 45 },
      { start: 'arth', end: 'flughafen zurich', km: 48 },
    ];
    
    // Suche passende Route
    for (const route of routes) {
      // Teste beide Richtungen
      if ((startLower.includes(route.start) && endLower.includes(route.end)) ||
          (startLower.includes(route.end) && endLower.includes(route.start))) {
        return route.km;
      }
    }
    
    // Fallback für unbekannte Routen
    return 35;
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