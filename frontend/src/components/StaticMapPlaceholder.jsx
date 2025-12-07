import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const StaticMapPlaceholder = ({ onLoadMap }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    if (window.loadGoogleMaps) {
      window.loadGoogleMaps();
    }
    if (onLoadMap) {
      onLoadMap();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="relative cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      style={{ minHeight: '400px' }}
    >
      {/* Static Map Image (Google Static Maps API) */}
      <img
        src="https://maps.googleapis.com/maps/api/staticmap?center=47.0448,8.6266&zoom=13&size=600x400&markers=color:yellow|47.0448,8.6266&key=AIzaSyBmJZ8Ux7_U_hWKlE50UgI8QJ-Q5wLxBfI"
        alt="Taxi Türlihof Standort - Klicken für interaktive Karte"
        className="w-full h-full object-cover"
        width="600"
        height="400"
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <MapPin className="w-16 h-16 mx-auto mb-3" />
          <p className="text-xl font-semibold mb-2">Interaktive Karte laden</p>
          <p className="text-sm">Klicken Sie hier</p>
          {isLoading && (
            <div className="mt-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticMapPlaceholder;
