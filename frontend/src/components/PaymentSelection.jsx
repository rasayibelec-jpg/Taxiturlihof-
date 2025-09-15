import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  CreditCard, Smartphone, DollarSign, CheckCircle, AlertCircle, 
  ArrowLeft, ExternalLink, Clock, Shield
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

const PaymentSelection = ({ bookingId, bookingDetails, onBack, onPaymentSuccess }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedQRMethod, setSelectedQRMethod] = useState(null);
  const { toast } = useToast();

  // QR Code URLs (from user uploaded artifacts)
  const QR_CODES = {
    'twint': 'https://customer-assets.emergentagent.com/job_taxiturli-pay/artifacts/uoe4ro57_Screenshot_20250915_091301.jpg',
    'paypal': 'https://customer-assets.emergentagent.com/job_taxiturli-pay/artifacts/pdktwtpq_pp_my_qrcode_1757914800637.jpg'
  };

  // Payment method icons
  const getPaymentIcon = (methodId) => {
    switch (methodId) {
      case 'twint':
        return <Smartphone className="w-6 h-6 text-red-600" />;
      case 'stripe':
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case 'paypal':
        return <DollarSign className="w-6 h-6 text-blue-800" />;
      default:
        return <CreditCard className="w-6 h-6 text-gray-600" />;
    }
  };

  // Load available payment methods
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await axios.get(`${backendUrl}/api/payment-methods`);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Failed to load payment methods:', error);
        toast({
          title: "Fehler",
          description: "Zahlungsmethoden konnten nicht geladen werden.",
          variant: "destructive"
        });
      }
    };

    loadPaymentMethods();
  }, [toast]);

  // Handle QR code payment selection
  const handleQRPayment = (method) => {
    setSelectedQRMethod(method);
    setShowQRCode(true);
    
    toast({
      title: `${method.name} QR Code`,
      description: "Scannen Sie den QR Code mit Ihrer App für die Zahlung.",
    });
  };

  // Handle back from QR code view
  const handleBackFromQR = () => {
    setShowQRCode(false);
    setSelectedQRMethod(null);
  };

  // Initiate payment
  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Keine Zahlungsmethode",
        description: "Bitte wählen Sie eine Zahlungsmethode aus.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.post(`${backendUrl}/api/payments/initiate`, {
        booking_id: bookingId,
        payment_method: selectedMethod.id
      });

      if (response.data.success) {
        if (response.data.payment_url) {
          // Redirect to payment URL
          setPaymentUrl(response.data.payment_url);
          toast({
            title: "Weiterleitung zur Zahlung",
            description: response.data.message,
          });
          
          // Redirect after short delay
          setTimeout(() => {
            window.location.href = response.data.payment_url;
          }, 2000);
        } else {
          toast({
            title: "Zahlung initialisiert",
            description: response.data.message,
          });
        }
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast({
        title: "Zahlungsfehler",
        description: error.response?.data?.detail || "Zahlung konnte nicht initialisiert werden.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if redirecting to payment
  if (paymentUrl) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-blue-600 mr-3" />
            Weiterleitung zur Zahlung
          </CardTitle>
          <CardDescription>
            Sie werden zur sicheren Zahlungsseite weitergeleitet...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">
            Falls Sie nicht automatisch weitergeleitet werden, klicken Sie hier:
          </p>
          <Button 
            onClick={() => window.location.href = paymentUrl}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Zur Zahlung
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            Sichere Zahlung
          </CardTitle>
          <CardDescription>
            Wählen Sie Ihre bevorzugte Zahlungsmethode für die Buchung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">Buchungssumme:</h3>
                <p className="text-sm text-gray-600">
                  {bookingDetails.pickup_location} → {bookingDetails.destination}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  CHF {bookingDetails.estimated_fare?.toFixed(2) || '50.00'}
                </div>
                <p className="text-xs text-gray-500">inkl. MwSt.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">
            Zahlungsmethode wählen
          </CardTitle>
          <CardDescription>
            Alle Zahlungen werden sicher verschlüsselt übertragen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedMethod?.id === method.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => handleMethodSelect(method)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getPaymentIcon(method.id)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {method.name}
                      {method.id === 'twint' && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          🇨🇭 Swiss
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{method.currency}</Badge>
                  {selectedMethod?.id === method.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Action */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Buchung
        </Button>
        
        <Button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Wird verarbeitet...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Sicher bezahlen</span>
            </div>
          )}
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="shadow-sm border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-green-800 mb-1">Sicher und verschlüsselt</p>
              <p className="text-green-700">
                Ihre Zahlungsdaten werden mit modernster SSL-Verschlüsselung geschützt. 
                Wir speichern keine Kreditkarteninformationen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSelection;