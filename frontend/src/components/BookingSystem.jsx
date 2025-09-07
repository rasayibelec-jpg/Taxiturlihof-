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

const BookingSystem = () => {
  const [bookingData, setBookingData] = useState({
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
    specialRequests: ""
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [showEstimate, setShowEstimate] = useState(false);
  const { toast } = useToast();

  const vehicleTypes = {
    standard: { name: "Standard", description: "Komfortables Fahrzeug für bis zu 4 Personen", multiplier: 1.0 },
    premium: { name: "Premium", description: "Luxusfahrzeug mit erweiterten Annehmlichkeiten", multiplier: 1.3 },
    van: { name: "Van", description: "Großes Fahrzeug für bis zu 8 Personen oder viel Gepäck", multiplier: 1.5 }
  };

  // Get today's date for min date restriction
  const today = new Date().toISOString().split('T')[0];

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
        const estimatedTotal = basePrice * vehicleMultiplier + 5; // +5 CHF booking fee

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
      // Validate required fields
      const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'pickupLocation', 'destination'];
      if (bookingData.bookingType === 'scheduled') {
        requiredFields.push('pickupDate', 'pickupTime');
      }

      const missingFields = requiredFields.filter(field => !bookingData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Bitte füllen Sie alle Pflichtfelder aus: ${missingFields.join(', ')}`);
      }

      // Create pickup datetime
      let pickupDatetime;
      if (bookingData.bookingType === 'immediate') {
        pickupDatetime = new Date().toISOString();
      } else {
        pickupDatetime = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}:00`).toISOString();
      }

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
        special_requests: bookingData.specialRequests || null
      });

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message,
          bookingId: response.data.booking_id
        });

        toast({
          title: "✅ Buchung erfolgreich!",
          description: `Buchungsnummer: ${response.data.booking_id.slice(0, 8)}`,
        });

        // Reset form
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
          specialRequests: ""
        });
        setEstimatedPrice(null);
        setShowEstimate(false);
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

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Online Buchungssystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Buchen Sie Ihre Taxi-Fahrt einfach und bequem online. 
            Sofortbuchung oder Terminbuchung - Sie entscheiden!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  Fahrt buchen
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

                  {/* Booking Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Buchungstyp
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('bookingType', 'immediate')}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          bookingData.bookingType === 'immediate'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Sofortbuchung</div>
                        <div className="text-sm text-gray-600">Taxi kommt so schnell wie möglich</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('bookingType', 'scheduled')}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          bookingData.bookingType === 'scheduled'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Terminbuchung</div>
                        <div className="text-sm text-gray-600">Wählen Sie Datum und Uhrzeit</div>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ihre Kontaktdaten</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
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
                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Route</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Abholort *
                        </label>
                        <Input
                          id="pickupLocation"
                          value={bookingData.pickupLocation}
                          onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                          placeholder="z.B. Luzern, Bahnhofstrasse 1"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                          <Navigation className="w-4 h-4 inline mr-1" />
                          Zielort *
                        </label>
                        <Input
                          id="destination"
                          value={bookingData.destination}
                          onChange={(e) => handleInputChange('destination', e.target.value)}
                          placeholder="z.B. Zürich Flughafen"
                          disabled={isSubmitting}
                          required
                        />
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

                  {/* Date and Time (for scheduled bookings) */}
                  {bookingData.bookingType === 'scheduled' && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Datum und Uhrzeit</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
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
                          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-2">
                            Uhrzeit *
                          </label>
                          <select
                            id="pickupTime"
                            value={bookingData.pickupTime}
                            onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                            disabled={isSubmitting || !bookingData.pickupDate}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Uhrzeit wählen</option>
                            {availableSlots.map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Vehicle and Passengers */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fahrzeug und Passagiere</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="passengerCount" className="block text-sm font-medium text-gray-700 mb-2">
                          <Users className="w-4 h-4 inline mr-1" />
                          Anzahl Passagiere
                        </label>
                        <select
                          id="passengerCount"
                          value={bookingData.passengerCount}
                          onChange={(e) => handleInputChange('passengerCount', e.target.value)}
                          disabled={isSubmitting}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>{num} Person{num > 1 ? 'en' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                          <Car className="w-4 h-4 inline mr-1" />
                          Fahrzeugtyp
                        </label>
                        <select
                          id="vehicleType"
                          value={bookingData.vehicleType}
                          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                          disabled={isSubmitting}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {Object.entries(vehicleTypes).map(([key, vehicle]) => (
                            <option key={key} value={key}>{vehicle.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Vehicle Description */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        {vehicleTypes[bookingData.vehicleType].description}
                      </p>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="border-t pt-6">
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
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

                  {/* Price Estimate Button */}
                  <div className="border-t pt-6">
                    <Button
                      type="button"
                      onClick={calculateEstimate}
                      variant="outline"
                      disabled={!bookingData.pickupLocation || !bookingData.destination}
                      className="w-full mb-4"
                    >
                      Preis schätzen
                    </Button>
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
                  <CardTitle className="text-lg font-bold text-gray-900">
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
                  <p className="text-xs text-gray-500">
                    * Preis kann je nach Verkehr und Tageszeit variieren
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
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
                    <a href="mailto:info@taxitürlihof.ch" className="text-blue-600 hover:underline">
                      info@taxitürlihof.ch
                    </a>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Unser Team steht Ihnen 24/7 zur Verfügung.
                </div>
              </CardContent>
            </Card>

            {/* Booking Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Buchungshinweise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Terminbuchungen mindestens 30 Minuten im Voraus</span>
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