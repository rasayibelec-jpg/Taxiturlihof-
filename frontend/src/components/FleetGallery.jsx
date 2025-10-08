import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Car, MapPin, Star } from "lucide-react";

const FleetGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fleetImages = [
    {
      url: "https://customer-assets.emergentagent.com/job_taxi-luzern-web/artifacts/1brf17uv_Screenshot_20250925_125059_Photos.jpg",
      title: "Mercedes S-Klasse Premium",
      description: "Elegante schwarze Mercedes-Limousine in der Zentralschweiz"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/7exvefg3_IMG-20250908-WA0001.jpg",
      title: "Mercedes V-Klasse Van",
      description: "Geräumig für Familien und Gruppen bis 8 Personen"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/o32qjjzx_IMG-20250908-WA0002.jpg", 
      title: "Mercedes V-Klasse Premium",
      description: "Höchster Komfort für Gruppenfahrten und Flughafentransfers"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/xkyxwgjm_IMG-20250908-WA0000.jpg",
      title: "Mercedes Taxi bei Nacht",
      description: "24/7 Service - auch nachts zuverlässig unterwegs"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/p68khw91_20240707_163617.jpg", 
      title: "Mercedes E-Klasse",
      description: "Komfort und Sicherheit auf höchstem Niveau"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/qrjrp7sc_20240712210744_edited_1732630664572.png",
      title: "Stadtfahrt bei Regen", 
      description: "Zuverlässig bei jedem Wetter"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/yomelklg_20240712121846_edited_1732630664532.png",
      title: "Mercedes mit Bergpanorama",
      description: "Spektakuläre Fahrten in der Zentralschweiz"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/pb8e5md2_20250921_024901%281%29%281%29.jpg",
      title: "Mercedes Premium-Interieur",
      description: "Luxuriöse Ledersitze mit blauer Ambientebeleuchtung"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/nz8655g3_20250921_024811%281%29.jpg",
      title: "Mercedes Cockpit & Komfort",
      description: "Modernste Technologie und erstklassiger Fahrkomfort"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_taxi-luzern-app/artifacts/gf00598t_IMG-20250921-WA0005%281%29.jpg",
      title: "Mercedes Luxus-Ausstattung",
      description: "Premium-Dashboard mit fortschrittlicher Infotainment-Technik"
    }
  ];

  // Old serviceAreas array removed - now using ServicegebieteSection component

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % fleetImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + fleetImages.length) % fleetImages.length);
  };

  return (
    <section id="fleet" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unsere Flotte */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unsere Flotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Moderne Mercedes-Fahrzeuge für höchsten Komfort und Sicherheit. 
              Alle Taxis sind klimatisiert, gepflegt und bestens ausgestattet.
            </p>
          </div>

          {/* Image Carousel */}
          <div className="relative mb-8">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={fleetImages[currentImageIndex].url}
                  alt={fleetImages[currentImageIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{fleetImages[currentImageIndex].title}</h3>
                  <p className="text-gray-200">{fleetImages[currentImageIndex].description}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <Button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
              size="lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
              size="lg"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Fleet Features - Kleine Blöcke */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="text-center p-3">
              <div className="bg-yellow-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                <Car className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Mercedes-Fahrzeuge</h3>
              <p className="text-xs text-gray-600">Hochwertige Mercedes-Benz Fahrzeuge</p>
            </Card>
            <Card className="text-center p-3">
              <div className="bg-yellow-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Top-Ausstattung</h3>
              <p className="text-xs text-gray-600">Klimaanlage, Ledersitze, WLAN</p>
            </Card>
            <Card className="text-center p-3">
              <div className="bg-yellow-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">GPS-Navigation</h3>
              <p className="text-xs text-gray-600">Modernste Navigationstechnik</p>
            </Card>
          </div>
        </div>

        {/* Old Servicegebiete section removed - now using separate ServicegebieteSection component */}
      </div>
    </section>
  );
};

export default FleetGallery;