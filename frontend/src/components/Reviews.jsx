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
  const [userReviews, setUserReviews] = useState([]); // Yeni yorumlar için

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert('Bitte wählen Sie eine Bewertung aus!');
      return;
    }
    
    const reviewData = {
      id: Date.now(),
      rating,
      name: name || 'Anonymer Kunde',
      comment: comment || 'Danke für den Service!',
      date: new Date().toISOString(),
      timeAgo: 'gerade eben'
    };

    try {
      // Yorumu listeye ekle
      setUserReviews([reviewData, ...userReviews]);
      alert('Vielen Dank für Ihre Bewertung! Ihre Bewertung wird jetzt angezeigt.');
      
      // Form zurücksetzen
      setRating(0);
      setName('');
      setComment('');
    } catch (error) {
      alert('Fehler beim Senden der Bewertung. Bitte versuchen Sie es erneut.');
    }
  };

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
    <section id="reviews" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Kundenbewertungen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lesen Sie, was unsere Kunden über unseren Service sagen.
          </p>
        </div>

        {/* Google Bewertung Übersicht - kompakt */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border border-yellow-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                <h3 className="text-lg font-bold text-gray-900">Google Bewertungen</h3>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="text-3xl font-bold text-yellow-600">
                  {contactInfo.googleRating}
                </div>
                <div>
                  <div className="flex space-x-1 mb-1">
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {contactInfo.reviewCount} Bewertungen
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 px-4 py-2 mb-2">
                ⭐ Ausgezeichneter Service
              </Badge>
              <p className="text-xs text-gray-600">
                Verifizierte Kundenbewertungen
              </p>
            </div>
          </div>
        </div>

        {/* Individuelle Bewertungen - kompakter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Yeni kullanıcı yorumlarını üstte göster */}
          {userReviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-lg transition-all duration-300 border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Quote className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                  {review.name}
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">NEU</Badge>
                </CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  {review.timeAgo} • Website Bewertung
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
          
          {/* Google Bewertungen - kompakt */}
          {googleReviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-yellow-100 p-1 rounded-full">
                    <Quote className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <CardTitle className="text-base font-semibold text-gray-900">
                  {review.name}
                </CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  {review.timeAgo} • Google Bewertung
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-Action für mehr Bewertungen - kompakt */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h4 className="text-lg font-bold text-gray-900 mb-3">
              Bewerten Sie unseren Service
            </h4>
            <p className="text-gray-600 mb-4">
              Ihre Meinung ist uns wichtig!
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* QR-Code Bereich - kompakt */}
              <div className="text-center">
                <h5 className="text-base font-semibold text-gray-800 mb-3">📱 Mit QR-Code</h5>
                <div className="bg-white p-4 rounded-lg shadow border inline-block">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                    alt="QR-Code für Bewertungen"
                    className="w-24 h-24 mx-auto object-contain"
                  />
                  <p className="text-sm font-semibold text-gray-800 mt-2">Bewerten</p>
                </div>
              </div>

              {/* Direkte Bewertung - kompakt */}
              <div className="text-center">
                <h5 className="text-base font-semibold text-gray-800 mb-3">⭐ Direkt hier bewerten</h5>
                <div className="bg-white p-4 rounded-lg shadow border text-left">
                  
                  {/* Sterne Bewertung */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Bewertung:
                    </label>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`text-2xl transition-colors ${
                            star <= (hoveredRating || rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-center text-yellow-600 font-medium text-xs">
                        {rating} von 5 Sternen
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Name (optional):
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Ihr Name"
                    />
                  </div>

                  {/* Kommentar */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Kommentar:
                    </label>
                    <textarea
                      rows="2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Wie war Ihre Erfahrung?"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="button"
                    onClick={handleSubmitReview}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm font-semibold transition-colors duration-200"
                  >
                    Bewertung absenden
                  </button>
                </div>
              </div>

            </div>
            
            {/* Alternative Kontaktmöglichkeiten - kompakt */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href="tel:076 611 31 31"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Anrufen & bewerten
              </a>
              <a
                href="mailto:info@taxiturlihof.ch?subject=Bewertung&body=Meine%20Bewertung:%0A%0ASterne:%20⭐⭐⭐⭐⭐%0A%0AKommentar:%20"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
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