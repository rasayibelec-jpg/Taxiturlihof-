import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Navigation, Route, Zap, Mountain, Car, DollarSign, CheckCircle } from "lucide-react";

const SimpleInteractiveRoutes = ({ routes, onRouteSelect, selectedRoute }) => {
  // Color scheme for different route types
  const routeColors = {
    fastest: '#10B981',      // Emerald - schnellste
    shortest: '#3B82F6',     // Blue - kürzeste  
    scenic: '#F59E0B',       // Amber - landschaftlich
    avoid_highways: '#EF4444' // Red - ohne Autobahn
  };

  // Icons for route types
  const routeIcons = {
    fastest: Zap,
    shortest: Navigation, 
    scenic: Mountain,
    avoid_highways: Car
  };

  const getRouteAdvantage = (route) => {
    if (!routes || routes.length < 2) return null;
    
    const allTimes = routes.map(r => r.duration_in_traffic_minutes);
    const allDistances = routes.map(r => r.distance_km);
    const allPrices = routes.map(r => r.total_fare);
    
    const minTime = Math.min(...allTimes);
    const minDistance = Math.min(...allDistances);
    const minPrice = Math.min(...allPrices);
    
    if (route.duration_in_traffic_minutes === minTime) {
      return { type: 'time', text: 'Schnellste', color: 'green' };
    }
    if (route.distance_km === minDistance) {
      return { type: 'distance', text: 'Kürzeste', color: 'blue' };
    }
    if (route.total_fare === minPrice) {
      return { type: 'price', text: 'Günstigste', color: 'emerald' };
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Route Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Route className="w-6 h-6 mr-2 text-blue-600" />
            🗺️ {routes?.length || 0} Routenoptionen verfügbar
          </CardTitle>
          <p className="text-gray-600">
            Wählen Sie die beste Route für Ihre Bedürfnisse. Alle Preise basieren auf aktuellen Verkehrsdaten.
          </p>
        </CardHeader>
      </Card>

      {/* Route Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes && routes.map((route, index) => {
          const IconComponent = routeIcons[route.route_type] || Route;
          const isSelected = selectedRoute === route.route_type;
          const advantage = getRouteAdvantage(route);
          
          return (
            <Card 
              key={route.route_type}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                isSelected 
                  ? 'ring-4 ring-blue-400 bg-blue-50 shadow-2xl scale-105' 
                  : 'hover:bg-gray-50 shadow-lg'
              }`}
              onClick={() => onRouteSelect(route.route_type)}
            >
              <CardContent className="p-6">
                {/* Header with Icon and Advantage Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md"
                      style={{ backgroundColor: `${routeColors[route.route_type]}20` }}
                    >
                      <IconComponent 
                        className="w-6 h-6"
                        style={{ color: routeColors[route.route_type] }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{route.route_description}</h3>
                      <Badge 
                        variant="outline" 
                        className="mt-1"
                        style={{ 
                          borderColor: routeColors[route.route_type],
                          color: routeColors[route.route_type] 
                        }}
                      >
                        {route.route_type}
                      </Badge>
                    </div>
                  </div>
                  
                  {advantage && (
                    <Badge 
                      className={`bg-${advantage.color}-100 text-${advantage.color}-700 border-${advantage.color}-200`}
                    >
                      ⭐ {advantage.text}
                    </Badge>
                  )}
                </div>

                {/* Price Display */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    CHF {route.total_fare.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Grundgebühr CHF {route.base_fare} + CHF {route.distance_fare.toFixed(2)} Strecke
                  </div>
                </div>
                
                {/* Route Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Navigation className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <div className="text-sm text-gray-600">Distanz</div>
                    <div className="font-semibold">{route.distance_km.toFixed(1)} km</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-green-600" />
                    <div className="text-sm text-gray-600">Fahrzeit</div>
                    <div className="font-semibold">{route.duration_in_traffic_minutes} Min</div>
                  </div>
                </div>

                {/* Traffic Info */}
                {route.traffic_factor > 1.2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-amber-700 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Erhöhtes Verkehrsaufkommen (+{Math.round((route.traffic_factor - 1) * 100)}%)
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {route.warnings && route.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="text-yellow-800 text-sm">
                      ⚠️ {route.warnings[0]}
                    </div>
                  </div>
                )}

                {/* Route Features */}
                <div className="space-y-2 mb-4">
                  {route.route_type === 'fastest' && (
                    <div className="flex items-center text-sm text-green-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimiert für minimale Fahrzeit
                    </div>
                  )}
                  {route.route_type === 'shortest' && (
                    <div className="flex items-center text-sm text-blue-600">
                      <Navigation className="w-4 h-4 mr-2" />
                      Kürzeste Strecke, weniger Kraftstoff
                    </div>
                  )}
                  {route.route_type === 'scenic' && (
                    <div className="flex items-center text-sm text-amber-600">
                      <Mountain className="w-4 h-4 mr-2" />
                      Landschaftlich schöne Route
                    </div>
                  )}
                  {route.route_type === 'avoid_highways' && (
                    <div className="flex items-center text-sm text-red-600">
                      <Car className="w-4 h-4 mr-2" />
                      Entspannte Fahrt ohne Autobahnen
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {isSelected ? (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/buchen?route=${route.route_type}&price=${route.total_fare.toFixed(2)}`;
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Diese Route buchen - CHF {route.total_fare.toFixed(2)}
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="w-full hover:bg-blue-50"
                    style={{ 
                      borderColor: routeColors[route.route_type],
                      color: routeColors[route.route_type] 
                    }}
                  >
                    Route auswählen
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Summary */}
      {routes && routes.length > 1 && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 text-center">📊 Vergleichsübersicht</h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-gray-600">Zeit-Spanne</div>
                <div className="font-semibold">
                  {Math.min(...routes.map(r => r.duration_in_traffic_minutes))} - {Math.max(...routes.map(r => r.duration_in_traffic_minutes))} Min
                </div>
              </div>
              <div>
                <div className="text-gray-600">Distanz-Spanne</div>
                <div className="font-semibold">
                  {Math.min(...routes.map(r => r.distance_km)).toFixed(1)} - {Math.max(...routes.map(r => r.distance_km)).toFixed(1)} km
                </div>
              </div>
              <div>
                <div className="text-gray-600">Preis-Spanne</div>
                <div className="font-semibold">
                  CHF {Math.min(...routes.map(r => r.total_fare)).toFixed(2)} - CHF {Math.max(...routes.map(r => r.total_fare)).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleInteractiveRoutes;