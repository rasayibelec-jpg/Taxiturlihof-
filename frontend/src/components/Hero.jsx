import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Phone, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/50r7ds6f_20250504_053743.jpg",
      title: "Mercedes-Flotte bei Nacht"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/yomelklg_20240712121846_edited_1732630664532.png",
      title: "Mercedes mit Bergpanorama"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/p68khw91_20240707_163617.jpg",
      title: "Mercedes E-Klasse"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/nq4c2nhv_20240712_121059.jpg",
      title: "E-Klasse Frontalansicht"
    }
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Taxi <span className="text-yellow-500">Türlihof</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ihr zuverlässiger Taxi-Service in der Zentralschweiz. 
                Schnell, sicher und professionell - Zuverlässiger Service für Sie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Zuverlässiger Service</h3>
                  <p className="text-gray-400 text-sm">Rund um die Uhr</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Lokaler Service</h3>
                  <p className="text-gray-400 text-sm">Luzern, Schwyz, Zug</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Schnelle Buchung</h3>
                  <p className="text-gray-400 text-sm">Einfach anrufen</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-yellow-600 hover:bg-yellow-700 text-white transform transition-all duration-200 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Jetzt Buchen: 076 611 31 31
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Mehr Erfahren
              </Button>
            </div>
          </div>

          {/* Hero Image Carousel */}
          <div className="lg:flex justify-center items-center hidden">
            <div className="relative" style={{minHeight: '384px'}}>
              <div className="relative overflow-hidden rounded-lg shadow-2xl" style={{minHeight: '384px'}}>
                <OptimizedImage
                  src={heroImages[currentImageIndex].url}
                  alt={`Taxi Türlihof - ${heroImages[currentImageIndex].title} - Mercedes Taxi Service in Luzern, Schwyz, Zug`}
                  className="w-full h-96 object-cover transform transition-transform duration-300 hover:scale-105"
                  width={800}
                  height={384}
                  loading="eager"
                  fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-lg"></div>
                
                {/* Navigation Buttons */}
                <Button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-0 p-2"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-0 p-2"
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Image Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {heroImages[currentImageIndex].title}
                  </h3>
                </div>
              </div>

              {/* Image Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-yellow-500' 
                        : 'bg-gray-400 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Image Display */}
          <div className="lg:hidden">
            <div className="relative">
              <img
                src={heroImages[currentImageIndex].url}
                alt={heroImages[currentImageIndex].title}
                className="w-full h-64 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-lg"></div>
              
              {/* Mobile Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-yellow-500' 
                        : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;