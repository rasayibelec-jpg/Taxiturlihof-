import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Star, CreditCard, MapPin, HelpCircle, Users } from "lucide-react";

const StreamlinedContact = () => {
  return (
    <section id="contact" className="py-4 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Contact - kleine Blöcke */}
        <div className="text-center mb-3">
          <h2 className="text-base font-bold text-gray-900">
            Kontakt & Service
          </h2>
        </div>

        {/* Contact Options - sehr kompakt */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          
          {/* Phone - kleiner Block */}
          <Card className="p-2 text-center border border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
            <div className="bg-green-600 p-1.5 rounded-full w-7 h-7 mx-auto mb-1 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">Anrufen</h3>
            <a 
              href="tel:076 611 31 31"
              className="text-xs font-bold text-green-600 hover:text-green-700 block mb-0.5"
            >
              076 611 31 31
            </a>
            <p className="text-xs text-gray-600">Zuverlässig</p>
          </Card>

          {/* Email - kleiner Block */}
          <Card className="p-2 text-center border border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
            <div className="bg-blue-600 p-1.5 rounded-full w-7 h-7 mx-auto mb-1 flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">E-Mail</h3>
            <a 
              href="mailto:info@taxiturlihof.ch"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 block mb-0.5"
            >
              E-Mail
            </a>
            <p className="text-xs text-gray-600">24h</p>
          </Card>

          {/* WhatsApp - kleiner Block */}
          <Card className="p-2 text-center border border-yellow-200 bg-yellow-50 hover:shadow-lg transition-shadow">
            <div className="bg-yellow-600 p-1.5 rounded-full w-7 h-7 mx-auto mb-1 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">WhatsApp</h3>
            <a 
              href="https://wa.me/41766113131"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 block mb-0.5"
            >
              Chat
            </a>
            <p className="text-xs text-gray-600">Schnell</p>
          </Card>

          {/* Zahlung - kleiner Block */}
          <Card className="p-2 text-center border border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow">
            <div className="bg-purple-600 p-1.5 rounded-full w-7 h-7 mx-auto mb-1 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">Zahlung</h3>
            <div className="text-xs text-purple-600 mb-0.5">
              💳 💰 📱
            </div>
            <p className="text-xs text-gray-600">Alle</p>
          </Card>

          {/* Service - kleiner Block */}
          <Card className="p-2 text-center border border-gray-200 bg-gray-50 hover:shadow-lg transition-shadow">
            <div className="bg-gray-600 p-1.5 rounded-full w-7 h-7 mx-auto mb-1 flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">Gebiet</h3>
            <div className="text-xs text-gray-600 mb-0.5">
              LU • SZ • ZG
            </div>
            <p className="text-xs text-gray-600">Region</p>
          </Card>
        </div>

        {/* Location Footer - kompakt */}
        <div className="text-center pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Taxi Türlihof – Zuverlässiger Partner seit 2010
          </p>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedContact;