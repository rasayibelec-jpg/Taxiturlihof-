import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/mockData";

const CompactReviews = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Google Bewertung Übersicht */}
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              <h3 className="text-lg font-bold text-gray-900">Google</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {contactInfo.googleRating}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <p className="text-sm text-gray-600">
              {contactInfo.reviewCount} Bewertungen
            </p>
          </Card>

          {/* QR-Code zum Bewerten */}
          <Card className="p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Bewerten Sie uns
            </h4>
            <div className="bg-white p-4 rounded-lg shadow-sm border inline-block mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                alt="QR-Code für Bewertungen"
                className="w-20 h-20 mx-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">Bewerten</p>
          </Card>

          {/* Link zu allen Bewertungen */}
          <Card className="p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Alle Bewertungen
            </h4>
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm mb-4">
              ⭐ Ausgezeichneter Service
            </Badge>
            <div>
              <Link 
                to="/reviews"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Alle Bewertungen lesen →
              </Link>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default CompactReviews;