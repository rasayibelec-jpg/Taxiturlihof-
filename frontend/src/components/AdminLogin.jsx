import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${backendUrl}/api/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (result.success && result.token) {
        // Store token in localStorage
        localStorage.setItem('admin_token', result.token);
        localStorage.setItem('admin_expires_at', result.expires_at);
        
        // Call parent component's login handler
        onLogin(result.token);
      } else {
        setError(result.message || "Anmeldung fehlgeschlagen");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(""); // Clear error when user types
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Admin-Anmeldung
          </CardTitle>
          <CardDescription className="text-gray-600">
            Taxi Türlihof - Verwaltungsbereich
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Benutzername
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Admin-Benutzername"
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Admin-Passwort"
                  className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                  style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
              disabled={isLoading || !credentials.username || !credentials.password}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Anmelden...
                </div>
              ) : (
                "Anmelden"
              )}
            </Button>
          </form>

          {/* Removed password display for security */}

          <div className="mt-6 text-center space-y-3">
            <a 
              href="/admin-reset" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline block"
            >
              🔐 Passwort vergessen? Hier zurücksetzen
            </a>
            
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
              🔒 Sichere Admin-Authentifizierung
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;