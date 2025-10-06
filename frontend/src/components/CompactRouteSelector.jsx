import React, { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Navigation, Zap, Mountain, CheckCircle, ArrowRight } from "lucide-react";

const CompactRouteSelector = ({ routes, onRouteSelect, selectedRoute }) => {
  // Color scheme for route types
  const routeColors = {
    fastest: '#10B981',      // Emerald - schnellste
    scenic: '#F59E0B'        // Amber - landschaftlich
  };

  // Icons for route types
  const routeIcons = {
    fastest: Zap,
    scenic: Mountain
  };

  if (!routes || routes.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        Keine Routen verfügbar
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🗺️ Wählen Sie Ihre Route
        </h3>
        <p className="text-sm text-gray-600">
          Klicken Sie auf eine Route für Details
        </p>
      </div>

      {/* Compact Route Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {routes.map((route) => {
          const IconComponent = routeIcons[route.route_type] || Zap;
          const isSelected = selectedRoute === route.route_type;
          const routeColor = routeColors[route.route_type] || '#6B7280';
          
          return (
            <Card 
              key={route.route_type}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'ring-2 bg-blue-50 shadow-md' 
                  : 'hover:bg-gray-50'
              }`}
              style={{ 
                borderColor: isSelected ? routeColor : '#E5E7EB'
              }}
              onClick={() => onRouteSelect(route.route_type)}
            >
              <CardContent className="p-4">
                {/* Route Header - Compact */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${routeColor}20` }}
                    >
                      <IconComponent 
                        className="w-4 h-4"
                        style={{ color: routeColor }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-gray-900">
                        {route.route_description}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className="text-xs mt-1"
                        style={{ 
                          borderColor: routeColor,
                          color: routeColor 
                        }}
                      >
                        {route.route_type}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Price - Prominent but Compact */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      CHF {route.total_fare.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Route Stats - Inline */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Navigation className="w-3 h-3 mr-1" />
                    <span>{route.distance_km.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{route.duration_in_traffic_minutes} Min</span>
                  </div>
                </div>

                {/* Route Benefits - Compact */}
                <div className="mb-3">
                  {route.route_type === 'fastest' && (
                    <div className="flex items-center text-xs text-green-600">
                      <Zap className="w-3 h-3 mr-1" />
                      <span>Optimiert für Geschwindigkeit</span>
                    </div>
                  )}
                  {route.route_type === 'scenic' && (
                    <div className="flex items-center text-xs text-amber-600">
                      <Mountain className="w-3 h-3 mr-1" />
                      <span>Schöne Landschaftsroute</span>
                    </div>
                  )}
                </div>

                {/* Traffic Warning - Compact */}
                {route.traffic_factor > 1.2 && (
                  <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1 mb-3">
                    <div className="text-xs text-amber-700">
                      ⚠️ Verkehr +{Math.round((route.traffic_factor - 1) * 100)}%
                    </div>
                  </div>
                )}

                {/* Action Button - Smaller */}
                {isSelected ? (
                  <Button 
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/buchen?route=${route.route_type}&price=${route.total_fare.toFixed(2)}`;
                    }}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Jetzt buchen
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full text-sm py-2 hover:bg-gray-50"
                    style={{ 
                      borderColor: routeColor,
                      color: routeColor 
                    }}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Auswählen
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Comparison - Compact */}
      {routes && routes.length === 2 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <div className="text-xs text-gray-500">Zeitdifferenz</div>
                <div className="font-semibold text-sm">
                  {Math.abs(routes[0].duration_in_traffic_minutes - routes[1].duration_in_traffic_minutes)} Min
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Preisdifferenz</div>
                <div className="font-semibold text-sm">
                  CHF {Math.abs(routes[0].total_fare - routes[1].total_fare).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompactRouteSelector;