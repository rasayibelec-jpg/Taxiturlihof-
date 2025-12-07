import React, { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/mockData";

const CompactReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sema Celebi",
      rating: 5,
      comment: "Vielen Dank für die ausgezeichnete Fahrt! Professioneller Fahrstil und freundliche Art."
    },
    {
      id: 2,
      name: "M K",
      rating: 5,
      comment: "Absolut zuverlässig. Sehr sauber und pünktlich. Kann ich nur weiterempfehlen!"
    },
    {
      id: 3,
      name: "Hasan Hatipoglu",
      rating: 5,
      comment: "Sehr freundlich, nochmals vielen Dank! Perfekter Service und immer pünktlich."
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Google Rating */}
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
                width="20"
                height="20"
              />
              <h3 className="text-lg font-bold">Google</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {contactInfo.googleRating}
            </div>
            <div className="flex justify-center mb-1">
              {renderStars(5)}
            </div>
            <p className="text-xs text-gray-600">
              {contactInfo.reviewCount} Bewertungen
            </p>
          </Card>

          {/* Reviews Carousel */}
          <Card className="p-4 relative">
            <div className="text-center mb-3">
              <h4 className="text-lg font-semibold">Kundenmeinungen</h4>
            </div>
            
            <div className="relative overflow-hidden">
              <div className="flex justify-center mb-2">
                {renderStars(reviews[currentReview].rating)}
              </div>
              <p className="text-sm text-gray-700 italic text-center mb-2">
                "{reviews[currentReview].comment}"
              </p>
              <p className="text-xs font-medium text-center">
                - {reviews[currentReview].name}
              </p>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center items-center mt-3 space-x-4">
              <button
                onClick={prevReview}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex space-x-1">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentReview ? 'bg-yellow-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextReview}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Card>

          {/* QR-Code - Kompakt */}
          <Card className="p-4 text-center">
            <h4 className="text-lg font-semibold mb-3">
              Bewerten Sie uns
            </h4>
            <div className="bg-white p-3 rounded-lg shadow-sm border inline-block mb-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                alt="QR-Code für Google Bewertung"
                className="w-16 h-16 mx-auto object-contain"
                width="64"
                height="64"
              />
            </div>
            <p className="text-sm text-gray-600">Bewerten</p>
          </Card>

        </div>

        {/* Link zu allen Bewertungen */}
        <div className="text-center mt-4">
          <Link 
            to="/reviews"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm"
          >
            Alle Bewertungen lesen →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompactReviews;