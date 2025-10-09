import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Navigation, Clock, DollarSign, Route, ExternalLink } from "lucide-react";

const RouteVisualization = ({ 
  origin, 
  destination, 
  routeData, 
  showRoute = false
}) => {

  // Generate Google Maps URL for external viewing
  const getGoogleMapsUrl = () => {
    if (!origin || !destination) return '#';
    
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    
    return `https://www.google.com/maps/dir/${encodedOrigin}/${encodedDestination}`;
  };

  if (!showRoute || !routeData) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-8 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Routenanzeige
          </h3>
          <p className="text-gray-600">
            Berechnen Sie eine Route, um die Streckendetails zu sehen
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Route Overview Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 pb-3">
          <CardTitle className="flex items-center text-lg">
            <Route className="w-5 h-5 mr-2 text-yellow-600" />
            Berechnete Route
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Route Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-gray-500">Distanz</div>
              <div className="text-lg font-bold text-gray-900">
                {routeData.distance_km ? `${routeData.distance_km.toFixed(1)} km` : 'N/A'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm text-gray-500">Fahrzeit</div>
              <div className="text-lg font-bold text-gray-900">
                {routeData.duration_minutes ? `${routeData.duration_minutes} Min` : 'N/A'}
              </div>
            </div>
            
            <div className="text-center md:col-span-1 col-span-2">
              <div className="bg-yellow-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-sm text-gray-500">Fahrpreis</div>
              <div className="text-xl font-bold text-green-600">
                CHF {routeData.total_fare ? routeData.total_fare.toFixed(2) : '0.00'}
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-green-700">Startpunkt</div>
                  <div className="text-gray-900">{origin}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pl-1">
                <div className="w-1 h-8 bg-gray-300 ml-1"></div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-red-700">Zielpunkt</div>
                  <div className="text-gray-900">{destination}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          {routeData.base_fare && (
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Preisaufschlüsselung</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Grundgebühr:</span>
                  <span className="font-medium">CHF {routeData.base_fare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Streckengebühr:</span>
                  <span className="font-medium">CHF {(routeData.total_fare - routeData.base_fare).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Gesamt:</span>
                  <span className="text-green-600">CHF {routeData.total_fare.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Google Maps Link */}
          <div className="text-center">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Route in Google Maps ansehen
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Route Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Route className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Routenhinweis</h4>
              <p className="text-sm text-blue-700">
                Die angezeigte Route und Fahrzeit basieren auf aktuellen Verkehrsdaten. 
                Bei starkem Verkehr oder Baustellen können Abweichungen auftreten.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteVisualization;