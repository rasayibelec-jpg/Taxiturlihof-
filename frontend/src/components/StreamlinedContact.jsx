import React from "react";
import { Phone, Mail, MessageCircle, CreditCard, MapPin } from "lucide-react";
import { Card } from "./ui/card";

const StreamlinedContact = () => {
  return (
    <section id="contact" className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Contact */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">
            Kontakt & Service
          </h2>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          {/* Phone */}
          <Card className="p-4 text-center border border-gray-800 bg-black hover:border-yellow-600 transition-all">
            <div className="bg-gray-800 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-700">
              <Phone className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Anrufen</h3>
            <a 
              href="tel:0766113131"
              className="text-sm font-bold text-yellow-500 hover:text-yellow-400 block mb-1"
            >
              076 611 31 31
            </a>
            <p className="text-xs text-gray-400">Zuverlässig</p>
          </Card>

          {/* Email */}
          <Card className="p-4 text-center border border-gray-800 bg-black hover:border-yellow-600 transition-all">
            <div className="bg-gray-800 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-700">
              <Mail className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">E-Mail</h3>
            <a 
              href="mailto:info@taxiturlihof.ch"
              className="text-sm font-semibold text-yellow-500 hover:text-yellow-400 block mb-1"
            >
              E-Mail
            </a>
            <p className="text-xs text-gray-400">24h</p>
          </Card>

          {/* WhatsApp */}
          <Card className="p-4 text-center border border-gray-800 bg-black hover:border-yellow-600 transition-all">
            <div className="bg-gray-800 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-700">
              <MessageCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">WhatsApp</h3>
            <a 
              href="https://wa.me/41766113131"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-yellow-500 hover:text-yellow-400 block mb-1"
            >
              Chat
            </a>
            <p className="text-xs text-gray-400">Schnell</p>
          </Card>

          {/* Zahlung */}
          <Card className="p-4 text-center border border-gray-800 bg-black hover:border-yellow-600 transition-all">
            <div className="bg-gray-800 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-700">
              <CreditCard className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Zahlung</h3>
            <div className="text-sm text-yellow-500 mb-1">
              💳 💰 📱
            </div>
            <p className="text-xs text-gray-400">Alle</p>
          </Card>

          {/* Service */}
          <Card className="p-4 text-center border border-gray-800 bg-black hover:border-yellow-600 transition-all">
            <div className="bg-gray-800 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-gray-700">
              <MapPin className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Gebiet</h3>
            <div className="text-sm text-yellow-500 mb-1">
              LU • SZ • ZG
            </div>
            <p className="text-xs text-gray-400">Region</p>
          </Card>

        </div>

        {/* Location Footer */}
        <div className="text-center pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Taxi Türlihof – Zuverlässiger Partner seit 2010
          </p>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedContact;
