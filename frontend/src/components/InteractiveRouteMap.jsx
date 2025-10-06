import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Navigation, Route, Zap, Mountain, Car, DollarSign } from "lucide-react";

const InteractiveRouteMap = ({ routes, onRouteSelect, selectedRoute, origin, destination }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const directionsRenderers = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  useEffect(() => {
    if (window.google && window.google.maps && routes && routes.length > 0) {
      initializeMap();
    }
  }, [routes]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Create map instance
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: { lat: 47.0502, lng: 8.3093 }, // Luzern center
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    googleMapRef.current = map;

    // Clear existing renderers
    directionsRenderers.current.forEach(renderer => renderer.setMap(null));
    directionsRenderers.current = [];

    // Create directions service
    const directionsService = new window.google.maps.DirectionsService();

    // Render all routes
    routes.forEach((route, index) => {
      const renderer = new window.google.maps.DirectionsRenderer({
        map: map,
        routeIndex: 0,
        polylineOptions: {
          strokeColor: routeColors[route.route_type] || '#6B7280',
          strokeWeight: selectedRoute === route.route_type ? 6 : 4,
          strokeOpacity: selectedRoute === route.route_type ? 0.9 : 0.6
        },
        suppressMarkers: false,
        suppressInfoWindows: true
      });

      // Decode polyline and create directions result
      const decodedPath = window.google.maps.geometry.encoding.decodePath(route.polyline);
      
      // Create a directions result object for the renderer
      const directionsResult = {
        routes: [{
          legs: [{
            start_address: route.origin_address,
            end_address: route.destination_address,
            distance: { text: `${route.distance_km} km`, value: route.distance_km * 1000 },
            duration: { text: `${route.duration_minutes} Min`, value: route.duration_minutes * 60 },
            steps: route.steps || []
          }],
          overview_path: decodedPath,
          overview_polyline: { points: route.polyline },
          bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(route.bounds.southwest.lat, route.bounds.southwest.lng),
            new window.google.maps.LatLng(route.bounds.northeast.lat, route.bounds.northeast.lng)
          )
        }]
      };

      renderer.setDirections(directionsResult);
      directionsRenderers.current.push(renderer);

      // Make route clickable
      renderer.addListener('click', () => {
        onRouteSelect(route.route_type);
      });
    });

    // Fit map to show all routes
    if (routes.length > 0 && routes[0].bounds) {
      const bounds = new window.google.maps.LatLngBounds();
      routes.forEach(route => {
        bounds.extend(new window.google.maps.LatLng(route.bounds.southwest.lat, route.bounds.southwest.lng));
        bounds.extend(new window.google.maps.LatLng(route.bounds.northeast.lat, route.bounds.northeast.lng));
      });
      map.fitBounds(bounds);
    }

    setMapLoaded(true);
  };

  // Update route highlighting when selection changes
  useEffect(() => {
    if (googleMapRef.current && directionsRenderers.current.length > 0) {
      directionsRenderers.current.forEach((renderer, index) => {
        const route = routes[index];
        if (route) {
          renderer.setOptions({
            polylineOptions: {
              strokeColor: routeColors[route.route_type] || '#6B7280',
              strokeWeight: selectedRoute === route.route_type ? 6 : 4,
              strokeOpacity: selectedRoute === route.route_type ? 0.9 : 0.6
            }
          });
        }
      });
    }
  }, [selectedRoute]);

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Routenoptionen auf der Karte
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={mapRef}
            className="w-full h-96 bg-gray-100 relative"
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600">Karte wird geladen...</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Route Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes && routes.map((route, index) => {
          const IconComponent = routeIcons[route.route_type] || Route;
          const isSelected = selectedRoute === route.route_type;
          
          return (
            <Card 
              key={route.route_type}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onRouteSelect(route.route_type)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${routeColors[route.route_type]}20` }}
                    >
                      <IconComponent 
                        className="w-5 h-5"
                        style={{ color: routeColors[route.route_type] }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{route.route_description}</h3>
                      <Badge 
                        variant="outline" 
                        style={{ 
                          borderColor: routeColors[route.route_type],
                          color: routeColors[route.route_type] 
                        }}
                      >
                        {route.route_type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      CHF {route.total_fare.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 mr-1" />
                    <span>{route.distance_km.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{route.duration_in_traffic_minutes} Min</span>
                  </div>
                </div>

                {route.warnings && route.warnings.length > 0 && (
                  <div className="mt-2 text-xs text-amber-600">
                    ⚠️ {route.warnings[0]}
                  </div>
                )}

                {isSelected && (
                  <Button 
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Route bereits ausgewählt - redirect to booking
                      window.location.href = '/buchen';
                    }}
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Diese Route buchen
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveRouteMap;