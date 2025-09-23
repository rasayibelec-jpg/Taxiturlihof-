import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Quote, MapPin, Phone, Mail } from "lucide-react";
import { contactInfo } from "../data/mockData";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert('Bitte wählen Sie eine Bewertung aus!');
      return;
    }
    
    const reviewData = {
      rating,
      name: name || 'Anonymer Kunde',
      comment,
      date: new Date().toISOString()
    };

    try {
      // Hier würde normalerweise an Backend gesendet werden
      console.log('Review submitted:', reviewData);
      alert('Vielen Dank für Ihre Bewertung!');
      
      // Form zurücksetzen
      setRating(0);
      setName('');
      setComment('');
    } catch (error) {
      alert('Fehler beim Senden der Bewertung. Bitte versuchen Sie es erneut.');
    }
  };

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

        {/* Call-to-Action für mehr Bewertungen - QR-Code + Direkte Bewertung */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Bewerten Sie unseren Service
            </h4>
            <p className="text-gray-600 mb-8">
              Ihre Meinung ist uns wichtig!
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* QR-Code Bereich */}
              <div className="text-center">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">📱 Mit QR-Code</h5>
                <div className="bg-white p-6 rounded-xl shadow-lg border inline-block">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                    alt="QR-Code für Bewertungen"
                    className="w-32 h-32 mx-auto object-contain"
                  />
                  <p className="text-sm font-semibold text-gray-800 mt-3">Bewerten</p>
                </div>
              </div>

              {/* Direkte Bewertung */}
              <div className="text-center">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">⭐ Direkt hier bewerten</h5>
                <div className="bg-white p-6 rounded-xl shadow-lg border text-left">
                  
                  {/* Sterne Bewertung */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bewertung:
                    </label>
                    <div className="flex justify-center gap-1 mb-4" id="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-btn text-3xl text-gray-300 hover:text-yellow-400 transition-colors"
                          data-rating={star}
                          onClick={() => setRating(star)}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name (optional):
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Ihr Name"
                    />
                  </div>

                  {/* Kommentar */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kommentar:
                    </label>
                    <textarea
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Wie war Ihre Erfahrung mit uns?"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="button"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Bewertung absenden
                  </button>
                </div>
              </div>

            </div>
            
            {/* Alternative Kontaktmöglichkeiten */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="tel:076 611 31 31"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-semibold shadow-md"
              >
                <Phone className="w-5 h-5 mr-2" />
                Anrufen & bewerten
              </a>
              <a
                href="mailto:info@taxiturlihof.ch?subject=Bewertung&body=Meine%20Bewertung:%0A%0ASterne:%20⭐⭐⭐⭐⭐%0A%0AKommentar:%20"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold shadow-md"
              >
                <Mail className="w-5 h-5 mr-2" />
                E-Mail senden
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;