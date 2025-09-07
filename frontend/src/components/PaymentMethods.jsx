import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Banknote, CreditCard, Smartphone, Wallet, CheckCircle } from "lucide-react";
import { paymentMethods } from "../data/mockData";

const iconMap = {
  banknote: Banknote,
  "credit-card": CreditCard,
  smartphone: Smartphone,
  wallet: Wallet,
};

const PaymentMethods = () => {
  return (
    <section id="payment" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Zahlungsmethoden
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir akzeptieren verschiedene Zahlungsmethoden für Ihren Komfort. 
            Bezahlen Sie bequem und sicher mit Ihrer bevorzugten Option.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {paymentMethods.map((method) => {
            const IconComponent = iconMap[method.icon];
            return (
              <Card key={method.id} className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-gray-200 overflow-hidden">
                <CardHeader className="text-center pb-4">
                  {method.logoUrl ? (
                    <div className="mx-auto mb-4 w-20 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm overflow-hidden">
                      <img 
                        src={method.logoUrl} 
                        alt={`${method.name} Logo`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `<div class="bg-yellow-100 p-4 rounded-full"><${IconComponent.name} class="w-8 h-8 text-yellow-600" /></div>`;
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-yellow-600" />
                    </div>
                  )}
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300 flex items-center justify-center">
                    {method.name}
                    {method.available && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {method.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bequem und sicher bezahlen
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Alle Zahlungen werden sicher abgewickelt. Unsere Fahrer führen mobile 
              Kartenlesegeräte mit und akzeptieren sowohl kontaktlose als auch 
              PIN-Zahlungen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">Kontaktlos</Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">PIN-Eingabe</Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">Mobile Zahlung</Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">Quittung verfügbar</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;