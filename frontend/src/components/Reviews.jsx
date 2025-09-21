import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Quote, MapPin, Phone, Mail } from "lucide-react";
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

        {/* Call-to-Action für mehr Bewertungen - blockierung-resistente Lösung */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              Bewerten Sie unseren Service
            </h4>
            <p className="text-gray-600 mb-6">
              Ihre Meinung ist uns wichtig! Teilen Sie Ihre Erfahrung mit anderen Kunden.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border inline-block mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/4e8xw813_image.png"
                alt="QR-Code für Bewertungen"
                className="w-40 h-40 mx-auto"
              />
            </div>
            
            {/* Schritt-für-Schritt Bewertungsanleitung */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
              <h5 className="font-bold text-blue-900 mb-4 text-lg">📱 So bewerten Sie uns - 3 einfache Schritte:</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                  <h6 className="font-semibold text-gray-900 mb-2">Google öffnen</h6>
                  <p className="text-sm text-gray-700">Öffnen Sie Google Maps oder google.com in Ihrem Browser</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                  <h6 className="font-semibold text-gray-900 mb-2">Suchen</h6>
                  <p className="text-sm text-gray-700">Suchen Sie nach: <strong>"Taxi Türlihof Arth"</strong></p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                  <h6 className="font-semibold text-gray-900 mb-2">Bewerten</h6>
                  <p className="text-sm text-gray-700">Klicken Sie auf "Bewertung schreiben" und wählen Sterne</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('Taxi Türlihof Arth').catch(() => {});
                  alert('✅ Suchtext kopiert!\n\nÖffnen Sie jetzt Google Maps oder Google.com und fügen Sie den kopierten Text ein, um uns zu bewerten.\n\nSuchtext: "Taxi Türlihof Arth"');
                }}
                className="inline-flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-semibold shadow-md"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Suchtext kopieren & Google öffnen
              </button>
              <a
                href="tel:076 611 31 31"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-semibold shadow-md"
              >
                <Phone className="w-5 h-5 mr-2" />
                Direkt anrufen & bewerten
              </a>
            </div>
            
            {/* Alternative Bewertungsplattformen - funktionierend */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">Alternative Bewertungsplattformen:</p>
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                <a
                  href="https://local.ch/de/d/Arth/6415/Taxi/Taxi-T%C3%BCrlihof-081888943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 font-semibold"
                >
                  <span className="text-white mr-2">⭐</span>
                  local.ch bewerten
                </a>
                <a
                  href="mailto:info@taxiturlihof.ch?subject=Bewertung%20für%20Taxi%20Türlihof&body=Liebe%20Team%20von%20Taxi%20Türlihof,%0A%0AIch%20möchte%20gerne%20eine%20Bewertung%20abgeben:%0A%0ASterne:%20⭐⭐⭐⭐⭐%0A%0AMein%20Feedback:%0A%0A%0A%0AVielen%20Dank%20für%20den%20ausgezeichneten%20Service!"
                  className="inline-flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold"
                >
                  <Mail className="w-4 h-4 text-white mr-2" />
                  E-Mail Bewertung senden
                </a>
              </div>
              
              {/* SMS Bewertung als zusätzliche Option */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h6 className="font-semibold text-green-900 mb-2">📱 SMS-Bewertung (einfachste Methode):</h6>
                <p className="text-sm text-green-800 mb-3">
                  Senden Sie uns eine SMS mit Ihrer Bewertung an: <strong>076 611 31 31</strong>
                </p>
                <a
                  href="sms:076 611 31 31?body=Meine Bewertung für Taxi Türlihof:%0A%0ASterne: ⭐⭐⭐⭐⭐%0A%0AKommentar: "
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
                >
                  💬 SMS-Bewertung senden
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;