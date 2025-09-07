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
              <a
                href="https://www.facebook.com/taxiturlihof"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/taxiturlihof"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988zM12.017 7.347c-2.554 0-4.624 2.069-4.624 4.624s2.069 4.624 4.624 4.624 4.624-2.069 4.624-4.624S14.571 7.347 12.017 7.347zM12.017 14.737c-1.653 0-2.995-1.342-2.995-2.995s1.342-2.995 2.995-2.995 2.995 1.342 2.995 2.995S13.67 14.737 12.017 14.737zM15.896 6.979c-.597 0-1.081-.484-1.081-1.081s.484-1.081 1.081-1.081 1.081.484 1.081 1.081S16.493 6.979 15.896 6.979z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/41766113131"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-colors duration-200"
                style={{ backgroundColor: '#25D366' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#128C7E'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
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