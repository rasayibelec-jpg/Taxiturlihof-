import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, MapPin, Calendar, Clock, Users, Car, CreditCard, CheckCircle, AlertCircle, Mail } from "lucide-react";

const BookingLookup = () => {
  const [searchData, setSearchData] = useState({
    booking_id: "",
    email: ""
  });
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

  const statusConfig = {
    pending: { label: "Wartend", color: "bg-yellow-500", icon: Clock },
    confirmed: { label: "Bestätigt", color: "bg-blue-500", icon: CheckCircle },
    in_progress: { label: "Unterwegs", color: "bg-green-500", icon: Car },
    completed: { label: "Abgeschlossen", color: "bg-gray-500", icon: CheckCircle },
    cancelled: { label: "Storniert", color: "bg-red-500", icon: AlertCircle }
  };

  const paymentStatusConfig = {
    pending: { label: "Ausstehend", color: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Bezahlt", color: "bg-green-100 text-green-800" },
    failed: { label: "Fehlgeschlagen", color: "bg-red-100 text-red-800" }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setBookings([]);

    try {
      const response = await fetch(`${backendUrl}/api/bookings/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
      });

      if (response.ok) {
        const result = await response.json();
        setBookings(result.bookings || []);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Buchung nicht gefunden oder E-Mail stimmt nicht überein");
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
      setSearched(true);
    }
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString('de-DE');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buchung suchen
          </h1>
          <p className="text-gray-600">
            Geben Sie Ihre Buchungs-ID und E-Mail-Adresse ein, um den Status zu überprüfen
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Buchung finden
            </CardTitle>
            <CardDescription>
              Sie finden Ihre Buchungs-ID in der Bestätigungs-E-Mail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Buchungs-ID
                  </label>
                  <Input
                    type="text"
                    value={searchData.booking_id}
                    onChange={(e) => handleInputChange('booking_id', e.target.value)}
                    placeholder="z.B. abc123de (ersten 8 Zeichen reichen)"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Die ersten 8 Zeichen Ihrer Buchungs-ID aus der E-Mail
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    E-Mail-Adresse
                  </label>
                  <Input
                    type="email"
                    value={searchData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="ihre.email@beispiel.com"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Die E-Mail-Adresse, die Sie bei der Buchung verwendet haben
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                disabled={isLoading || !searchData.booking_id || !searchData.email}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Suchen...
                  </div>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Buchung suchen
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searched && bookings.length === 0 && !error && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Keine Buchung gefunden</h3>
              <p className="text-gray-600">
                Überprüfen Sie Ihre Buchungs-ID und E-Mail-Adresse und versuchen Sie es erneut.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Booking Results */}
        {bookings.map((booking, index) => {
          const statusInfo = statusConfig[booking.status] || statusConfig.pending;
          const StatusIcon = statusInfo.icon;
          const paymentInfo = paymentStatusConfig[booking.payment_status] || paymentStatusConfig.pending;

          return (
            <Card key={booking.id || index} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${statusInfo.color} text-white`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                    <CardTitle className="text-lg">
                      Buchung #{booking.id?.slice(-8) || 'N/A'}
                    </CardTitle>
                  </div>
                  <Badge className={paymentInfo.color}>
                    <CreditCard className="w-3 h-3 mr-1" />
                    {paymentInfo.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Route Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span><strong>Von:</strong> {booking.pickup_location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span><strong>Nach:</strong> {booking.destination}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span><strong>Abholung:</strong> {formatDate(booking.pickup_datetime)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span><strong>Gebucht am:</strong> {formatDate(booking.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 block mb-1">Fahrzeugtyp:</span>
                      <p className="font-semibold text-gray-900">{booking.vehicle_type || 'Standard'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Personen:</span>
                      <p className="font-semibold text-gray-900">{booking.passenger_count || 1}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Preis:</span>
                      <p className="font-semibold text-green-600 text-lg">
                        CHF {booking.total_fare ? booking.total_fare.toFixed(2) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Status:</span>
                      <p className="font-semibold text-gray-900">{statusInfo.label}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    Haben Sie Fragen zu Ihrer Buchung?
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                    <span>📞 076 611 31 31</span>
                    <span>📧 info@taxiturlihof.ch</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BookingLookup;