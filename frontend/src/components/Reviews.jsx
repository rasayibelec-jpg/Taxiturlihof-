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
    <section id="reviews" className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Kundenbewertungen
          </h2>
          <p className="text-base text-gray-300">
            Lesen Sie, was unsere Kunden über unseren Service sagen.
          </p>
        </div>

        {/* Google Bewertung Übersicht - kompakt */}
        <div className="bg-gray-800 rounded-lg p-5 mb-8 border border-gray-700 hover:border-yellow-600 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-3 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                <h3 className="text-lg font-bold text-white">Google Bewertungen</h3>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="text-3xl font-bold text-yellow-500">
                  {contactInfo.googleRating}
                </div>
                <div>
                  <div className="flex space-x-0.5 mb-1">
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {contactInfo.reviewCount} Bewertungen
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className="bg-yellow-600 text-white px-4 py-1 mb-1 text-sm font-semibold">
                ⭐ Ausgezeichneter Service
              </Badge>
              <p className="text-xs text-gray-400">
                Verifizierte Kundenbewertungen
              </p>
            </div>
          </div>
        </div>

        {/* Individuelle Bewertungen - kleine Blöcke */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Yeni kullanıcı yorumları */}
          {userReviews.map((review) => (
            <Card key={review.id} className="p-4 hover:border-yellow-600 transition-all duration-300 border border-gray-700 bg-gray-800 text-center">
              <div className="flex justify-center mb-2">
                {renderStars(review.rating)}
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">
                {review.name}
              </h4>
              <Badge className="bg-yellow-600 text-gray-900 text-xs py-0.5 font-semibold">NEU</Badge>
            </Card>
          ))}
          
          {/* Google Bewertungen */}
          {googleReviews.map((review) => (
            <Card key={review.id} className="p-4 hover:border-gray-600 transition-all duration-300 border border-gray-700 bg-gray-800 text-center">
              <div className="flex justify-center mb-2">
                {renderStars(review.rating)}
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">
                {review.name}
              </h4>
              <p className="text-xs text-gray-400">Google</p>
            </Card>
          ))}
        </div>

        {/* Call-to-Action für mehr Bewertungen */}
        <div className="text-center">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-xl font-bold text-white mb-4">
              Bewerten Sie uns
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* QR-Code */}
              <div className="text-center">
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 inline-block mb-3">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pnol6tzt_IMG-20250911-WA0008.jpg"
                    alt="QR-Code"
                    className="w-20 h-20 mx-auto object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-yellow-500">Bewerten</p>
              </div>

              {/* Direkte Bewertung */}
              <div className="text-center">
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-xl transition-colors ${
                          star <= (hoveredRating || rating) 
                            ? 'text-yellow-500' 
                            : 'text-gray-600 hover:text-yellow-500'
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
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded mb-3 bg-gray-900 text-white placeholder-gray-500"
                    placeholder="Name"
                  />
                  <textarea
                    rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded mb-3 bg-gray-900 text-white placeholder-gray-500"
                    placeholder="Kommentar"
                  ></textarea>
                  <button 
                    type="button"
                    onClick={handleSubmitReview}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded text-sm font-bold transition-colors"
                  >
                    Senden
                  </button>
                </div>
              </div>

              {/* Kontakt */}
              <div className="text-center">
                <div className="flex flex-col space-y-3">
                  <a
                    href="tel:0766113131"
                    className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded text-sm font-semibold transition-colors duration-200 border border-gray-600"
                  >
                    📞 Anrufen
                  </a>
                  <a
                    href="mailto:rasayibelec@gmail.com"
                    className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded text-sm font-semibold transition-colors duration-200 border border-gray-600"
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