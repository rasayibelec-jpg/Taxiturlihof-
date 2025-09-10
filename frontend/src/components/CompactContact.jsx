import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Mail, MessageCircle, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { useToast } from "../hooks/use-toast";

const CompactContact = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/contact`, formData);
      
      toast({
        title: "✅ Nachricht gesendet!",
        description: "Wir melden uns schnellstmöglich bei Ihnen.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowContactForm(false);
    } catch (error) {
      toast({
        title: "❌ Fehler beim Senden",
        description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Phone className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kontakt & 24/7 Service
          </h2>
          <p className="text-lg text-gray-600">
            Wir sind jederzeit für Sie da – rufen Sie uns an oder schreiben Sie uns
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Phone */}
          <Card className="text-center p-6 border-2 border-green-200 hover:border-green-300 transition-colors duration-200">
            <CardContent className="p-0">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Telefonisch</h3>
              <a 
                href="tel:076 611 31 31"
                className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-200"
              >
                076 611 31 31
              </a>
              <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                24/7 Service
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="text-center p-6 border-2 border-blue-200 hover:border-blue-300 transition-colors duration-200">
            <CardContent className="p-0">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">E-Mail</h3>
              <a 
                href="mailto:info@taxiturlihof.ch"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                info@taxiturlihof.ch
              </a>
              <p className="text-sm text-gray-600 mt-2">Antwort innerhalb 24h</p>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="text-center p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-colors duration-200">
            <CardContent className="p-0">
              <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
              <a 
                href="https://wa.me/41766113131"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
              >
                076 611 31 31
              </a>
              <p className="text-sm text-gray-600 mt-2">Schnelle Antwort</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Toggle */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowContactForm(!showContactForm)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {showContactForm ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Kontaktformular schließen
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Kontaktformular öffnen
              </>
            )}
          </Button>
        </div>

        {/* Contact Form - Collapsible */}
        {showContactForm && (
          <Card className="max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-300">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Ihr Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Ihre Telefonnummer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="ihre.email@beispiel.ch"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Ihre Nachricht oder Anfrage..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Location Info */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">Service-Region: Luzern • Schwyz • Zug</span>
          </div>
          <p className="text-xs text-gray-500">
            Taxi Türlihof – Ihr zuverlässiger Partner seit 2010
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompactContact;