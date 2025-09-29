import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Loader2, Navigation } from 'lucide-react';

const GooglePlacesAutocomplete = ({ 
    onAddressSelect, 
    placeholder = "Schweizer Adresse eingeben...", 
    initialValue = "",
    disabled = false,
    className = "",
    showLocationButton = false,
    locationButtonText = "Mein Standort verwenden"
}) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [sessionToken, setSessionToken] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceTimer = useRef(null);
    const autocompleteService = useRef(null);
    const placesService = useRef(null);
    
    // Update input value when initialValue prop changes
    useEffect(() => {
        if (initialValue !== inputValue && initialValue !== "") {
            setInputValue(initialValue);
        }
    }, [initialValue]);
    useEffect(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            
            // Create a hidden div for PlacesService
            const div = document.createElement('div');
            placesService.current = new window.google.maps.places.PlacesService(div);
            
            // Generate session token for billing optimization
            if (window.google.maps.places.AutocompleteSessionToken) {
                setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
            }
        } else {
            console.error('Google Places API not loaded');
        }
    }, []);
    
    // Real Google Places API for worldwide address search
    const fetchSuggestions = useCallback(async (inputText) => {
        if (!autocompleteService.current || inputText.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        
        setIsLoading(true);
        
        const request = {
            input: inputText,
            // Improved configuration for better airport and Swiss address detection
            types: ['establishment', 'geocode'], // Include establishments (airports) and geocode
            language: 'de', // German for Swiss context
            sessionToken: sessionToken,
            // Bias results toward Switzerland and airports
            locationBias: {
                radius: 100000, // 100km radius
                center: { lat: 47.0502, lng: 8.3093 } // Center of Switzerland
            }
        };
        
        autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
            setIsLoading(false);
            
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                console.log('Google Places API success:', predictions);
                
                // Sort predictions to prioritize airports and specific locations
                const sortedPredictions = predictions.sort((a, b) => {
                    const aText = a.description.toLowerCase();
                    const bText = b.description.toLowerCase();
                    const inputLower = inputText.toLowerCase();
                    
                    // If searching for airport, prioritize airport results
                    if (inputLower.includes('flughafen') || inputLower.includes('airport')) {
                        const aIsAirport = aText.includes('flughafen') || aText.includes('airport') || aText.includes('zrh');
                        const bIsAirport = bText.includes('flughafen') || bText.includes('airport') || bText.includes('zrh');
                        
                        if (aIsAirport && !bIsAirport) return -1;
                        if (!aIsAirport && bIsAirport) return 1;
                    }
                    
                    // Prioritize exact matches
                    if (aText.includes(inputLower) && !bText.includes(inputLower)) return -1;
                    if (!aText.includes(inputLower) && bText.includes(inputLower)) return 1;
                    
                    return 0;
                });
                
                setSuggestions(sortedPredictions);
                setShowSuggestions(true);
                setSelectedIndex(-1);
            } else {
                console.error('Google Places API error:', status);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        });
    }, [sessionToken]);
    
    // Handle input changes with debouncing
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        
        // Always call onAddressSelect for manual input to enable the calculate button
        if (onAddressSelect) {
            const manualAddressData = {
                place_id: `manual_${Date.now()}`,
                formatted_address: value,
                coordinates: { lat: null, lng: null }
            };
            // Use setTimeout to ensure state update happens after input value change
            setTimeout(() => onAddressSelect(manualAddressData), 100);
        }
        
        // Clear existing timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        
        // Set new timer for debounced API call
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
    };
    
    // Handle suggestion selection - get real place details from Google
    const handleSuggestionSelect = async (prediction) => {
        if (!placesService.current) return;
        
        setInputValue(prediction.description);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        setSuggestions([]);
        
        const request = {
            placeId: prediction.place_id,
            fields: [
                'address_components', 
                'formatted_address', 
                'geometry', 
                'name', 
                'place_id'
            ],
            sessionToken: sessionToken
        };
        
        placesService.current.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                console.log('Place details:', place);
                const addressData = parseAddressComponents(place);
                onAddressSelect(addressData);
                
                // Generate new session token for next search
                if (window.google.maps.places.AutocompleteSessionToken) {
                    setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
                }
            } else {
                console.error('Place details error:', status);
                // Fallback - use basic data
                const addressData = {
                    place_id: prediction.place_id,
                    formatted_address: prediction.description,
                    coordinates: { lat: null, lng: null }
                };
                onAddressSelect(addressData);
            }
        });
    };
    
    // Get user's current location
    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert('Geolocation wird von Ihrem Browser nicht unterstützt');
            return;
        }
        
        setIsGettingLocation(true);
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    // Reverse geocoding to get address from coordinates
                    const geocoder = new window.google.maps.Geocoder();
                    const latlng = { lat: latitude, lng: longitude };
                    
                    geocoder.geocode({ location: latlng }, (results, status) => {
                        setIsGettingLocation(false);
                        
                        if (status === 'OK' && results[0]) {
                            const address = results[0].formatted_address;
                            setInputValue(address);
                            
                            // Create address data from geocoding result
                            const addressData = parseAddressComponents(results[0]);
                            addressData.coordinates = { lat: latitude, lng: longitude };
                            
                            onAddressSelect(addressData);
                        } else {
                            // Fallback: use coordinates as address
                            const coordsAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                            setInputValue(coordsAddress);
                            
                            onAddressSelect({
                                place_id: `coords_${Date.now()}`,
                                formatted_address: coordsAddress,
                                coordinates: { lat: latitude, lng: longitude }
                            });
                        }
                    });
                } catch (error) {
                    setIsGettingLocation(false);
                    console.error('Reverse geocoding error:', error);
                    
                    // Fallback: use coordinates as address
                    const coordsAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                    setInputValue(coordsAddress);
                    
                    onAddressSelect({
                        place_id: `coords_${Date.now()}`,
                        formatted_address: coordsAddress,
                        coordinates: { lat: latitude, lng: longitude }
                    });
                }
            },
            (error) => {
                setIsGettingLocation(false);
                let errorMessage = 'Standort konnte nicht ermittelt werden';
                
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Standortzugriff wurde verweigert. Bitte erlauben Sie den Zugriff in den Browser-Einstellungen.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Standortinformationen sind nicht verfügbar.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Zeitüberschreitung beim Ermitteln des Standorts.';
                        break;
                }
                
                alert(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    }, [onAddressSelect]);
    
    // Parse Google Places address components for Swiss addresses
    const parseAddressComponents = (place) => {
        const components = place.address_components || [];
        
        const getComponent = (type) => {
            const component = components.find(c => c.types.includes(type));
            return component ? component.long_name : null;
        };
        
        const getShortComponent = (type) => {
            const component = components.find(c => c.types.includes(type));
            return component ? component.short_name : null;
        };
        
        return {
            place_id: place.place_id,
            formatted_address: place.formatted_address,
            street_number: getComponent('street_number'),
            street_name: getComponent('route'),
            postal_code: getComponent('postal_code'),
            locality: getComponent('locality'),
            canton: getShortComponent('administrative_area_level_1'),
            country: getComponent('country'),
            coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
        };
    };
    
    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };
    
    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && 
                !suggestionsRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <div className={`relative w-full ${className}`}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled || isGettingLocation}
                    className={`w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 ${
                        disabled || isGettingLocation ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isLoading || isGettingLocation ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    ) : (
                        <MapPin className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>
            
            {/* Location Button */}
            {showLocationButton && (
                <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={disabled || isGettingLocation}
                    className={`mt-2 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200 ${
                        disabled || isGettingLocation ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <Navigation className="w-4 h-4 mr-2" />
                    {isGettingLocation ? 'Standort wird ermittelt...' : locationButtonText}
                </button>
            )}
            
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={suggestion.place_id}
                            type="button"
                            className={`w-full text-left px-4 py-3 hover:bg-yellow-50 border-b border-gray-100 last:border-b-0 ${
                                index === selectedIndex ? 'bg-yellow-50 border-yellow-200' : ''
                            }`}
                            onClick={() => handleSuggestionSelect(suggestion)}
                        >
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                        {suggestion.structured_formatting.main_text}
                                    </div>
                                    <div className="text-sm text-gray-600 truncate">
                                        {suggestion.structured_formatting.secondary_text}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GooglePlacesAutocomplete;