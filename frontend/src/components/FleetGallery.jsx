import React from "react";
import { Card } from "./ui/card";
import { Car, MapPin, Star } from "lucide-react";
import ModernCarSlider from "./ModernCarSlider";

const FleetGallery = () => {
  const fleetImages = [
    {
      url: "/images/fleet/vzfxjeyp_20250504_053743.webp",
      title: "Mercedes-Flotte Taxi Türlihof",
      description: "Unsere komplette Mercedes-Flotte: V-Klasse Van und Premium-Limousinen bei Nacht"
    },
    {
      url: "/images/fleet/1brf17uv_Screenshot.webp",
      title: "Mercedes S-Klasse Premium",
      description: "Elegante schwarze Mercedes-Limousine in der Zentralschweiz"
    },
    {
      url: "/images/fleet/7exvefg3_IMG.webp",
      title: "Mercedes V-Klasse Van",
      description: "Geräumig für Familien und Gruppen bis 8 Personen"
    },
    {
      url: "/images/fleet/o32qjjzx_IMG.webp", 
      title: "Mercedes V-Klasse Premium",
      description: "Höchster Komfort für Gruppenfahrten und Flughafentransfers"
    },
    {
      url: "/images/fleet/xkyxwgjm_IMG.webp",
      title: "Mercedes Taxi bei Nacht",
      description: "Zuverlässig Service - auch nachts zuverlässig unterwegs"
    },
    {
      url: "/images/fleet/p68khw91_20240707.webp", 
      title: "Mercedes E-Klasse",
      description: "Komfort und Sicherheit auf höchstem Niveau"
    },
    {
      url: "/images/fleet/qrjrp7sc_edited.webp",
      title: "Stadtfahrt bei Regen", 
      description: "Zuverlässig bei jedem Wetter"
    },
    {
      url: "/images/fleet/yomelklg_edited.webp",
      title: "Mercedes mit Bergpanorama",
      description: "Spektakuläre Fahrten in der Zentralschweiz"
    },
    {
      url: "/images/fleet/pb8e5md2_024901.webp",
      title: "Mercedes Premium-Interieur",
      description: "Luxuriöse Ledersitze mit blauer Ambientebeleuchtung"
    },
    {
      url: "/images/fleet/nz8655g3_024811.webp",
      title: "Mercedes Cockpit & Komfort",
      description: "Modernste Technologie und erstklassiger Fahrkomfort"
    },
    {
      url: "/images/fleet/gf00598t_WA0005.webp",
      title: "Mercedes Luxus-Ausstattung",
      description: "Premium-Dashboard mit fortschrittlicher Infotainment-Technik"
    }
  ];

  return (
    <section id="fleet" className="py-12 bg-[#0b1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unsere Flotte */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Unsere Flotte
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Moderne Mercedes-Fahrzeuge für höchsten Komfort und Sicherheit. 
              Alle Taxis sind klimatisiert, gepflegt und bestens ausgestattet.
            </p>
          </div>

          {/* Modern Autoplay Slider */}
          <div className="mb-12">
            <ModernCarSlider images={fleetImages} autoPlayInterval={5000} />
          </div>

          {/* Fleet Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-yellow-500 transition-all duration-300 shadow-xl">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Car className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-white">Mercedes-Fahrzeuge</h3>
              <p className="text-sm text-gray-400">Hochwertige Mercedes-Benz Fahrzeuge</p>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-yellow-500 transition-all duration-300 shadow-xl">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-white">Top-Ausstattung</h3>
              <p className="text-sm text-gray-400">Klimaanlage, Ledersitze, WLAN</p>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-yellow-500 transition-all duration-300 shadow-xl">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-white">GPS-Navigation</h3>
              <p className="text-sm text-gray-400">Modernste Navigationstechnik</p>
            </Card>
          </div>
        </div>

        {/* Old Servicegebiete section removed - now using separate ServicegebieteSection component */}
      </div>
    </section>
  );
};

export default FleetGallery;