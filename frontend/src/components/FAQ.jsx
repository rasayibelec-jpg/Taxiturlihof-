import React, { useState } from "react";
import { Card } from "./ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      question: "Wie zuverlässig ist Taxi Türlihof?",
      answer: "Ja, Taxi Türlihof ist rund um die Uhr verfügbar. Sie können uns jederzeit unter 076 611 31 31 erreichen oder online buchen."
    },
    {
      question: "Welche Gebiete bedient Taxi Türlihof?",
      answer: "Wir bedienen Luzern, Schwyz, Zug, Weggis, Vitznau, Brunnen, Arth-Goldau und die gesamte Zentralschweiz. Flughafentransfers nach Zürich und Basel sind ebenfalls möglich."
    },
    {
      question: "Kann ich online ein Taxi buchen?",
      answer: "Ja, Sie können ganz einfach online über unsere Website ein Taxi buchen oder uns direkt unter 076 611 31 31 anrufen."
    },
    {
      question: "Welche Fahrzeuge nutzt Taxi Türlihof?",
      answer: "Wir verfügen über eine moderne Mercedes-Flotte mit Standard-Taxis, Premium-Fahrzeugen und Vans für größere Gruppen."
    },
    {
      question: "Wie teuer ist ein Flughafentransfer zum Flughafen Zürich?",
      answer: "Ein Flughafentransfer von Luzern zum Flughafen Zürich kostet ab CHF 200. Der Preis variiert je nach Abfahrtsort und Fahrzeugtyp."
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: "Wir akzeptieren Bargeld, alle gängigen Kreditkarten, TWINT und PayPal. Die Zahlung ist sowohl im Fahrzeug als auch online möglich."
    },
    {
      question: "Fahren Sie auch bei schlechtem Wetter?",
      answer: "Ja, unsere erfahrenen Fahrer und die Mercedes-Flotte sind für alle Wetterbedingungen ausgerüstet. Sicherheit hat bei uns oberste Priorität."
    },
    {
      question: "Kann ich ein Taxi für mehrere Personen buchen?",
      answer: "Selbstverständlich! Wir haben Mercedes V-Klasse Vans für bis zu 8 Personen sowie Standard-Fahrzeuge für 1-4 Personen."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die wichtigsten Fragen zu unserem Taxi-Service
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <button
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-inset"
                onClick={() => toggleItem(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItem === index ? (
                      <ChevronUp className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                </div>
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Weitere Fragen?
            </h3>
            <p className="text-gray-600 mb-6">
              Haben Sie eine Frage, die hier nicht beantwortet wurde? 
              Zögern Sie nicht, uns zu kontaktieren!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:076 611 31 31" 
                className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
              >
                <span>📞</span>
                <span>076 611 31 31</span>
              </a>
              <a 
                href="mailto:info@taxiturlihof.ch" 
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
              >
                <span>✉️</span>
                <span>info@taxiturlihof.ch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;