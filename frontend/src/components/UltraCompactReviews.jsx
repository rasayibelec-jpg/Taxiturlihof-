import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { contactInfo } from "../data/mockData";

const UltraCompactReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sema Celebi",
      rating: 5,
      comment: "Vielen Dank für die ausgezeichnete Fahrt! Professioneller Service."
    },
    {
      id: 2,
      name: "M K",
      rating: 5,
      comment: "Absolut zuverlässig. Sehr sauber und pünktlich."
    },
    {
      id: 3,
      name: "Hasan Hatipoglu",
      rating: 5,
      comment: "Sehr freundlich! Perfekter Service und immer pünktlich."
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
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Google Rating */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              <h3 className="text-xl font-bold">Google Bewertungen</h3>
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
          </div>

          {/* Reviews Carousel */}
          <div className="text-center relative">
            <h4 className="text-xl font-bold mb-4">Kundenmeinungen</h4>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-center mb-3">
                {renderStars(reviews[currentReview].rating)}
              </div>
              <p className="text-gray-700 italic mb-3">
                "{reviews[currentReview].comment}"
              </p>
              <p className="font-medium text-gray-900">
                - {reviews[currentReview].name}
              </p>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={prevReview}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentReview ? 'bg-yellow-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextReview}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* QR-Code - Klein */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">
              Bewerten Sie uns
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg inline-block">
              <img 
                src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                alt="QR-Code"
                className="w-20 h-20 mx-auto object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-700">Bewerten</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UltraCompactReviews;