import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { MapPin, Calculator, Navigation, Phone, Clock, Route, CheckCircle, AlertCircle } from "lucide-react";
import { contactInfo } from "../data/mockData";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
// Simple inputs without GooglePlaces complexity

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
        title: "Unvollständige Eingaben",
        description: "Bitte geben Sie sowohl Start- als auch Zieladresse ein.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    setCalculationStatus({ type: "", message: "" });

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.post(`${backendUrl}/api/calculate-price`, {
        origin: startAddress.trim(),
        destination: endAddress.trim(),
        departure_time: new Date().toISOString()
      });

      if (response.data) {
        setCalculatedPrice(response.data);
        setCalculationStatus({
          type: "success",
          message: `Geschätzte Kosten: CHF ${response.data.total_fare}`,
        });
      }
    } catch (error) {
      console.error('Price calculation error:', error);
      setCalculationStatus({
        type: "error",
        message: error.response?.data?.detail || "Fehler bei der Preisberechnung. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBookNow = () => {
    if (!calculatedPrice) return;

    const message = `Hallo! Ich möchte eine Fahrt buchen:%0A%0A` +
                   `Von: ${calculatedPrice.origin}%0A` +
                   `Nach: ${calculatedPrice.destination}%0A` +
                   `Geschätzte Kosten: CHF ${calculatedPrice.total_fare}%0A` +
                   `Distanz: ${calculatedPrice.distance_km} km%0A%0A` +
                   `Bitte bestätigen Sie die Buchung.`;

    const whatsappUrl = `https://wa.me/41766113131?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Preisrechner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berechnen Sie den geschätzten Fahrpreis für Ihre Route in der Zentralschweiz.
            Unsere intelligente Berechnung berücksichtigt Distanz, Verkehr und Tageszeit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Calculator className="w-6 h-6 text-yellow-600 mr-3" />
                Fahrpreis berechnen
              </CardTitle>
              <CardDescription>
                Geben Sie Start- und Zieladresse ein für eine präzise Kostenschätzung.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Message */}
              {calculationStatus && (
                <div className={`p-4 rounded-lg border ${
                  calculationStatus.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center space-x-2">
                    {calculationStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <p className="font-medium">{calculationStatus.message}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="start" className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Startadresse
                  </label>
                  <Input
                    id="start"
                    type="text"
                    placeholder="z.B. Luzern, Bahnhofstrasse 1"
                    value={startAddress}
                    onChange={(e) => setStartAddress(e.target.value)}
                    disabled={isCalculating}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="end" className="block text-sm font-medium text-gray-700 mb-2">
                    <Navigation className="w-4 h-4 inline mr-1" />
                    Zieladresse
                  </label>
                  <Input
                    id="end"
                    type="text"
                    placeholder="z.B. Zürich Flughafen"
                    value={endAddress}
                    onChange={(e) => setEndAddress(e.target.value)}
                    disabled={isCalculating}
                    className="w-full"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCalculatePrice}
                disabled={isCalculating || !startAddress.trim() || !endAddress.trim()}
                className={`w-full text-white transform transition-all duration-200 hover:scale-105 ${
                  isCalculating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
                size="lg"
              >
                {isCalculating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Berechnung läuft...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5" />
                    <span>Preis berechnen</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {calculatedPrice ? (
              <Card className="shadow-lg border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Berechnungsergebnis
                  </CardTitle>
                  <CardDescription className="text-gray-700">
                    Geschätzte Kosten für Ihre Fahrt
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Distanz</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {calculatedPrice.distance_km} km
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Fahrzeit</div>
                      <div className="text-2xl font-bold text-gray-900 flex items-center">
                        <Clock className="w-5 h-5 mr-1" />
                        {calculatedPrice.estimated_duration_minutes} min
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-yellow-300">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Geschätzte Gesamtkosten</div>
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        CHF {calculatedPrice.total_fare}
                      </div>
                      <div className="text-sm text-gray-500">
                        Grundtarif CHF {calculatedPrice.base_fare} + Distanz CHF {calculatedPrice.distance_fare}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Route:</span>
                      <Badge variant="secondary">
                        <Route className="w-3 h-3 mr-1" />
                        {calculatedPrice.route_info?.route_type || 'Standard'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Von:</span>
                      <span className="font-medium">{calculatedPrice.origin}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Nach:</span>
                      <span className="font-medium">{calculatedPrice.destination}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Berechnung:</span>
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        Intelligente Schätzung
                      </Badge>
                    </div>
                    
                    {/* Google Maps Route Button */}
                    <div className="pt-2">
                      <Button
                        onClick={() => {
                          const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(calculatedPrice.origin)}/${encodeURIComponent(calculatedPrice.destination)}`;
                          window.open(mapsUrl, '_blank');
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Route className="w-4 h-4 mr-2" />
                        Route in Google Maps anzeigen
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookNow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transform transition-all duration-200 hover:scale-105"
                    size="lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Jetzt über WhatsApp buchen
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Bereit für die Berechnung
                  </h3>
                  <p className="text-gray-600 max-w-sm">
                    Geben Sie Start- und Zieladresse ein, um eine genaue Kostenschätzung zu erhalten.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Pricing Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Tarifübersicht
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grundtarif</span>
                  <span className="font-semibold">CHF 6.60</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pro Kilometer</span>
                  <span className="font-semibold">CHF 4.20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wartezeit</span>
                  <span className="font-semibold">CHF 73.00/Std</span>
                </div>
                <hr className="my-3" />
                <div className="text-sm text-gray-500">
                  * Preise können je nach Tageszeit, Verkehrslage und besonderen Umständen variieren.
                  Nacht- und Wochenendzuschläge möglich.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;