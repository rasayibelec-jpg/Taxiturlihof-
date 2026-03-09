import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { Phone, MapPin, CheckCircle, MessageCircle } from 'lucide-react';

const TaxiGersauPage = () => {
  return (
    <>
      <Helmet>
        <title>Taxi Gersau – 24h Taxi-Service am Vierwaldstättersee | Taxi Türlihof</title>
        <meta
          name="description"
          content="Taxi Gersau – Ihr zuverlässiger 24h Taxi-Service am Vierwaldstättersee. Flughafentransfer Zürich/Basel, lokale Fahrten, Ausflüge und Bahnhof-Transfers mit Taxi Türlihof. Jetzt buchen: 076 611 31 31."
        />
        <meta
          name="keywords"
          content="Taxi Gersau, Taxi-Service Gersau, 24h Taxi Gersau, Flughafentransfer Gersau Zürich, Taxi Vierwaldstättersee, Taxi Brunnen Gersau, Taxi Arth-Goldau Anschluss"
        />
        <link rel="canonical" href="https://www.taxiturlihof.ch/taxi-gersau" />
      </Helmet>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Taxi Gersau – Zuverlässig & Schnell</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">Ihr Taxi-Service in Gersau am Vierwaldstättersee</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41766113131" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <Phone className="w-5 h-5 mr-2" />076 611 31 31</a>
              <a href="https://wa.me/41766113131" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <MessageCircle className="w-5 h-5 mr-2" />WhatsApp</a>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Abschnitt: Taxi & Flughafentransfer in Gersau */}
            <div className="bg-gray-900 rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">Taxi & Flughafentransfer in Gersau</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Als lokaler Taxi-Service in Gersau am Vierwaldstättersee bietet Taxi Türlihof Ihnen einen zuverlässigen 24-Stunden-Dienst.
                Ob Sie frühmorgens zum Flughafen Zürich oder Basel müssen, abends sicher nach Hause gefahren werden möchten oder einen
                geplanten Termin in der Region haben – wir bringen Sie komfortabel und pünktlich ans Ziel.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Unsere modernen Mercedes-Fahrzeuge sind ideal für Einzelpersonen, Paare und kleine Gruppen. Dank langjähriger Erfahrung
                kennen wir die Strecken rund um Gersau, Brunnen, Vitznau und Arth-Goldau sehr gut und wählen für Sie stets die passende Route.
                So vermeiden Sie unnötige Wartezeiten und Umwege.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Besonders geschätzt wird unser Flughafentransfer: Wir holen Sie direkt vor Ihrer Haustür in Gersau ab und bringen Sie ohne Stress
                und Umsteigen zum Flughafen. Auf Wunsch überwachen wir Ihre Flugzeiten, damit wir bei Verspätungen flexibel reagieren können.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Transparente Fixpreise</h3>
                    <p className="text-gray-400 text-sm">
                      Klare Preisstruktur ohne versteckte Kosten – auf Wunsch Pauschalpreise für Flughafentransfers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Lokal in Gersau</h3>
                    <p className="text-gray-400 text-sm">
                      Start direkt in Gersau – ideale Verbindung zu Brunnen, Vitznau, Weggis und Arth-Goldau.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">24/7 erreichbar</h3>
                    <p className="text-gray-400 text-sm">
                      Auch spätabends, an Wochenenden und Feiertagen für Sie da – ein Anruf genügt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abschnitt: Fahrten in Gersau & Umgebung */}
            <div className="bg-gray-900 rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">Fahrten in Gersau & Umgebung</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Gersau ist idyllisch gelegen – gleichzeitig sind viele Ziele nur mit Umsteigen oder längeren ÖV-Verbindungen erreichbar.
                Mit Taxi Türlihof kommen Sie ohne Umwege dorthin, wo Sie hin müssen: zum Bahnhof Arth-Goldau, nach Brunnen, nach Schwyz
                oder zu Hotels und Ferienwohnungen am Vierwaldstättersee.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Wir unterstützen Sie bei alltäglichen Fahrten ebenso wie bei speziellen Anlässen: Arzttermine, Geschäftsmeetings, Ausflüge,
                Abendessen im Restaurant oder Rückfahrten nach Veranstaltungen. Auf Wunsch warten wir vor Ort auf Sie und bringen Sie
                im Anschluss wieder sicher nach Hause.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Besonders für Gäste und Touristen in Gersau ist unser Service ideal: Wir holen Sie direkt an der Unterkunft ab, beraten Sie
                zu attraktiven Ausflugszielen in der Region und bringen Sie zuverlässig zu Schiffanlegestellen, Bergbahnen oder Sehenswürdigkeiten.
              </p>
            </div>

            {/* Abschnitt: Vorteile von Taxi Türlihof in Gersau */}
            <div className="bg-gray-900 rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">Vorteile von Taxi Türlihof in Gersau</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Mit Taxi Türlihof entscheiden Sie sich für einen persönlichen, verlässlichen Partner in der Zentralschweiz. Als Inhaber-geführtes
                Unternehmen legen wir grossen Wert auf Pünktlichkeit, Diskretion und einen respektvollen Umgang mit unseren Fahrgästen.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Unsere Mercedes-Flotte wird regelmässig gewartet und gepflegt, damit Sie jederzeit bequem und sicher unterwegs sind.
                Für Geschäftsreisende bieten wir eine ruhige Atmosphäre zum Arbeiten unterwegs, für Familien genügend Platz und
                Flexibilität bei Gepäck und Kinderwagen.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Ob kurze Strecke innerhalb von Gersau oder längere Fahrt nach Luzern, Zug oder Zürich – wir planen Ihre Route effizient und
                berücksichtigen Verkehrslage und individuelle Wünsche. So kommen Sie entspannt und rechtzeitig an.
              </p>
            </div>

            {/* Abschnitt: Buchungsmöglichkeiten */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Taxi in Gersau buchen</h2>
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                Sie können Ihr Taxi in Gersau ganz einfach per Telefon oder WhatsApp buchen. Für geplante Fahrten – zum Beispiel Flughafentransfer,
                Arzttermin oder Geschäftsreise – empfehlen wir eine frühzeitige Reservation. So können wir Ihre Fahrt optimal vorbereiten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+41766113131"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />076 611 31 31
                </a>
                <a
                  href="https://wa.me/41766113131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default TaxiGersauPage;