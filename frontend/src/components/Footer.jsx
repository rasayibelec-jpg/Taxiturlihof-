import React from "react";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { contactInfo } from "../data/mockData";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/lxvw2ugl_Notes_250207_194337_224.jpg"
                alt="Taxi Türlihof Logo"
                className="h-12 w-auto mr-3"
              />
              <h3 className="text-2xl font-bold">
                Taxi <span className="text-yellow-500">Türlihof</span>
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ihr zuverlässiger Partner für alle Transportbedürfnisse in der Zentralschweiz. 
              Mit über 20 Jahren Erfahrung stehen wir für Qualität, Pünktlichkeit und Service.
            </p>
            <div className="flex space-x-4">
              <div className="bg-yellow-600 p-2 rounded-full">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="bg-yellow-600 p-2 rounded-full">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="bg-yellow-600 p-2 rounded-full">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dienstleistungen</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Flughafentransfer</li>
              <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Stadtfahrten</li>
              <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Geschäftsfahrten</li>
              <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Kurierfahrten</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-yellow-500" />
                <span>{contactInfo.website}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Taxi Türlihof. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200">
                Datenschutz
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200">
                Impressum
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;