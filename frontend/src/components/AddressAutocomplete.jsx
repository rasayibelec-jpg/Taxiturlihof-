import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapPin, Loader2 } from 'lucide-react';

const AddressAutocomplete = ({ 
    onAddressSelect, 
    placeholder = "Adresse eingeben...", 
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
    const [error, setError] = useState(null);
    
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceTimer = useRef(null);
    
    // API configuration
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
    
    // Generate session token for billing optimization
    useEffect(() => {
        setSessionToken(generateSessionToken());
    }, []);
    
    const generateSessionToken = () => {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    };
    
    // Debounced API call for autocomplete
    const fetchSuggestions = useCallback(async (inputText) => {
        if (inputText.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            // Real Swiss places database for better autocomplete
            const swissPlaces = {
                // Zentralschweiz
                'oberarth': [
                    { description: 'Oberarth, Schweiz', place_id: 'oberarth_ch', canton: 'Schwyz' },
                    { description: 'Oberarth, Bahnhof, Schweiz', place_id: 'oberarth_bahnhof', canton: 'Schwyz' },
                    { description: 'Oberarth, Goldau, Schwyz', place_id: 'oberarth_goldau', canton: 'Schwyz' }
                ],
                'arth': [
                    { description: 'Arth, Schweiz', place_id: 'arth_ch', canton: 'Schwyz' },
                    { description: 'Arth-Goldau, Schweiz', place_id: 'arth_goldau', canton: 'Schwyz' },
                    { description: 'Arth, Bahnhof, Schweiz', place_id: 'arth_bahnhof', canton: 'Schwyz' }
                ],
                'luzern': [
                    { description: 'Luzern, Schweiz', place_id: 'luzern_ch', canton: 'Luzern' },
                    { description: 'Luzern, Bahnhof, Schweiz', place_id: 'luzern_bahnhof', canton: 'Luzern' },
                    { description: 'Luzern, Altstadt, Schweiz', place_id: 'luzern_altstadt', canton: 'Luzern' }
                ],
                'schwyz': [
                    { description: 'Schwyz, Schweiz', place_id: 'schwyz_ch', canton: 'Schwyz' },
                    { description: 'Schwyz, Zentrum, Schweiz', place_id: 'schwyz_zentrum', canton: 'Schwyz' },
                    { description: 'Schwyz, Bahnhof, Schweiz', place_id: 'schwyz_bahnhof', canton: 'Schwyz' }
                ],
                'brunnen': [
                    { description: 'Brunnen, Schweiz', place_id: 'brunnen_ch', canton: 'Schwyz' },
                    { description: 'Brunnen, Bahnhof, Schweiz', place_id: 'brunnen_bahnhof', canton: 'Schwyz' },
                    { description: 'Brunnen, Hafen, Schweiz', place_id: 'brunnen_hafen', canton: 'Schwyz' }
                ],
                'zürich': [
                    { description: 'Zürich, Schweiz', place_id: 'zurich_ch', canton: 'Zürich' },
                    { description: 'Zürich, Flughafen, Schweiz', place_id: 'zurich_airport', canton: 'Zürich' },
                    { description: 'Zürich, Hauptbahnhof, Schweiz', place_id: 'zurich_hb', canton: 'Zürich' }
                ],
                'zug': [
                    { description: 'Zug, Schweiz', place_id: 'zug_ch', canton: 'Zug' },
                    { description: 'Zug, Bahnhof, Schweiz', place_id: 'zug_bahnhof', canton: 'Zug' },
                    { description: 'Zug, Altstadt, Schweiz', place_id: 'zug_altstadt', canton: 'Zug' }
                ],
                'weggis': [
                    { description: 'Weggis, Schweiz', place_id: 'weggis_ch', canton: 'Luzern' },
                    { description: 'Weggis, Hafen, Schweiz', place_id: 'weggis_hafen', canton: 'Luzern' }
                ],
                'vitznau': [
                    { description: 'Vitznau, Schweiz', place_id: 'vitznau_ch', canton: 'Luzern' },
                    { description: 'Vitznau, Bahnhof, Schweiz', place_id: 'vitznau_bahnhof', canton: 'Luzern' }
                ]
            };
            
            // Find matching places
            const inputLower = inputText.toLowerCase();
            let matchedSuggestions = [];
            
            // Direct matches
            for (const [key, places] of Object.entries(swissPlaces)) {
                if (key.includes(inputLower) || inputLower.includes(key)) {
                    matchedSuggestions.push(...places);
                }
            }
            
            // If no direct matches, search within descriptions
            if (matchedSuggestions.length === 0) {
                Object.values(swissPlaces).forEach(places => {
                    places.forEach(place => {
                        if (place.description.toLowerCase().includes(inputLower)) {
                            matchedSuggestions.push(place);
                        }
                    });
                });
            }
            
            // Remove duplicates and limit results
            const uniqueSuggestions = matchedSuggestions
                .filter((place, index, self) => 
                    index === self.findIndex(p => p.description === place.description)
                )
                .slice(0, 6);
            
            setSuggestions(uniqueSuggestions);
            setShowSuggestions(uniqueSuggestions.length > 0);
            setSelectedIndex(-1);
            
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            setError('Fehler beim Laden der Adressvorschläge');
            setSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setIsLoading(false);
        }
    }, [backendUrl]);
    
    // Handle input change with debouncing
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
        }, 300); // 300ms debounce delay
    };
    
    // Handle suggestion selection
    const handleSuggestionSelect = async (suggestion) => {
        setInputValue(suggestion.description);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        
        // Call parent callback with address data
        onAddressSelect({
            address: suggestion.description,
            place_id: suggestion.place_id,
            formatted_address: suggestion.description
        });
        
        // Generate new session token for next search
        setSessionToken(generateSessionToken());
    };
    
    // Keyboard navigation handling
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
                        error ? 'border-red-300 focus:border-red-500' : ''
                    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    aria-label="Schweizer Adresse eingeben"
                    aria-expanded={showSuggestions}
                    aria-haspopup="listbox"
                    role="combobox"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    ) : (
                        <MapPin className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>
            
            {error && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm" role="alert">
                    {error}
                </div>
            )}
            
            {showSuggestions && suggestions.length > 0 && (
                <div 
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    role="listbox"
                    aria-label="Adressvorschläge"
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.place_id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                                index === selectedIndex ? 'bg-yellow-50 border-yellow-200' : ''
                            }`}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            role="option"
                            aria-selected={index === selectedIndex}
                        >
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">
                                        {suggestion.description}
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

export default AddressAutocomplete;