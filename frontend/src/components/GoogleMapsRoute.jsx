import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Navigation, Clock, DollarSign, Route } from "lucide-react";

const GoogleMapsRoute = ({ 
  origin, 
  destination, 
  routeData, 
  showRoute = false,
  onMapReady = null 
}) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const directionsRenderer = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps && mapRef.current) {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (showRoute && routeData && googleMapRef.current) {
      displayRoute();
    }
  }, [showRoute, routeData]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Create map instance centered on Luzern
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: { lat: 47.0502, lng: 8.3093 }, // Luzern
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'simplified' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    });

    googleMapRef.current = map;

    // Initialize directions renderer
    directionsRenderer.current = new window.google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#EAB308', // Taxi yellow
        strokeWeight: 5,
        strokeOpacity: 0.8
      }
    });

    setMapLoaded(true);
    
    if (onMapReady) {
      onMapReady(map);
    }
  };

  const displayRoute = async () => {
    if (!googleMapRef.current || !directionsRenderer.current || !origin || !destination) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        region: 'CH',
        language: 'de'
      };

      const result = await new Promise((resolve, reject) => {
        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            resolve(result);
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        });
      });

      // Display the route
      directionsRenderer.current.setDirections(result);

      // Extract route information
      const route = result.routes[0];
      const leg = route.legs[0];
      
      const info = {
        distance: leg.distance.text,
        duration: leg.duration.text,
        startAddress: leg.start_address,
        endAddress: leg.end_address,
        steps: leg.steps.map(step => ({
          instruction: step.instructions.replace(/<[^>]*>/g, ''), // Remove HTML tags
          distance: step.distance.text,
          duration: step.duration.text
        }))
      };

      setRouteInfo(info);

      // Add custom markers for better visibility
      addCustomMarkers(leg.start_location, leg.end_location);

    } catch (error) {
      console.error('Error displaying route:', error);
    }
  };

  const addCustomMarkers = (startLocation, endLocation) => {
    // Start marker (green)
    new window.google.maps.Marker({
      position: startLocation,
      map: googleMapRef.current,
      title: 'Startpunkt',
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
            <path fill="#10B981" stroke="#ffffff" stroke-width="2" d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 26 16 26s16-17.163 16-26C32 7.163 24.837 0 16 0z"/>
            <circle fill="#ffffff" cx="16" cy="16" r="6"/>
            <text x="16" y="20" text-anchor="middle" fill="#10B981" font-size="10" font-weight="bold">S</text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 42)
      }
    });

    // End marker (red)
    new window.google.maps.Marker({
      position: endLocation,
      map: googleMapRef.current,
      title: 'Zielpunkt',
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
            <path fill="#EF4444" stroke="#ffffff" stroke-width="2" d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 26 16 26s16-17.163 16-26C32 7.163 24.837 0 16 0z"/>
            <circle fill="#ffffff" cx="16" cy="16" r="6"/>
            <text x="16" y="20" text-anchor="middle" fill="#EF4444" font-size="10" font-weight="bold">Z</text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 42)
      }
    });
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
            className="w-full h-80 bg-gray-100 relative"
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
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
                    Geben Sie Start und Ziel ein
                  </p>
                  <p className="text-sm text-gray-500">
                    Die Route wird hier angezeigt
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
            {routeData && (
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-600" />
                    <span className="font-medium">Geschätzter Fahrpreis:</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    CHF {routeData.total_fare ? routeData.total_fare.toFixed(2) : '0.00'}
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

export default GoogleMapsRoute;