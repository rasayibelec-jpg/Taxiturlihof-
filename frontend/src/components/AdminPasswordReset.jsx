import React, { useState, useEffect } from 'react';

const AdminPasswordReset = () => {
  const [step, setStep] = useState(1); // 1: method selection, 2: verify, 3: new password
  const [method, setMethod] = useState('');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [availableMethods, setAvailableMethods] = useState({});

  useEffect(() => {
    fetchResetStatus();
  }, []);

  const fetchResetStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/password-reset/status`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableMethods(data.available_methods);
        
        if (data.mock_mode) {
          setMessage('🧪 Entwicklungsmodus: E-Mail und SMS werden in der Konsole angezeigt');
        }
      }
    } catch (err) {
      setError('Fehler beim Laden der verfügbaren Reset-Methoden');
    }
  };

  const handleMethodRequest = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/password-reset/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ method }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setStep(2);
      } else {
        setError(data.message || 'Fehler bei der Reset-Anfrage');
      }
    } catch (err) {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const requestBody = method === 'email' ? { token } : { code };
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/password-reset/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setStep(3);
      } else {
        setError(data.detail || 'Ungültige Verifizierung');
      }
    } catch (err) {
      setError('Verifikationsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    if (newPassword.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen lang sein');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const requestBody = {
        new_password: newPassword,
        confirm_password: confirmPassword,
        ...(method === 'email' ? { token } : { code })
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/password-reset/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setStep(4); // Success step
      } else {
        setError(data.detail || 'Fehler beim Setzen des neuen Passworts');
      }
    } catch (err) {
      setError('Fehler beim Passwort-Reset. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setMethod('');
    setToken('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          🔐 Admin Passwort Reset
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Taxi Türlihof - Sicherer Passwort-Reset
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reset-Methode wählen
              </h3>
              
              <div className="space-y-4">
                {availableMethods.email && (
                  <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="email"
                      checked={method === 'email'}
                      onChange={(e) => setMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">📧 E-Mail Reset</div>
                      <div className="text-sm text-gray-600">
                        Reset-Link an rasayibelec@gmail.com senden
                      </div>
                    </div>
                  </label>
                )}

                {availableMethods.sms && (
                  <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="sms"
                      checked={method === 'sms'}
                      onChange={(e) => setMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">📱 SMS Reset</div>
                      <div className="text-sm text-gray-600">
                        Verifikationscode an +41 76 611 31 31 senden
                      </div>
                    </div>
                  </label>
                )}
              </div>

              <button
                onClick={handleMethodRequest}
                disabled={!method || loading}
                className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Wird gesendet...' : `${method === 'email' ? 'E-Mail' : 'SMS'} senden`}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {method === 'email' ? 'Reset-Token eingeben' : 'SMS-Code eingeben'}
              </h3>

              {method === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reset-Token aus der E-Mail:
                  </label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Token aus der E-Mail eingeben..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Überprüfen Sie Ihren Posteingang und geben Sie den Token aus der E-Mail ein.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    6-stelliger SMS-Code:
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-center text-2xl tracking-widest"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Geben Sie den 6-stelligen Code aus der SMS ein.
                  </p>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Zurück
                </button>
                <button
                  onClick={handleVerification}
                  disabled={loading || (!token && !code)}
                  className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
                >
                  {loading ? 'Überprüfe...' : 'Verifizieren'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Neues Passwort festlegen
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neues Passwort:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mindestens 8 Zeichen..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passwort bestätigen:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Passwort wiederholen..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 mb-2">Passwort-Anforderungen:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Mindestens 8 Zeichen lang</li>
                    <li>✓ Mindestens einen Buchstaben</li>
                    <li>✓ Mindestens eine Zahl</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handlePasswordReset}
                  disabled={loading || !newPassword || !confirmPassword}
                  className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
                >
                  {loading ? 'Wird gesetzt...' : 'Passwort setzen'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Passwort erfolgreich geändert!
              </h3>
              <p className="text-gray-600 mb-6">
                Ihr Admin-Passwort wurde erfolgreich aktualisiert. 
                Sie können sich nun mit dem neuen Passwort anmelden.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/admin'}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  🔐 Zum Admin-Login
                </button>
                
                <button
                  onClick={resetForm}
                  className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Weiteres Reset durchführen
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Probleme? Kontaktieren Sie uns unter{' '}
            <a href="tel:+41766113131" className="text-gray-800 font-medium hover:underline">
              076 611 31 31
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordReset;