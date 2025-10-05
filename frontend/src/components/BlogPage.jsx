import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, ArrowRight, MapPin, Plane, Car } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "./SEOHead";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Die 10 schönsten Ausflugsziele rund um den Vierwaldstättersee",
      excerpt: "Entdecken Sie mit Taxi Türlihof die malerischsten Orte am Vierwaldstättersee. Von Weggis bis Vitznau - wir bringen Sie zu allen Highlights.",
      content: `Der Vierwaldstättersee ist eine der schönsten Regionen der Schweiz und bietet unzählige Ausflugsmöglichkeiten. Als lokaler Taxi-Service kennen wir alle versteckten Perlen und bringen Sie sicher zu jedem Ziel.

## Die Top 10 Ausflugsziele:

### 1. Mount Pilatus
Der "Drache von Luzern" bietet spektakuläre Aussichten. Wir fahren Sie zur Pilatus-Bahnen Talstation.

### 2. Mount Rigi - Königin der Berge  
Europa's erste Bergbahn erwartet Sie. Transfer zur Rigi-Bahnen in Vitznau oder Goldau.

### 3. Kapellbrücke Luzern
Das Wahrzeichen der Schweiz - direkt in der Luzerner Altstadt.

### 4. Verkehrshaus der Schweiz
Das meistbesuchte Museum der Schweiz in Luzern.

### 5. KKL Luzern (Kultur- und Kongresszentrum)
Architektonisches Meisterwerk am Seeufer.

### 6. Weggis Seeufer
Malerisches Dorf am Fuße der Rigi.

### 7. Vitznau
Ausgangspunkt der Rigi-Bahnen mit herrlichem Seeblick.

### 8. Brunnen
Historischer Ort am südlichen Seeufer.

### 9. Gersau
Kleinste Republik der Welt (historisch).

### 10. Stoos
Höchstgelegenes Dorf der Zentralschweiz.

**Ihr Vorteil mit Taxi Türlihof:**
- Keine Parkplatzsuche
- Lokale Geheimtipps von unseren Fahrern
- Flexibler Transport zwischen den Zielen
- 24/7 verfügbar für spontane Ausflüge

Buchen Sie noch heute Ihre Ausflugstour!`,
      date: "2024-12-08",
      category: "Ausflüge",
      readTime: "5 min",
      image: "/api/placeholder/600/300",
      tags: ["Vierwaldstättersee", "Ausflüge", "Luzern", "Rigi", "Pilatus"]
    },
    {
      id: 2,
      title: "Flughafentransfer: Was Sie für Ihre Reise wissen müssen",
      excerpt: "Tipps und Tricks für einen stressfreien Flughafentransfer von der Zentralschweiz nach Zürich und Basel.",
      content: `Ein Flughafentransfer kann stressig sein - muss er aber nicht! Mit der richtigen Planung und einem zuverlässigen Taxi-Service wie Taxi Türlihof wird Ihre Reise entspannt.

## Wichtige Tipps für Ihren Flughafentransfer:

### Rechtzeitig buchen
- Mindestens 24h vor Abflug buchen
- Bei wichtigen Terminen 48h im Voraus
- Stoßzeiten (Ferienzeit) früher buchen

### Pufferzeit einplanen
- **Schweiz/Europa:** 2h vor Abflug am Flughafen
- **Interkontinental:** 3h vor Abflug am Flughafen
- **Verkehr berücksichtigen:** +30 Min in der Rush Hour

### Flughafen Zürich ab Luzern
- **Fahrtzeit:** 60-75 Minuten
- **Kosten:** ab CHF 200
- **Route:** A14 → A4 → Flughafen

### Flughafen Basel ab Luzern  
- **Fahrtzeit:** 90-110 Minuten
- **Kosten:** ab CHF 280
- **Route:** A2 → A3 → EuroAirport

### Gepäck-Checkliste
- Handgepäck griffbereit
- Reisedokumente checken
- Flüssigkeiten unter 100ml
- Laptop/Tablet leicht zugänglich

### Was Taxi Türlihof bietet:
- **Flug-Monitoring:** Wir verfolgen Ihren Flug
- **Kostenlose Wartezeit:** Bei Verspätungen
- **Mercedes-Komfort:** Geräumig für Gepäck
- **24/7 Service:** Auch für frühe/späte Flüge

**Unser Geheimtipp:** Buchen Sie den Rückweg gleich mit - so haben Sie nach der Landung garantiert ein Taxi!`,
      date: "2024-12-05",
      category: "Reise-Tipps",
      readTime: "4 min", 
      image: "/api/placeholder/600/300",
      tags: ["Flughafentransfer", "Zürich", "Basel", "Reise-Tipps"]
    },
    {
      id: 3,
      title: "Mercedes-Flotte: Warum Qualität bei Taxi-Service wichtig ist",
      excerpt: "Erfahren Sie, warum wir ausschließlich auf Mercedes-Fahrzeuge setzen und was das für Ihren Fahrkomfort bedeutet.",
      content: `Bei Taxi Türlihof fahren Sie ausschließlich Mercedes - aber warum ist uns das so wichtig? Die Antwort liegt in unserem Qualitätsversprechen.

## Warum Mercedes bei Taxi Türlihof?

### Sicherheit hat Priorität
- **5-Sterne Euro-NCAP-Bewertung** bei allen Modellen
- **Modernste Assistenzsysteme** (Spurhalteassistent, Notbremsassistent)
- **Stabile Karosserie** für maximalen Schutz
- **Regelmäßige Wartung** in Mercedes-Werkstätten

### Komfort für jeden Anlass
- **C-Klasse:** Ideal für Stadtfahrten und Business
- **E-Klasse:** Premium-Komfort für längere Strecken  
- **S-Klasse:** Luxus für besondere Anlässe
- **V-Klasse:** Platz für bis zu 8 Personen

### Zuverlässigkeit
- **Bewährte Technik** mit hoher Laufleistung
- **Präzise Wartungsintervalle** für Verfügbarkeit
- **Ersatzteilversorgung** schweizweit garantiert
- **Professionelle Fahrer-Schulungen** auf Mercedes-Technik

### Umwelt & Effizienz
- **Moderne Euro-6-Motoren** für niedrige Emissionen
- **Effiziente Automatikgetriebe** sparen Kraftstoff
- **Start-Stopp-Automatik** reduziert Verbrauch im Stadtverkehr

### Ihre Vorteile:
1. **Konstante Qualität** - jede Fahrt gleicher Standard
2. **Gepäckkapazität** - große Kofferräume
3. **Klimakomfort** - optimale Temperatur bei jedem Wetter
4. **Leise Fahrweise** - entspannte Unterhaltung möglich
5. **Prestige** - seriöser Auftritt bei Geschäftsterminen

**Fazit:** Qualität kostet nicht mehr - sie zahlt sich aus. In Komfort, Sicherheit und Zuverlässigkeit.`,
      date: "2024-12-02",
      category: "Unternehmen",
      readTime: "3 min",
      image: "/api/placeholder/600/300", 
      tags: ["Mercedes", "Qualität", "Sicherheit", "Komfort"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Taxi Türlihof Blog
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Tipps, Tricks und Wissenswertes rund um Taxi-Service, Ausflüge und Reisen in der Zentralschweiz
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Car className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm opacity-80">Taxi Türlihof</p>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-100 text-yellow-800">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('de-CH')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold hover:text-yellow-600 transition-colors duration-200">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
                  >
                    Weiterlesen
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bleiben Sie informiert
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Erhalten Sie die neuesten Tipps und Angebote von Taxi Türlihof
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Ihre E-Mail-Adresse"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Anmelden
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Benötigen Sie eine Fahrt?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Buchen Sie jetzt Ihr Taxi - 24/7 verfügbar!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:076 611 31 31" 
              className="flex items-center space-x-2 bg-white text-yellow-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg"
            >
              <span>📞</span>
              <span>076 611 31 31</span>
            </a>
            <Link 
              to="/#buchen" 
              className="flex items-center space-x-2 bg-yellow-800 hover:bg-yellow-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Car className="w-6 h-6" />
              <span>Online Buchen</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;