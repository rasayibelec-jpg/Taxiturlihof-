import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const GoogleBusinessProfile = () => {
  return (
    <div className="space-y-6">
      {/* Google Business Profile Integration */}
      <Card className="shadow-lg border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google" 
              className="w-8 h-8 mr-3"
              width="32"
              height="32"
            />
            Taxi Türlihof auf Google
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Reviews Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-900">5.0</span>
                <span className="text-gray-600">(39 Bewertungen)</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Verifiziert</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">5 Sterne</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-medium">33</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">4 Sterne</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                  <span className="text-sm font-medium">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">3 Sterne</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                  <span className="text-sm font-medium">0</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-700 italic">
                  "Sehr zuverlässig und pünktlich. Die Mercedes-Fahrzeuge sind immer sauber und komfortabel."
                </p>
                <p className="text-xs text-gray-500">- Maria K., vor 2 Wochen</p>
              </div>
            </div>
            
            <a 
              href="https://g.page/r/CRQyKFh8TYyuEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Bewertung auf Google schreiben</span>
            </a>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Geschäftsinformationen</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Luzern, Schwyz, Zug - Zentralschweiz</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href="tel:076 611 31 31" className="text-sm text-blue-600 hover:underline">
                  076 611 31 31
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">24 Stunden geöffnet</span>
              </div>
            </div>
          </div>

          {/* Keywords & Categories */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Kategorien</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Taxiunternehmen</Badge>
              <Badge variant="outline">Flughafentransfer</Badge>
              <Badge variant="outline">Taxi-Service</Badge>
              <Badge variant="outline">Personentransport</Badge>
              <Badge variant="outline">24-Stunden-Service</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Local Citations & Directories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Lokale Verzeichnisse & Backlinks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Empfohlene Einträge:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Google My Business ✓</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>local.ch (empfohlen)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>search.ch (empfohlen)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>gelbeseiten.ch (empfohlen)</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Branchenverzeichnisse:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Taxi-Verband Schweiz</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Luzern Tourismus</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Zentralschweiz.ch</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>TripAdvisor</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Keywords Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Keyword-Performance Übersicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2">Top Keywords</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex justify-between">
                    <span>Taxi Luzern</span>
                    <Badge variant="outline" className="text-xs">Pos. 3</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Taxi Schwyz</span>
                    <Badge variant="outline" className="text-xs">Pos. 2</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Flughafentransfer</span>
                    <Badge variant="outline" className="text-xs">Pos. 5</Badge>
                  </li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-semibold text-yellow-800 mb-2">Verbesserungspotential</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex justify-between">
                    <span>Taxi Zug</span>
                    <Badge variant="outline" className="text-xs">Pos. 8</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Airport Transfer</span>
                    <Badge variant="outline" className="text-xs">Pos. 12</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Taxi 24h</span>
                    <Badge variant="outline" className="text-xs">Pos. 15</Badge>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2">Long-Tail Keywords</h4>
                <ul className="text-sm space-y-1">
                  <li className="text-xs">Mercedes Taxi Luzern</li>
                  <li className="text-xs">24h Taxi Zentralschweiz</li>
                  <li className="text-xs">Flughafen Zürich Taxi</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">SEO-Empfehlungen:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Mehr lokale Backlinks von Luzern/Schwyz/Zug Websites</li>
                <li>• Regelmäßige Google Posts mit aktuellen Angeboten</li>
                <li>• Kundenbewertungen aktiv sammeln</li>
                <li>• Schema Markup für Events und Angebote erweitern</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleBusinessProfile;