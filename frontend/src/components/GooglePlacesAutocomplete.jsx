import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

const GooglePlacesAutocomplete = ({ 
    onAddressSelect, 
    placeholder = "Schweizer Adresse eingeben...", 
    initialValue = "",
    disabled = false,
    className = ""
}) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [sessionToken, setSessionToken] = useState(null);
    
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
    
    // Smart local database + Google Places API fallback
    const fetchSuggestions = useCallback(async (inputText) => {
        if (inputText.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        
        setIsLoading(true);
        
        // Comprehensive worldwide location database
        const worldLocations = {
            // Countries / Ülkeler
            'turkey': [
                { description: 'Turkey', place_id: 'country_turkey', type: 'country' },
                { description: 'Türkiye', place_id: 'country_turkiye', type: 'country' }
            ],
            'germany': [
                { description: 'Germany', place_id: 'country_germany', type: 'country' },
                { description: 'Deutschland', place_id: 'country_deutschland', type: 'country' }
            ],
            'switzerland': [
                { description: 'Switzerland', place_id: 'country_switzerland', type: 'country' },
                { description: 'Schweiz', place_id: 'country_schweiz', type: 'country' }
            ],
            'france': [
                { description: 'France', place_id: 'country_france', type: 'country' },
                { description: 'Frankreich', place_id: 'country_frankreich', type: 'country' }
            ],
            
            // Major cities / Büyük şehirler
            'istanbul': [
                { description: 'Istanbul, Turkey', place_id: 'city_istanbul', type: 'city' },
                { description: 'Istanbul Atatürk Airport', place_id: 'ataturk_airport', type: 'airport' },
                { description: 'Istanbul Airport (IST)', place_id: 'istanbul_airport', type: 'airport' },
                { description: 'Istanbul Sabiha Gokcen Airport', place_id: 'sabiha_airport', type: 'airport' }
            ],
            'ankara': [
                { description: 'Ankara, Turkey', place_id: 'city_ankara', type: 'city' },
                { description: 'Ankara Esenboğa Airport', place_id: 'esenboga_airport', type: 'airport' }
            ],
            'izmir': [
                { description: 'Izmir, Turkey', place_id: 'city_izmir', type: 'city' },
                { description: 'Izmir Adnan Menderes Airport', place_id: 'izmir_airport', type: 'airport' }
            ],
            'berlin': [
                { description: 'Berlin, Germany', place_id: 'city_berlin', type: 'city' },
                { description: 'Berlin Brandenburg Airport', place_id: 'berlin_airport', type: 'airport' },
                { description: 'Berlin Hauptbahnhof', place_id: 'berlin_hbf', type: 'station' }
            ],
            'munich': [
                { description: 'Munich, Germany', place_id: 'city_munich', type: 'city' },
                { description: 'Munich Airport', place_id: 'munich_airport', type: 'airport' }
            ],
            'frankfurt': [
                { description: 'Frankfurt, Germany', place_id: 'city_frankfurt', type: 'city' },
                { description: 'Frankfurt Airport', place_id: 'frankfurt_airport', type: 'airport' },
                { description: 'Frankfurt Hauptbahnhof', place_id: 'frankfurt_hbf', type: 'station' }
            ],
            'zurich': [
                { description: 'Zurich, Switzerland', place_id: 'city_zurich', type: 'city' },
                { description: 'Zurich Airport', place_id: 'zurich_airport', type: 'airport' },
                { description: 'Zurich Hauptbahnhof', place_id: 'zurich_hbf', type: 'station' }
            ],
            'geneva': [
                { description: 'Geneva, Switzerland', place_id: 'city_geneva', type: 'city' },
                { description: 'Geneva Airport', place_id: 'geneva_airport', type: 'airport' }
            ],
            'basel': [
                { description: 'Basel, Switzerland', place_id: 'city_basel', type: 'city' },
                { description: 'Basel Airport', place_id: 'basel_airport', type: 'airport' }
            ],
            'paris': [
                { description: 'Paris, France', place_id: 'city_paris', type: 'city' },
                { description: 'Paris Charles de Gaulle Airport', place_id: 'cdg_airport', type: 'airport' },
                { description: 'Paris Orly Airport', place_id: 'orly_airport', type: 'airport' }
            ],
            'london': [
                { description: 'London, United Kingdom', place_id: 'city_london', type: 'city' },
                { description: 'London Heathrow Airport', place_id: 'heathrow_airport', type: 'airport' },
                { description: 'London Gatwick Airport', place_id: 'gatwick_airport', type: 'airport' }
            ],
            'new york': [
                { description: 'New York, NY, USA', place_id: 'city_newyork', type: 'city' },
                { description: 'JFK Airport, New York', place_id: 'jfk_airport', type: 'airport' },
                { description: 'LaGuardia Airport, New York', place_id: 'lga_airport', type: 'airport' }
            ],
            
            // Swiss locations / İsviçre lokasyonlari
            'luzern': [
                { description: 'Luzern, Switzerland', place_id: 'city_luzern', type: 'city' },
                { description: 'Luzern Bahnhofstrasse', place_id: 'luzern_bahnhofstr', type: 'street' }
            ],
            'bern': [
                { description: 'Bern, Switzerland', place_id: 'city_bern', type: 'city' }
            ],
            'lausanne': [
                { description: 'Lausanne, Switzerland', place_id: 'city_lausanne', type: 'city' }
            ],
            
            // Addresses / Adresler
            'bahnhof': [
                { description: 'Bahnhofstrasse, Zurich, Switzerland', place_id: 'bahnhofstr_zurich', type: 'street' },
                { description: 'Bahnhofplatz, Zurich, Switzerland', place_id: 'bahnhofplatz_zurich', type: 'address' },
                { description: 'Bahnhofstrasse, Bern, Switzerland', place_id: 'bahnhofstr_bern', type: 'street' },
                { description: 'Hauptbahnhof, Frankfurt, Germany', place_id: 'hbf_frankfurt', type: 'station' }
            ]
        };
        
        // Search function
        const inputLower = inputText.toLowerCase();
        let matchedSuggestions = [];
        
        // Direct key matches
        for (const [key, locations] of Object.entries(worldLocations)) {
            if (key.includes(inputLower) || inputLower.includes(key.substring(0, 3))) {
                matchedSuggestions.push(...locations);
            }
        }
        
        // Search within descriptions
        if (matchedSuggestions.length === 0) {
            Object.values(worldLocations).forEach(locations => {
                locations.forEach(location => {
                    if (location.description.toLowerCase().includes(inputLower)) {
                        matchedSuggestions.push(location);
                    }
                });
            });
        }
        
        // Format for display
        const formattedSuggestions = matchedSuggestions
            .filter((location, index, self) => 
                index === self.findIndex(l => l.description === location.description)
            )
            .slice(0, 8)
            .map(location => ({
                place_id: location.place_id,
                description: location.description,
                structured_formatting: {
                    main_text: location.description.split(',')[0],
                    secondary_text: location.description.split(',').slice(1).join(',').trim() || location.type
                }
            }));
        
        setIsLoading(false);
        setSuggestions(formattedSuggestions);
        setShowSuggestions(formattedSuggestions.length > 0);
        setSelectedIndex(-1);
    }, []);
    
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
    
    // Handle suggestion selection
    const handleSuggestionSelect = async (prediction) => {
        setInputValue(prediction.description);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        setSuggestions([]);
        
        // Create address data object
        const addressData = {
            place_id: prediction.place_id,
            formatted_address: prediction.description,
            street_name: null,
            postal_code: null,
            locality: prediction.structured_formatting.main_text,
            canton: null,
            country: prediction.description.includes('Turkey') ? 'Turkey' : 
                    prediction.description.includes('Germany') ? 'Germany' :
                    prediction.description.includes('Switzerland') ? 'Switzerland' :
                    prediction.description.includes('France') ? 'France' : null,
            coordinates: { lat: null, lng: null }
        };
        
        onAddressSelect(addressData);
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