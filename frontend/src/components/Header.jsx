import React, { useState } from "react";
import { Button } from "./ui/button";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStadteDropdownOpen, setIsStadteDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/lxvw2ugl_Notes_250207_194337_224.jpg"
              alt="Taxi Türlihof Logo"
              className="h-12 w-auto mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Taxi <span className="text-yellow-600">Türlihof</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/preisrechner"
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Preisrechner
            </Link>
            <Link
              to="/buchen"
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Buchen
            </Link>
            
            {/* Städte Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsStadteDropdownOpen(!isStadteDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Dienstleistungen
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {isStadteDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/taxi-luzern"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsStadteDropdownOpen(false)}
                  >
                    Taxi Luzern
                  </Link>
                  <Link
                    to="/taxi-schwyz"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsStadteDropdownOpen(false)}
                  >
                    Taxi Schwyz
                  </Link>
                  <Link
                    to="/taxi-zug"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsStadteDropdownOpen(false)}
                  >
                    Taxi Zug
                  </Link>
                  <Link
                    to="/flughafentransfer"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsStadteDropdownOpen(false)}
                  >
                    Flughafentransfer
                  </Link>
                  <Link
                    to="/flughafen-zurich-transfer"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsStadteDropdownOpen(false)}
                  >
                    ✈️ Flughafen Zürich
                  </Link>
                  <Link
                    to="/flotte"
                    className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsStadteDropdownOpen(false)}
                  >
                    Unsere Flotte
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Kontakt
            </button>
            <Link
              to="/booking-lookup"
              className="hidden md:block text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              title="Buchung suchen"
            >
              🔍 Buchung suchen
            </Link>
            <Link
              to="/admin"
              className="hidden md:block text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
              title="Admin Dashboard - Buchungen verwalten"
            >
              🔧 Admin
            </Link>
            <Link
              to="/booking-lookup"
              className="md:hidden bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors duration-200"
              title="Buchung suchen"
            >
              🔍 Suchen
            </Link>
            <Link
              to="/admin"
              className="md:hidden bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors duration-200"
              title="Admin Dashboard"
            >
              🔧 Admin
            </Link>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Phone className="w-4 h-4 mr-2" />
              076 611 31 31
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Kompakt */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              
              {/* Wichtigste Links zuerst */}
              <Link
                to="/admin"
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold text-center transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                🔧 Admin Dashboard
              </Link>
              
              <Link
                to="/preisrechner"
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded font-semibold text-center transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                💰 Preisrechner
              </Link>
              
              <Link
                to="/buchen"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold text-center transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                📱 Jetzt Buchen
              </Link>
              
              {/* Städte kompakt */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/taxi-luzern"
                  className="text-center py-2 px-3 bg-gray-100 rounded text-sm hover:bg-yellow-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🏰 Luzern
                </Link>
                <Link
                  to="/taxi-schwyz"
                  className="text-center py-2 px-3 bg-gray-100 rounded text-sm hover:bg-yellow-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🏔️ Schwyz
                </Link>
                <Link
                  to="/taxi-zug"
                  className="text-center py-2 px-3 bg-gray-100 rounded text-sm hover:bg-yellow-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🚂 Zug
                </Link>
                <Link
                  to="/flughafentransfer"
                  className="text-center py-2 px-3 bg-gray-100 rounded text-sm hover:bg-yellow-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ✈️ Flughafen
                </Link>
              </div>
              
              {/* Weitere Links kompakt */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/flotte"
                  className="text-center py-2 px-3 bg-gray-100 rounded text-sm hover:bg-yellow-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🚗 Flotte
                </Link>
                <Link
                  to="/blog"
                  className="text-center py-2 px-3 bg-gray-100 rounded text-sm hover:bg-yellow-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📖 Blog
                </Link>
              </div>
              
              {/* Kontakt */}
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setIsMenuOpen(false);
                }}
                className="text-center py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors duration-200"
              >
                📞 Kontakt & Anruf
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;