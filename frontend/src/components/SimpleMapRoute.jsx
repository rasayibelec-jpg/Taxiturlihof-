import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Navigation, Clock, DollarSign, Route } from "lucide-react";

const SimpleMapRoute = ({ 
  origin, 
  destination, 
  routeData, 
  showRoute = false
}) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const directionsRenderer = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    // Check if Google Maps is loaded
    if (window.google && window.google.maps && mapRef.current && !googleMapRef.current) {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (showRoute && routeData && googleMapRef.current && origin && destination) {
      displayRoute();
    }
  }, [showRoute, routeData, origin, destination]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    try {
      // Create map instance
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 9,
        center: { lat: 47.0502, lng: 8.3093 }, // Luzern center
        mapTypeId: 'roadmap'
      });

      googleMapRef.current = map;

      // Initialize directions renderer
      directionsRenderer.current = new window.google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: {
          strokeColor: '#EAB308', // Taxi yellow
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });

      setMapLoaded(true);
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  };

  const displayRoute = async () => {
    if (!googleMapRef.current || !directionsRenderer.current || !origin || !destination) {
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();

      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        region: 'CH',
        language: 'de'
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          // Display the route
          directionsRenderer.current.setDirections(result);

          // Extract basic route information
          const route = result.routes[0];
          const leg = route.legs[0];
          
          setRouteInfo({
            distance: leg.distance.text,
            duration: leg.duration.text,
            startAddress: leg.start_address,
            endAddress: leg.end_address
          });
        } else {
          console.error('Directions request failed:', status);
        }
      });

    } catch (error) {
      console.error('Error displaying route:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Route className="w-5 h-5 mr-2 text-yellow-600" />
            Routenanzeige
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={mapRef}
            className="w-full h-80 bg-gray-100"
          >
            {!mapLoaded && (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Karte wird geladen...</p>
                </div>
              </div>
            )}
            
            {mapLoaded && !showRoute && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="bg-white rounded-lg p-4 text-center shadow-lg">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-gray-700 font-medium">
                    Route berechnen für Kartenanzeige
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Route Information */}
      {routeInfo && showRoute && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Routendetails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Distanz</div>
                  <div className="font-semibold">{routeInfo.distance}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500">Fahrzeit</div>
                  <div className="font-semibold">{routeInfo.duration}</div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="border-t pt-3 space-y-2 text-sm">
              <div>
                <span className="font-medium text-green-600">Start:</span> {routeInfo.startAddress}
              </div>
              <div>
                <span className="font-medium text-red-600">Ziel:</span> {routeInfo.endAddress}
              </div>
            </div>

            {/* Price Display */}
            {routeData && routeData.total_fare && (
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-600" />
                    <span className="font-medium">Geschätzter Fahrpreis:</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    CHF {routeData.total_fare.toFixed(2)}
                  </div>
                </div>
                
                {routeData.base_fare && (
                  <div className="text-xs text-gray-500 mt-1">
                    Grundgebühr CHF {routeData.base_fare} + CHF {(routeData.total_fare - routeData.base_fare).toFixed(2)} Strecke
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleMapRoute;