import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CreditCard, Clock, CheckCircle, X, AlertCircle, Euro } from "lucide-react";

const AdminPaymentManager = ({ adminToken, backendUrl }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (adminToken) {
      fetchPaymentTransactions();
    }
  }, [adminToken]);

  const fetchPaymentTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/admin/payments`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTransactions(data.transactions);
        }
      } else {
        throw new Error('Failed to fetch transactions');
      }
    } catch (err) {
      setError('Fehler beim Laden der Zahlungen');
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCapturePayment = async (transactionId) => {
    try {
      setProcessing(transactionId);
      setError('');

      const response = await fetch(`${backendUrl}/api/admin/payments/${transactionId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Refresh transactions list
        await fetchPaymentTransactions();
        alert('✅ Zahlung erfolgreich eingezogen!');
      } else {
        throw new Error(data.detail || 'Capture failed');
      }
    } catch (err) {
      setError(`Fehler beim Einziehen der Zahlung: ${err.message}`);
    } finally {
      setProcessing(null);
    }
  };

  const handleCancelPayment = async (transactionId) => {
    if (!window.confirm('Sind Sie sicher, dass Sie diese Zahlung stornieren möchten? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      return;
    }

    try {
      setProcessing(transactionId);
      setError('');

      const response = await fetch(`${backendUrl}/api/admin/payments/${transactionId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Refresh transactions list
        await fetchPaymentTransactions();
        alert('✅ Zahlung erfolgreich storniert und freigegeben!');
      } else {
        throw new Error(data.detail || 'Cancel failed');
      }
    } catch (err) {
      setError(`Fehler beim Stornieren der Zahlung: ${err.message}`);
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-gray-500', icon: Clock, text: 'Ausstehend' },
      processing: { color: 'bg-blue-500', icon: Clock, text: 'Wird verarbeitet' },
      authorized: { color: 'bg-yellow-500', icon: AlertCircle, text: 'Autorisiert' },
      completed: { color: 'bg-green-500', icon: CheckCircle, text: 'Abgeschlossen' },
      cancelled: { color: 'bg-red-500', icon: X, text: 'Storniert' },
      failed: { color: 'bg-red-600', icon: X, text: 'Fehlgeschlagen' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const formatAmount = (amount, currency = 'CHF') => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('de-CH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Zahlungsverwaltung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Lade Zahlungen...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter for transactions that need admin action
  const authorizedTransactions = transactions.filter(t => t.payment_status === 'authorized');
  const recentTransactions = transactions.slice(0, 10);

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Authorized Payments needing action */}
      {authorizedTransactions.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              Autorisierte Zahlungen ({authorizedTransactions.length})
            </CardTitle>
            <p className="text-sm text-yellow-700">
              Diese Zahlungen wurden autorisiert und warten auf Ihre Bestätigung oder Stornierung.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {authorizedTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg p-4 border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">#{transaction.booking_id}</h4>
                    <p className="text-sm text-gray-600">{transaction.customer_email}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </div>
                    {getStatusBadge(transaction.payment_status)}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleCapturePayment(transaction.id)}
                    disabled={processing === transaction.id}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    {processing === transaction.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird eingezogen...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Zahlung einziehen
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleCancelPayment(transaction.id)}
                    disabled={processing === transaction.id}
                    variant="destructive"
                    className="flex-1"
                  >
                    {processing === transaction.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird storniert...
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Zahlung stornieren
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* All Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Aktuelle Zahlungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Keine Zahlungen gefunden</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">#{transaction.booking_id}</h4>
                      <p className="text-sm text-gray-600">{transaction.customer_email}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </div>
                      {getStatusBadge(transaction.payment_status)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="capitalize">{transaction.payment_method}</span>
                    {transaction.session_id && (
                      <span className="font-mono text-xs">ID: {transaction.id.slice(0, 8)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentManager;