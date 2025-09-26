import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, Car, MapPin, User, Phone, Mail, MessageCircle, LogOut, Shield } from "lucide-react";
import AdminLogin from "./AdminLogin";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

  // Check for existing admin token on component mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const expiresAt = localStorage.getItem('admin_expires_at');
    
    if (token && expiresAt) {
      const now = new Date();
      const expiry = new Date(expiresAt);
      
      if (now < expiry) {
        setAdminToken(token);
        setIsAuthenticated(true);
      } else {
        // Token expired, remove from storage
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_expires_at');
      }
    }
  }, []);

  // Admin login handler
  const handleAdminLogin = (token) => {
    setAdminToken(token);
    setIsAuthenticated(true);
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_expires_at');
    setAdminToken(null);
    setIsAuthenticated(false);
    setBookings([]);
  };

  // Status-Optionen mit deutschen Bezeichnungen
  const statusOptions = {
    pending: { label: "Wartend", color: "bg-yellow-500", icon: Clock },
    confirmed: { label: "Bestätigt", color: "bg-blue-500", icon: CheckCircle },
    in_progress: { label: "Unterwegs", color: "bg-green-500", icon: Car },
    completed: { label: "Abgeschlossen", color: "bg-gray-500", icon: CheckCircle },
    cancelled: { label: "Storniert", color: "bg-red-500", icon: Clock }
  };

  // Buchungen laden (mit Admin-Token)
  const fetchBookings = async () => {
    if (!adminToken) return;
    
    try {
      const response = await fetch(`${backendUrl}/api/bookings`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        // Token ungültig oder abgelaufen
        handleAdminLogout();
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        // Sortiere nach Erstellungsdatum (neueste zuerst)
        const sortedBookings = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBookings(sortedBookings);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Buchungen:", error);
    } finally {
      setLoading(false);
    }
  };

  // Buchungsstatus ändern
  const updateBookingStatus = async (bookingId, newStatus) => {
    if (!adminToken) return;
    
    setUpdating(bookingId);
    try {
      const response = await fetch(
        `${backendUrl}/api/bookings/${bookingId}/status?status=${newStatus}`,
        { 
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        
        // WhatsApp-Link anzeigen falls verfügbar
        if (result.whatsapp_link) {
          const whatsappConfirm = confirm(
            `Status erfolgreich aktualisiert!\n\nMöchten Sie den Kunden auch per WhatsApp benachrichtigen?`
          );
          
          if (whatsappConfirm) {
            window.open(result.whatsapp_link, '_blank');
          }
        }
        
        // Buchungen neu laden nach erfolgreicher Aktualisierung
        await fetchBookings();
      } else {
        alert("Fehler beim Aktualisieren des Status");
      }
    } catch (error) {
      console.error("Fehler beim Status-Update:", error);
      alert("Fehler beim Aktualisieren des Status");
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated && adminToken) {
      fetchBookings();
      // Auto-Refresh alle 30 Sekunden
      const interval = setInterval(fetchBookings, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, adminToken]);

  // WhatsApp-Nachricht senden
  const sendWhatsAppMessage = async (booking, messageType) => {
    try {
      const response = await fetch(`${backendUrl}/api/whatsapp/generate-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          booking_id: booking.id,
          phone_number: booking.customer_phone,
          message_type: messageType
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.whatsapp_link) {
          window.open(result.whatsapp_link, '_blank');
        }
      } else {
        alert("Fehler beim Generieren des WhatsApp-Links");
      }
    } catch (error) {
      console.error("WhatsApp-Fehler:", error);
      alert("Fehler beim Senden der WhatsApp-Nachricht");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Lade Buchungen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Taxi Türlihof - Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Verwalten Sie Ihre Buchungen und bestätigen Sie Fahrten
          </p>
        </div>

        {/* Statistiken */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(statusOptions).map(([status, config]) => {
            const count = bookings.filter(b => b.status === status).length;
            const Icon = config.icon;
            return (
              <Card key={status}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${config.color} bg-opacity-10 mr-3`}>
                      <Icon className={`w-4 h-4 ${config.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{config.label}</p>
                      <p className="text-2xl font-bold">{count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Buchungsliste */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Car className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Keine Buchungen vorhanden</h3>
                <p className="text-gray-600">
                  Sobald Kunden Fahrten buchen, erscheinen sie hier.
                </p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => {
              const statusConfig = statusOptions[booking.status];
              const StatusIcon = statusConfig.icon;

              return (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${statusConfig.color} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                        <CardTitle className="text-lg">
                          Buchung #{booking.id.slice(-8)}
                        </CardTitle>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.created_at).toLocaleString('de-DE')}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Kunden-Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{booking.customer_name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{booking.customer_phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{booking.customer_email}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>
                            <strong>Von:</strong> {booking.pickup_location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>
                            <strong>Nach:</strong> {booking.destination}
                          </span>
                        </div>
                        {booking.pickup_datetime && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>
                              {new Date(booking.pickup_datetime).toLocaleString('de-DE')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fahrt-Details */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Fahrzeugtyp:</span>
                          <p className="font-medium">{booking.vehicle_type || 'Standard'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Personen:</span>
                          <p className="font-medium">{booking.passenger_count || 1}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Typ:</span>
                          <p className="font-medium">
                            {booking.booking_type === 'immediate' ? 'Sofort' : 'Geplant'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Preis:</span>
                          <p className="font-medium text-green-600">
                            CHF {booking.estimated_fare || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      {booking.special_requests && (
                        <div className="mt-3 pt-3 border-t">
                          <span className="text-gray-600">Besondere Wünsche:</span>
                          <p className="font-medium">{booking.special_requests}</p>
                        </div>
                      )}
                    </div>

                    {/* Status-Aktionen */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {Object.entries(statusOptions).map(([status, config]) => (
                        booking.status !== status && (
                          <Button
                            key={status}
                            variant="outline"
                            size="sm"
                            disabled={updating === booking.id}
                            onClick={() => updateBookingStatus(booking.id, status)}
                            className="text-xs"
                          >
                            <config.icon className="w-3 h-3 mr-1" />
                            {config.label}
                          </Button>
                        )
                      ))}
                      
                      {/* WhatsApp Schnellaktionen */}
                      {booking.customer_phone && (
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendWhatsAppMessage(booking, 'confirmation')}
                            className="text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            WhatsApp
                          </Button>
                          
                          {booking.status === 'completed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sendWhatsAppMessage(booking, 'review')}
                              className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200"
                            >
                              ⭐ Bewertung
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;