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
    <section id="reviews" className="py-4 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-white mb-1">
            Kundenbewertungen
          </h2>
          <p className="text-sm text-gray-200">
            Lesen Sie, was unsere Kunden über unseren Service sagen.
          </p>
        </div>

        {/* Google Bewertung Übersicht - kompakt */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg p-3 mb-4 border-0 hover:border hover:border-yellow-300 transition-all duration-300 hover:shadow-xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-2 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-1">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                <h3 className="text-base font-bold text-gray-900">Google Bewertungen</h3>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <div className="text-2xl font-bold text-gray-900">
                  {contactInfo.googleRating}
                </div>
                <div>
                  <div className="flex space-x-0.5 mb-0.5">
                    {renderStars(5)}
                  </div>
                  <p className="text-xs text-gray-800">
                    {contactInfo.reviewCount} Bewertungen
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className="bg-gray-900 text-yellow-400 px-3 py-1 mb-1 text-xs">
                ⭐ Ausgezeichneter Service
              </Badge>
              <p className="text-xs text-gray-900">
                Verifizierte Kundenbewertungen
              </p>
            </div>
          </div>
        </div>

        {/* Individuelle Bewertungen - kleine Blöcke */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {/* Yeni kullanıcı yorumları - kompakt */}
          {userReviews.map((review) => (
            <Card key={review.id} className="p-2 hover:shadow-xl transition-all duration-300 border border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-300 text-center shadow-lg">
              <div className="flex justify-center mb-1">
                {renderStars(review.rating)}
              </div>
              <h4 className="text-xs font-semibold text-gray-900 mb-1">
                {review.name}
              </h4>
              <Badge className="bg-gray-900 text-yellow-400 text-xs py-0">NEU</Badge>
            </Card>
          ))}
          
          {/* Google Bewertungen - kompakt */}
          {googleReviews.map((review) => (
            <Card key={review.id} className="p-2 hover:shadow-xl transition-all duration-300 border border-gray-500 bg-gradient-to-br from-gray-100 to-gray-50 text-center shadow-lg">
              <div className="flex justify-center mb-1">
                {renderStars(review.rating)}
              </div>
              <h4 className="text-xs font-semibold text-gray-900 mb-1">
                {review.name}
              </h4>
              <p className="text-xs text-gray-600">Google</p>
            </Card>
          ))}
        </div>

        {/* Call-to-Action für mehr Bewertungen - sehr kompakt */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-3 border border-gray-300 shadow-lg">
            <h4 className="text-sm font-bold text-gray-900 mb-2">
              Bewerten Sie uns
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* QR-Code - sehr klein */}
              <div className="text-center">
                <div className="bg-white p-2 rounded-lg shadow border inline-block mb-2">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                    alt="QR-Code"
                    className="w-16 h-16 mx-auto object-contain"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-800">Bewerten</p>
              </div>

              {/* Direkte Bewertung - sehr kompakt */}
              <div className="text-center">
                <div className="bg-white p-2 rounded-lg shadow border">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-lg transition-colors ${
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
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-2"
                    placeholder="Name"
                  />
                  <textarea
                    rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-2"
                    placeholder="Kommentar"
                  ></textarea>
                  <button 
                    type="button"
                    onClick={handleSubmitReview}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs font-semibold"
                  >
                    Senden
                  </button>
                </div>
              </div>

              {/* Kontakt - kompakt & horizontal */}
              <div className="text-center">
                <div className="flex justify-center space-x-3">
                  <a
                    href="tel:076 611 31 31"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold transition-colors duration-200"
                  >
                    📞 Anrufen
                  </a>
                  <a
                    href="mailto:info@taxiturlihof.ch"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-semibold transition-colors duration-200"
                  >
                    ✉️ E-Mail
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;