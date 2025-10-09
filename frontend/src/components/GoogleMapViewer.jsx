import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, ExternalLink, Map } from "lucide-react";

const GoogleMapViewer = ({ 
  origin, 
  destination, 
  showMap = false
}) => {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    if (showMap && origin && destination) {
      // Wait a bit for Google Maps to be ready
      timeoutId = setTimeout(() => {
        initializeMap();
      }, 1000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showMap, origin, destination]);

  const initializeMap = () => {
    if (!window.google || !window.google.maps || !mapRef.current) {
      setMapError(true);
      return;
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 47.0502, lng: 8.3093 }, // Luzern
        mapTypeId: 'roadmap'
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: {
          strokeColor: '#EAB308',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });

      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions error:', status);
          setMapError(true);
        }
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(true);
    }
  };

  const getGoogleMapsUrl = () => {
    if (!origin || !destination) return '#';
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    return `https://www.google.com/maps/dir/${encodedOrigin}/${encodedDestination}`;
  };

  if (!showMap) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Berechnen Sie eine Route für die Kartenanzeige</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Map className="w-5 h-5 mr-2 text-blue-600" />
            Routenkarte
          </div>
          <a
            href={getGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Externe Karte
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {mapError ? (
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-3">Karte konnte nicht geladen werden</p>
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                In Google Maps öffnen
              </a>
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef}
            className="h-64 w-full bg-gray-100"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMapViewer;