import React from "react";
import { Phone, Mail, MessageCircle, CreditCard, MapPin } from "lucide-react";
import { Card } from "./ui/card";

const StreamlinedContact = () => {
  return (
    <section id="contact" className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Contact */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Kontakt & Service
          </h2>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">

          {/* Phone */}
          <Card className="p-3 text-center border border-gray-200 bg-white hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center border border-gray-300">
              <Phone className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-1">Anrufen</h3>
            <a 
              href="tel:0766113131"
              className="text-xs font-bold text-gray-900 hover:text-gray-700 block mb-1"
            >
              076 611 31 31
            </a>
            <p className="text-xs text-gray-600">Zuverlässig</p>
          </Card>

          {/* Email */}
          <Card className="p-3 text-center border border-gray-200 bg-white hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center border border-gray-300">
              <Mail className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-1">E-Mail</h3>
            <a 
              href="mailto:info@taxiturlihof.ch"
              className="text-xs font-semibold text-gray-900 hover:text-gray-700 block mb-1"
            >
              E-Mail
            </a>
            <p className="text-xs text-gray-600">24h</p>
          </Card>

          {/* WhatsApp */}
          <Card className="p-3 text-center border border-gray-200 bg-white hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center border border-gray-300">
              <MessageCircle className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-1">WhatsApp</h3>
            <a 
              href="https://wa.me/41766113131"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-900 hover:text-gray-700 block mb-1"
            >
              Chat
            </a>
            <p className="text-xs text-gray-600">Schnell</p>
          </Card>

          {/* Zahlung */}
          <Card className="p-3 text-center border border-gray-200 bg-white hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center border border-gray-300">
              <CreditCard className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-1">Zahlung</h3>
            <div className="text-xs text-gray-900 mb-1">
              💳 💰 📱
            </div>
            <p className="text-xs text-gray-600">Alle</p>
          </Card>

          {/* Service */}
          <Card className="p-3 text-center border border-gray-200 bg-white hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center border border-gray-300">
              <MapPin className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-1">Gebiet</h3>
            <div className="text-xs text-gray-900 mb-1">
              LU • SZ • ZG
            </div>
            <p className="text-xs text-gray-600">Region</p>
          </Card>

        </div>

        {/* Location Footer */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Taxi Türlihof – Zuverlässiger Partner seit 2010
          </p>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedContact;