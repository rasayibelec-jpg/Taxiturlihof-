import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Quote, MapPin } from "lucide-react";
import { contactInfo } from "../data/mockData";

const Reviews = () => {
  // Echte Google Bewertungen von Ihrer Google My Business Seite
  const googleReviews = [
    {
      id: 1,
      name: "Sema Celebi",
      rating: 5,
      timeAgo: "vor 6 Monaten",
      comment: "Vielen Dank für die ausgezeichnete Fahrt mit TaxiTürlihof! Ihr professioneller Fahrstil und die freundliche, zuvorkommende Art haben die Fahrt wirklich angenehm gemacht. Es ist klar, dass Sie nicht nur ein guter Fahrer sind, sondern auch ein echter Botschafter für Ihr Unternehmen.",
      originalLanguage: "Deutsch"
    },
    {
      id: 2,
      name: "M K",
      rating: 5,
      timeAgo: "vor 9 Monaten",
      comment: "Absolut zuverlässig. Sehr sauber und pünktlich. Kann ich nur weiterempfehlen!",
      originalLanguage: "Deutsch"
    },
    {
      id: 3,
      name: "Hasan Hatipoglu",
      rating: 5,
      timeAgo: "vor 2 Monaten",
      comment: "Sehr freundlich, nochmals vielen Dank! Perfekter Service und immer pünktlich.",
      originalLanguage: "Deutsch"
    }
  ];

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
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kundenbewertungen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lesen Sie, was unsere zufriedenen Kunden über unseren Service sagen.
          </p>
        </div>

        {/* Google Bewertung Übersicht */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-16 border border-yellow-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-2xl font-bold text-gray-900">Google Bewertungen</h3>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="text-6xl font-bold text-yellow-600">
                  {contactInfo.googleRating}
                </div>
                <div>
                  <div className="flex space-x-1 mb-2">
                    {renderStars(5)}
                  </div>
                  <p className="text-gray-600">
                    Basierend auf <span className="font-semibold">{contactInfo.reviewCount} Bewertungen</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 px-6 py-3 text-lg mb-4">
                ⭐ Ausgezeichneter Service
              </Badge>
              <p className="text-gray-600">
                Verifizierte Kundenbewertungen
              </p>
            </div>
          </div>
        </div>

        {/* Individuelle Bewertungen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {googleReviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Quote className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {review.name}
                </CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  {review.timeAgo} • Google Bewertung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-Action für mehr Bewertungen */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mehr Bewertungen auf Google
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Lesen Sie alle {contactInfo.reviewCount} Bewertungen oder schreiben Sie Ihre eigene Erfahrung auf Google.
            </p>
            <a
              href="https://www.google.com/search?q=Taxi+T%C3%BCrlihof+Arth&rlz=1C1GCEU_deDE832DE832&oq=Taxi+T%C3%BCrlihof+Arth&aqs=chrome..69i57.3627j0j7&sourceid=chrome&ie=UTF-8#lrd=0x478ff4df4c3c8cfe:0xad40e1d0cc2e40ad,1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Alle Bewertungen ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;