import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, ArrowLeft, Car, Phone } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const BlogPost = () => {
  const { id } = useParams();
  
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
      tags: ["Mercedes", "Qualität", "Sicherheit", "Komfort"]
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog-Artikel nicht gefunden</h1>
            <p className="text-gray-600 mb-6">Der gewünschte Artikel existiert nicht oder wurde entfernt.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Blog
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Function to render markdown-like content
  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
      } else if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
      } else if (paragraph.startsWith('- ')) {
        return <li key={index} className="text-gray-700 leading-relaxed ml-4">{paragraph.replace('- ', '')}</li>;
      } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-900 mt-4 mb-2">{paragraph.replace(/\*\*/g, '')}</p>;
      } else if (paragraph.trim() === '') {
        return <div key={index} className="h-4"></div>;
      } else {
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Article Header */}
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-yellow-200 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-yellow-100 text-yellow-800">{post.category}</Badge>
            <div className="flex items-center text-yellow-200">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString('de-CH')}
            </div>
            <div className="flex items-center text-yellow-200">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl opacity-90">{post.excerpt}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
              <span className="text-gray-600 font-medium mr-2">Tags:</span>
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
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
              <Phone className="w-6 h-6" />
              <span>076 611 31 31</span>
            </a>
            <Link 
              to="/buchen" 
              className="flex items-center space-x-2 bg-yellow-800 hover:bg-yellow-900 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-bold text-lg"
            >
              <Car className="w-6 h-6" />
              <span>Online Buchen</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;