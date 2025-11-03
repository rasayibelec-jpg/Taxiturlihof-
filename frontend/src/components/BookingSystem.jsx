import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Calendar, Clock, MapPin, Navigation, Users, Car, Phone, Mail, 
  CheckCircle, AlertCircle, ArrowRight, Plus, Minus 
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import PaymentSelection from "./PaymentSelection";
import './BookingSystem.css';
// Simple inputs without GooglePlaces complexity

const BookingSystem = () => {
  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickupLocation: "",
    destination: "",
    additionalStops: [],
    bookingType: "scheduled", // Always scheduled - no user choice
    pickupDate: "",
    pickupTime: "",
    passengerCount: 1,
    vehicleType: "standard",
    waitingTimeHours: 0, // Wartezeit in Stunden
    specialRequests: ""
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [showEstimate, setShowEstimate] = useState(false);
  const [currentStep, setCurrentStep] = useState('booking'); // booking, payment
  const [bookingId, setBookingId] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  const vehicleTypes = {
    standard: { name: "Standard", description: "Komfortables Fahrzeug für bis zu 4 Personen", multiplier: 1.0 },
    premium: { name: "Premium", description: "Luxusfahrzeug mit erweiterten Annehmlichkeiten", multiplier: 1.2 },
    van: { name: "Van", description: "Großes Fahrzeug für bis zu 8 Personen oder viel Gepäck", multiplier: 1.25 }
  };

  // Get today's date for min date restriction (Schweizer Zeit)
  const today = new Date(new Date().getTime() + (2 * 60 * 60 * 1000)).toISOString().split('T')[0]; // UTC+2 für Schweiz

  // Geolocation function
  const getCurrentLocation = async (fieldName) => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation nicht unterstützt",
        description: "Ihr Browser unterstützt keine Standortbestimmung.",
        variant: "destructive"
      });
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use Google Geocoding API to get address from coordinates
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=de`
          );
          
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            handleInputChange(fieldName, address);
            
            toast({
              title: "📍 Standort gefunden",
              description: "Ihr aktueller Standort wurde eingetragen.",
            });
          } else {
            throw new Error("Adresse konnte nicht gefunden werden");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          toast({
            title: "Adresse nicht gefunden",
            description: "Standort konnte nicht in eine Adresse umgewandelt werden.",
            variant: "destructive"
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        // Einfache, kurze Meldung ohne Details
        toast({
          title: "Standort nicht verfügbar",
          description: "Bitte geben Sie den Ort manuell ein.",
          variant: "default",
          duration: 3000
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset estimate when location changes
    if (field === 'pickupLocation' || field === 'destination' || field === 'vehicleType') {
      setEstimatedPrice(null);
      setShowEstimate(false);
    }
  };

  const addAdditionalStop = () => {
    setBookingData(prev => ({
      ...prev,
      additionalStops: [...prev.additionalStops, ""]
    }));
  };

  const removeAdditionalStop = (index) => {
    setBookingData(prev => ({
      ...prev,
      additionalStops: prev.additionalStops.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalStop = (index, value) => {
    setBookingData(prev => ({
      ...prev,
      additionalStops: prev.additionalStops.map((stop, i) => i === index ? value : stop)
    }));
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.get(`${backendUrl}/api/availability?date=${date}`);
      setAvailableSlots(response.data.available_slots);
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      setAvailableSlots([]);
    }
  };

  const calculateEstimate = async () => {
    if (!bookingData.pickupLocation || !bookingData.destination) {
      toast({
        title: "Fehlende Eingaben",
        description: "Bitte geben Sie Start- und Zieladresse ein.",
        variant: "destructive"
      });
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.post(`${backendUrl}/api/calculate-price`, {
        origin: bookingData.pickupLocation,
        destination: bookingData.destination,
        departure_time: new Date().toISOString()
      });

      if (response.data) {
        const basePrice = response.data.total_fare;
        const vehicleMultiplier = vehicleTypes[bookingData.vehicleType].multiplier;
        const estimatedTotal = basePrice * vehicleMultiplier; // Removed +5 CHF booking fee

        setEstimatedPrice({
          ...response.data,
          vehicle_adjusted_fare: estimatedTotal,
          vehicle_type: bookingData.vehicleType
        });
        setShowEstimate(true);
      }
    } catch (error) {
      toast({
        title: "Schätzung fehlgeschlagen",
        description: "Preisschätzung konnte nicht berechnet werden.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate required fields - always requires date/time since it's always scheduled
      const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'pickupLocation', 'destination', 'pickupDate', 'pickupTime'];

      const missingFields = requiredFields.filter(field => !bookingData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Bitte füllen Sie alle Pflichtfelder aus: ${missingFields.join(', ')}`);
      }

      // Create pickup datetime - treat user input as Swiss local time
      // Format: YYYY-MM-DDTHH:MM:SS (without Z, so backend treats it as local Swiss time)
      const pickupDatetime = `${bookingData.pickupDate}T${bookingData.pickupTime}:00`;

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.post(`${backendUrl}/api/bookings`, {
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        pickup_location: bookingData.pickupLocation,
        destination: bookingData.destination,
        additional_stops: bookingData.additionalStops.filter(stop => stop.trim()),
        booking_type: bookingData.bookingType,
        pickup_datetime: pickupDatetime,
        passenger_count: parseInt(bookingData.passengerCount),
        vehicle_type: bookingData.vehicleType,
        waiting_time_hours: parseFloat(bookingData.waitingTimeHours) || 0,
        special_requests: bookingData.specialRequests || null
      });

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message,
          bookingId: response.data.booking_id
        });

        setBookingId(response.data.booking_id);
        setCurrentStep('payment');

        toast({
          title: "✅ Buchung erfolgreich!",
          description: `Buchungsnummer: ${response.data.booking_id.slice(0, 8)}. Bitte wählen Sie eine Zahlungsmethode.`,
        });

        // Don't reset form - wait for payment completion
      }

    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.message || 
                          'Buchung konnte nicht erstellt werden.';
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
      
      toast({
        title: "❌ Buchungsfehler",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch available slots when date changes
  useEffect(() => {
    if (bookingData.pickupDate) {
      fetchAvailableSlots(bookingData.pickupDate);
    }
  }, [bookingData.pickupDate]);

  // Handle payment completion
  const handlePaymentSuccess = () => {
    setCurrentStep('success');
    
    // Show review request after payment success
    setTimeout(() => {
      toast({
        title: "⭐ Wie war unser Service?",
        description: "Helfen Sie anderen Kunden mit einer ehrlichen Bewertung!",
        action: (
          <div className="flex gap-2">
            <a 
              href="https://google.com/search?q=Taxi+T%C3%BCrlihof&hl=de#lrd=0x0:0x0,3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
            >
              Bewerten
            </a>
          </div>
        ),
      });
    }, 3000);

    // Reset form
    setTimeout(() => {
      setBookingData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        pickupLocation: "",
        destination: "",
        additionalStops: [],
        bookingType: "scheduled",
        pickupDate: "",
        pickupTime: "",
        passengerCount: 1,
        vehicleType: "standard",
        waitingTimeHours: 0,
        specialRequests: ""
      });
      setEstimatedPrice(null);
      setShowEstimate(false);
      setCurrentStep('booking');
      setBookingId(null);
      setSubmitStatus(null);
    }, 10000); // Reset after 10 seconds
  };

  const handleBackToBooking = () => {
    setCurrentStep('booking');
  };

  // Show payment selection step
  if (currentStep === 'payment' && bookingId) {
    return (
      <section className="py-20 bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentSelection 
            bookingId={bookingId}
            bookingDetails={{
              ...bookingData,
              estimated_fare: estimatedPrice?.vehicle_adjusted_fare || estimatedPrice?.total_fare || 0
            }}
            onBack={handleBackToBooking}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      </section>
    );
  }

  // Show success step
  if (currentStep === 'success') {
    return (
      <section className="py-20 bg-black min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900 rounded-lg shadow-xl p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Buchung und Zahlung erfolgreich!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ihre Taxi-Buchung wurde bestätigt und bezahlt. Sie erhalten eine Bestätigungs-E-Mail.
            </p>
            <Button 
              onClick={() => {
                setCurrentStep('booking');
                setBookingId(null);
                setSubmitStatus(null);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Neue Buchung erstellen
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Main booking form

  return (
    <section id="booking" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Online Buchen
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Buchen Sie Ihre Taxi-Fahrt einfach und bequem online. 
            Wählen Sie Datum, Uhrzeit und alle Details für Ihre Fahrt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  Taxi online buchen
                </CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus für Ihre Taxi-Buchung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Status Message */}
                  {submitStatus && (
                    <div className={`p-4 rounded-lg border ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {submitStatus.type === 'success' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <div>
                          <p className="font-medium">{submitStatus.message}</p>
                          {submitStatus.bookingId && (
                            <p className="text-sm mt-1">
                              Buchungsnummer: #{submitStatus.bookingId.slice(0, 8)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Customer Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Ihre Kontaktdaten</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <Input
                          id="customerName"
                          value={bookingData.customerName}
                          onChange={(e) => handleInputChange('customerName', e.target.value)}
                          placeholder="Ihr vollständiger Name"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-300 mb-2">
                          Telefon *
                        </label>
                        <Input
                          id="customerPhone"
                          value={bookingData.customerPhone}
                          onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                          placeholder="076 123 45 67"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-300 mb-2">
                        E-Mail *
                      </label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={bookingData.customerEmail}
                        onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        placeholder="ihre.email@beispiel.ch"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Route</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-300 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Abholort *
                        </label>
                        <Input
                          id="pickupLocation"
                          type="text"
                          placeholder="z.B. Luzern, Bahnhofstrasse 1"
                          value={bookingData.pickupLocation}
                          onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                          disabled={isSubmitting}
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-300 mb-2">
                          <Navigation className="w-4 h-4 inline mr-1" />
                          Zielort *
                        </label>
                        <div className="flex space-x-2">
                          <Input
                            id="destination"
                            type="text"
                            placeholder="z.B. Zürich Flughafen"
                            value={bookingData.destination}
                            onChange={(e) => handleInputChange('destination', e.target.value)}
                            disabled={isSubmitting}
                            required
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={() => getCurrentLocation('destination')}
                            disabled={isSubmitting || isGettingLocation}
                            variant="outline"
                            className="px-3 py-2 whitespace-nowrap"
                          >
                            {isGettingLocation ? (
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <>📍 Mein Standort</>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Additional Stops */}
                      {bookingData.additionalStops?.map((stop, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            value={stop}
                            onChange={(e) => updateAdditionalStop(index, e.target.value)}
                            placeholder={`Zwischenstopp ${index + 1}`}
                            disabled={isSubmitting}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeAdditionalStop(index)}
                            disabled={isSubmitting}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addAdditionalStop}
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Zwischenstopp hinzufügen
                      </Button>
                    </div>
                  </div>

                  {/* Date and Time - Always required */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Datum und Uhrzeit</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-300 mb-2">
                          Datum *
                        </label>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={bookingData.pickupDate}
                          onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                          min={today}
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-300 mb-2">
                          Uhrzeit *
                        </label>
                        <select
                          id="pickupTime"
                          value={bookingData.pickupTime}
                          onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                          disabled={isSubmitting || !bookingData.pickupDate}
                          required
                          className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Uhrzeit wählen</option>
                          {availableSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle and Passengers */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Fahrzeug und Passagiere</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="passengerCount" className="block text-sm font-medium text-gray-300 mb-2">
                          <Users className="w-4 h-4 inline mr-1" />
                          Anzahl Passagiere
                        </label>
                        <select
                          id="passengerCount"
                          value={bookingData.passengerCount}
                          onChange={(e) => handleInputChange('passengerCount', e.target.value)}
                          disabled={isSubmitting}
                          className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>{num} Person{num > 1 ? 'en' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-300 mb-2">
                          <Car className="w-4 h-4 inline mr-1" />
                          Fahrzeugtyp
                        </label>
                        <select
                          id="vehicleType"
                          value={bookingData.vehicleType}
                          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                          disabled={isSubmitting}
                          className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {Object.entries(vehicleTypes).map(([key, vehicle]) => (
                            <option key={key} value={key}>{vehicle.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Vehicle Description */}
                    <div className="mt-3 p-3 bg-black rounded-lg">
                      <p className="text-sm text-gray-300">
                        {vehicleTypes[bookingData.vehicleType].description}
                      </p>
                    </div>
                  </div>

                  {/* Wartezeit */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Wartezeit (optional)</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="waitingTimeHours" className="block text-sm font-medium text-gray-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Wartezeit in Stunden
                        </label>
                        <select
                          id="waitingTimeHours"
                          value={bookingData.waitingTimeHours}
                          onChange={(e) => handleInputChange('waitingTimeHours', parseFloat(e.target.value))}
                          disabled={isSubmitting}
                          className="w-full p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={0}>Keine Wartezeit</option>
                          <option value={0.5}>0.5 Stunden (30 Min) - CHF 36.00</option>
                          <option value={1}>1 Stunde - CHF 72.00</option>
                          <option value={1.5}>1.5 Stunden - CHF 108.00</option>
                          <option value={2}>2 Stunden - CHF 144.00</option>
                          <option value={2.5}>2.5 Stunden - CHF 180.00</option>
                          <option value={3}>3 Stunden - CHF 216.00</option>
                          <option value={4}>4 Stunden - CHF 288.00</option>
                          <option value={5}>5 Stunden - CHF 360.00</option>
                          <option value={6}>6 Stunden - CHF 432.00</option>
                          <option value={8}>8 Stunden (Ganztag) - CHF 576.00</option>
                        </select>
                      </div>
                      
                      {bookingData.waitingTimeHours > 0 && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">
                            <strong>Wartezeit:</strong> {bookingData.waitingTimeHours} Stunde{bookingData.waitingTimeHours !== 1 ? 'n' : ''} = CHF {(bookingData.waitingTimeHours * 72).toFixed(2)}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Der Fahrer wartet am Zielort auf Sie. Ideal für Meetings, Besorgungen oder mehrstündige Events.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="border-t pt-6">
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-300 mb-2">
                      Besondere Wünsche
                    </label>
                    <Textarea
                      id="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="z.B. Kindersitz, Rollstuhlzugang, Wartezeit..."
                      disabled={isSubmitting}
                      rows={3}
                    />
                  </div>

                  {/* Price Estimate Buttons */}
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button
                        type="button"
                        onClick={calculateEstimate}
                        variant="outline"
                        disabled={!bookingData.pickupLocation || !bookingData.destination}
                        className="w-full"
                      >
                        Preis schätzen
                      </Button>
                      
                      <Button
                        type="button"
                        onClick={() => window.location.href = 'tel:076 611 31 31'}
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Preis Anfrage</span>
                      </Button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-200 hover:scale-105"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Buchung wird erstellt...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Jetzt buchen</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Estimate */}
            {showEstimate && estimatedPrice && (
              <Card className="shadow-lg border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">
                    Preisschätzung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Distanz:</span>
                    <span className="font-semibold">{estimatedPrice.distance_km} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fahrzeit:</span>
                    <span className="font-semibold">{estimatedPrice.estimated_duration_minutes} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fahrzeugtyp:</span>
                    <span className="font-semibold">{vehicleTypes[bookingData.vehicleType].name}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold text-blue-600">
                    <span>Geschätzte Kosten:</span>
                    <span>CHF {estimatedPrice.vehicle_adjusted_fare?.toFixed(2) || estimatedPrice.total_fare}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    * Preis kann je nach Verkehr und Tageszeit variieren
                  </p>
                  
                  {/* Google Maps Route Button */}
                  <div className="pt-2">
                    <Button
                      onClick={() => {
                        const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(bookingData.pickupLocation)}/${encodeURIComponent(bookingData.destination)}`;
                        window.open(mapsUrl, '_blank');
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Route in Google Maps anzeigen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">
                  Brauchen Sie Hilfe?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">Telefon</div>
                    <a href="tel:076 611 31 31" className="text-blue-600 hover:underline">
                      076 611 31 31
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">E-Mail</div>
                    <a href="mailto:info@taxiturlihof.ch" className="text-blue-600 hover:underline">
                      info@taxiturlihof.ch
                    </a>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  Unser Team steht Ihnen Zuverlässig zur Verfügung.
                </div>
              </CardContent>
            </Card>

            {/* Booking Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">
                  Buchungshinweise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Buchungen mindestens 30 Minuten im Voraus</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Datum und Uhrzeit frei wählbar</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Kostenlose Stornierung bis 2 Stunden vor Fahrt</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Bestätigung per E-Mail und SMS</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Bezahlung beim Fahrer oder online</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;