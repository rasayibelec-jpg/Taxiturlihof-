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
    
    // Initialize Google Places services
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
            // No country restrictions - worldwide search
            types: [], // Empty array means all types: address, establishment, geocode
            language: 'en', // English for better international results
            sessionToken: sessionToken
        };
        
        autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
            setIsLoading(false);
            
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                console.log('Google Places API success:', predictions);
                setSuggestions(predictions);
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
                    disabled={disabled}
                    className={`w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 ${
                        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    ) : (
                        <MapPin className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.place_id}
                            className={`px-4 py-3 cursor-pointer hover:bg-yellow-50 border-b border-gray-100 last:border-b-0 ${
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GooglePlacesAutocomplete;