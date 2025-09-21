import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  CheckCircle, AlertCircle, Clock, Phone, Mail, 
  MapPin, Navigation, Calendar, Users, Car, Loader2
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const bookingId = searchParams.get('booking_id');
  
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [paymentData, setPaymentData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Check payment status
  useEffect(() => {
    let pollInterval;
    let attempts = 0;
    const maxAttempts = 10;

    const checkPaymentStatus = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await axios.get(`${backendUrl}/api/payments/status/${sessionId}`);
        
        setPaymentData(response.data);
        
        if (response.data.payment_status === 'completed') {
          setPaymentStatus('success');
          
          // Load booking details
          try {
            const bookingResponse = await axios.get(`${backendUrl}/api/bookings/${response.data.booking_id}`);
            setBookingDetails(bookingResponse.data);
          } catch (bookingError) {
            console.error('Failed to load booking details:', bookingError);
          }
          
          // Clear polling
          if (pollInterval) clearInterval(pollInterval);
          
          toast({
            title: "✅ Zahlung erfolgreich!",
            description: "Ihre Buchung wurde bestätigt. Sie erhalten eine Bestätigungs-E-Mail.",
          });
          
        } else if (response.data.payment_status === 'failed') {
          setPaymentStatus('failed');
          if (pollInterval) clearInterval(pollInterval);
        } else if (attempts >= maxAttempts) {
          setPaymentStatus('timeout');
          if (pollInterval) clearInterval(pollInterval);
        }
        
        attempts++;
        
      } catch (error) {
        console.error('Payment status check failed:', error);
        attempts++;
        
        if (attempts >= maxAttempts) {
          setError('Zahlungsstatus konnte nicht überprüft werden');
          setPaymentStatus('error');
          if (pollInterval) clearInterval(pollInterval);
        }
      }
    };

    // Initial check
    checkPaymentStatus();
    
    // Poll every 2 seconds
    pollInterval = setInterval(checkPaymentStatus, 2000);

    // Cleanup
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [sessionId, toast]);

  // Loading state
  if (paymentStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="shadow-xl max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-blue-600 mr-3 animate-spin" />
              Zahlung wird überprüft...
            </CardTitle>
            <CardDescription>
              Bitte warten Sie, während wir Ihre Zahlung bestätigen.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600">
                Dies kann einige Sekunden dauern...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (paymentStatus === 'success' && paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Header */}
          <Card className="shadow-xl border-green-200 bg-gradient-to-br from-green-50 to-green-100 mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-green-800">
                Zahlung erfolgreich!
              </CardTitle>
              <CardDescription className="text-lg text-green-700">
                Ihre Taxi-Buchung wurde bestätigt und bezahlt.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Betrag</p>
                    <p className="text-xl font-bold text-green-600">
                      CHF {paymentData.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Zahlungsmethode</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {paymentData.payment_method === 'twint' ? 'TWINT' : 
                       paymentData.payment_method === 'stripe' ? 'Kreditkarte' : 'PayPal'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Buchungsnummer</p>
                    <p className="text-lg font-semibold text-gray-900">
                      #{paymentData.booking_id.slice(0, 8)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          {bookingDetails && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Trip Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Car className="w-5 h-5 text-blue-600 mr-3" />
                    Fahrtdetails
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Abholung</p>
                      <p className="text-gray-600">{bookingDetails.pickup_location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Navigation className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Ziel</p>
                      <p className="text-gray-600">{bookingDetails.destination}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Datum & Zeit</p>
                      <p className="text-gray-600">
                        {new Date(bookingDetails.pickup_datetime).toLocaleString('de-CH')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Passagiere & Fahrzeug</p>
                      <p className="text-gray-600">
                        {bookingDetails.passenger_count} Person{bookingDetails.passenger_count > 1 ? 'en' : ''} • {bookingDetails.vehicle_type}
                      </p>
                    </div>
                  </div>
                  
                  {bookingDetails.special_requests && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Besondere Wünsche:</p>
                      <p className="text-gray-600 text-sm">{bookingDetails.special_requests}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 text-orange-600 mr-3" />
                    Nächste Schritte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Bestätigung erhalten</p>
                        <p className="text-sm text-gray-600">
                          Sie erhalten eine Bestätigungs-E-Mail mit allen Details
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Fahrer wird benachrichtigt</p>
                        <p className="text-sm text-gray-600">
                          Unser Team organisiert Ihre Fahrt
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Erinnerung</p>
                        <p className="text-sm text-gray-600">
                          Sie erhalten eine SMS-Erinnerung vor der Abholung
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">24/7 Support</p>
                        <a href="tel:076 611 31 31" className="text-blue-600 hover:underline">
                          076 611 31 31
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">E-Mail Support</p>
                        <a href="mailto:info@taxiturlihof.ch" className="text-blue-600 hover:underline">
                          info@taxiturlihof.ch
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Rating QR Code Section mit funktionierenden Links */}
          <Card className="shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 mt-8">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                Wie war Ihre Fahrt?
              </CardTitle>
              <CardDescription className="text-gray-700">
                Teilen Sie Ihre Erfahrung mit anderen Kunden
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border inline-block mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/4e8xw813_image.png"
                  alt="QR-Code für Bewertung"
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <p className="text-gray-600 mb-4">
                📱 Scannen Sie den QR-Code für eine schnelle Bewertung
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <a
                  href="https://www.google.com/search?q=Taxi+T%C3%BCrlihof+Arth&rlz=1C1CHBF_deDE1016DE1016&oq=Taxi+T%C3%BCrlihof+Arth&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg60gEIMTcyN2owajGoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x479ada6463b8b5b5:0x6b1d0c3f8a6b4f8c,3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
                >
                  ⭐ Google Bewertung abgeben
                </a>
                <a
                  href="https://local.ch/de/d/Arth/6415/Taxi/Taxi-T%C3%BCrlihof-081888943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
                >
                  ⭐ local.ch bewerten
                </a>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                ⭐ Ihre Bewertung hilft anderen Kunden
              </Badge>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-8 text-center space-y-4">
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              size="lg"
            >
              Zurück zur Startseite
            </Button>
            
            <div className="text-sm text-gray-600">
              <p>Haben Sie Fragen? Kontaktieren Sie uns jederzeit!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error states
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
      <Card className="shadow-xl max-w-md w-full mx-4 border-red-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">
            {paymentStatus === 'failed' ? 'Zahlung fehlgeschlagen' : 
             paymentStatus === 'timeout' ? 'Zeitüberschreitung' : 'Fehler aufgetreten'}
          </CardTitle>
          <CardDescription className="text-red-700">
            {paymentStatus === 'failed' ? 'Die Zahlung konnte nicht verarbeitet werden.' :
             paymentStatus === 'timeout' ? 'Die Zahlungsbestätigung dauert länger als erwartet.' :
             'Ein unerwarteter Fehler ist aufgetreten.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            {error || 'Bitte versuchen Sie es erneut oder kontaktieren Sie unseren Support.'}
          </p>
          
          <div className="space-y-2">
            <Button
              onClick={() => window.location.href = `/booking/${bookingId}`}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Erneut versuchen
            </Button>
            
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
            >
              Zur Startseite
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 border-t pt-4">
            <p className="font-semibold">Benötigen Sie Hilfe?</p>
            <p>
              <a href="tel:076 611 31 31" className="text-blue-600 hover:underline">
                076 611 31 31
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;