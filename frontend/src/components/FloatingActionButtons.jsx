import React, { useState } from "react";
import { Button } from "./ui/button";
import { Phone, Mail, MessageCircle, Plus, X } from "lucide-react";
import { contactInfo } from "../data/mockData";

const FloatingActionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePhoneCall = () => {
    window.location.href = `tel:${contactInfo.phone.replace(/\s/g, '')}`;
  };

  const handleWhatsApp = () => {
    const phoneNumber = contactInfo.phone.replace(/\s/g, '').replace(/^0/, '+41');
    const message = encodeURIComponent("Hallo! Ich möchte gerne ein Taxi buchen.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Taxi-Buchung Anfrage");
    const body = encodeURIComponent("Hallo,\n\nIch möchte gerne ein Taxi buchen.\n\nVielen Dank!");
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp
          </div>
        </Button>

        {/* Phone Button */}
        <Button
          onClick={handlePhoneCall}
          className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          size="lg"
        >
          <Phone className="w-6 h-6" />
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Anrufen
          </div>
        </Button>

        {/* Email Button */}
        <Button
          onClick={handleEmail}
          className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          size="lg"
        >
          <Mail className="w-6 h-6" />
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            E-Mail
          </div>
        </Button>
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-yellow-600 hover:bg-yellow-700 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        size="lg"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
      </Button>

      {/* Quick Phone Button (Always Visible) */}
      <div className="absolute bottom-20 left-0">
        <Button
          onClick={handlePhoneCall}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Phone className="w-5 h-5 mr-2" />
          <span className="text-sm font-semibold">{contactInfo.phone}</span>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Jetzt anrufen!
          </div>
        </Button>
      </div>
    </div>
  );
};

export default FloatingActionButtons;