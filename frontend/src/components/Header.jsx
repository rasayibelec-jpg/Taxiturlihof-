import React, { useState } from "react";
import { Button } from "./ui/button";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStadteDropdownOpen, setIsStadteDropdownOpen] = useState(false);

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
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Preisrechner
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Buchen
            </button>
            
            {/* Städte Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsStadteDropdownOpen(!isStadteDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Städte
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
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Dienstleistungen
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Bewertungen
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Kontakt
            </button>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Phone className="w-4 h-4 mr-2" />
              Jetzt Buchen
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("calculator")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Preisrechner
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Buchen
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Dienstleistungen
              </button>
              <button
                onClick={() => scrollToSection("fleet")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Unsere Flotte
              </button>
              <button
                onClick={() => scrollToSection("payment")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Zahlungsmethoden
              </button>
              <button
                onClick={() => scrollToSection("coverage")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Abdeckung
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Bewertungen
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              >
                Kontakt
              </button>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
                <Phone className="w-4 h-4 mr-2" />
                Jetzt Buchen
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;