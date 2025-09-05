export const paymentMethods = [
  {
    id: 1,
    name: "Bargeld",
    description: "Klassische Barzahlung",
    icon: "banknote",
    available: true
  },
  {
    id: 2,
    name: "Kreditkarten",
    description: "Visa, Mastercard, American Express",
    icon: "credit-card",
    available: true
  },
  {
    id: 3,
    name: "Girocard",
    description: "EC-Karte / Debitkarte",
    icon: "credit-card",
    available: true
  },
  {
    id: 4,
    name: "SumUp",
    description: "Mobile Kartenzahlung",
    icon: "smartphone",
    available: true
  },
  {
    id: 5,
    name: "TWINT",
    description: "Mobile Payment App",
    icon: "smartphone",
    available: true
  },
  {
    id: 6,
    name: "PayPal",
    description: "Online-Bezahlung",
    icon: "wallet",
    available: true
  }
];

export const services = [
  {
    id: 1,
    title: "Flughafentransfer",
    description: "Zuverlässiger Transport zum und vom Flughafen Zürich und Basel",
    icon: "plane",
    price: "Ab CHF 200",
    features: ["Pünktlich", "Komfortabel", "Direktfahrt"],
    priceDetails: {
      zurich: {
        luzern: "Ab CHF 200",
        schwyz: "Ab CHF 250", 
        zug: "Ab CHF 200"
      },
      basel: {
        luzern: "Ab CHF 300",
        schwyz: "Ab CHF 300",
        zug: "Ab CHF 300"
      }
    }
  },
  {
    id: 2,
    title: "Stadtfahrten",
    description: "Schnelle Fahrten innerhalb der Stadt und Umgebung",
    icon: "car",
    price: "Ab CHF 30",
    features: ["24/7 verfügbar", "Kurze Wartezeiten", "Lokale Kenntnisse"]
  },
  {
    id: 3,
    title: "Geschäftsfahrten",
    description: "Professioneller Service für Geschäftskunden",
    icon: "briefcase",
    price: "Nach Vereinbarung",
    features: ["Rechnungsstellung", "Regelmässige Termine", "Diskretion"]
  },
  {
    id: 4,
    title: "Krankenfahrten",
    description: "Medizinische Transporte mit besonderer Sorgfalt",
    icon: "heart-pulse",
    price: "Krankenkasse abrechenbar",
    features: ["Rollstuhlgerecht", "Geschultes Personal", "Termingenau"]
  },
  {
    id: 5,
    title: "Eventfahrten",
    description: "Transport zu besonderen Anlässen und Veranstaltungen",
    icon: "calendar",
    price: "Nach Vereinbarung",
    features: ["Gruppenrabatte", "Warteservice", "Flexible Zeiten"]
  },
  {
    id: 6,
    title: "Kurierfahrten",
    description: "Schneller Transport von Dokumenten und Paketen",
    icon: "package",
    price: "Ab CHF 25",
    features: ["Express-Service", "Sicherer Transport", "Quittung"]
  }
];

export const coverageAreas = [
  {
    id: 1,
    city: "Luzern",
    description: "Komplette Abdeckung der Stadt Luzern und aller Stadtteile",
    zones: ["Altstadt", "Neustadt", "Littau", "Reussbühl", "Emmen"]
  },
  {
    id: 2,
    city: "Schwyz",
    description: "Umfassender Service im ganzen Kanton Schwyz",
    zones: ["Schwyz Stadt", "Brunnen", "Einsiedeln", "Küssnacht", "Arth"]
  },
  {
    id: 3,
    city: "Zug",
    description: "Vollständige Abdeckung von Zug und Umgebung",
    zones: ["Zug Stadt", "Baar", "Cham", "Steinhausen", "Hünenberg"]
  }
];

export const contactInfo = {
  phone: "076 611 31 31",
  email: "info@taxitürlihof.ch",
  website: "www.taxitürlihof.ch",
  address: "Musterstrasse 123, 6003 Luzern",
  hours: "24/7 Service"
};

export const testimonials = [
  {
    id: 1,
    name: "Maria Schmidt",
    location: "Luzern",
    rating: 5,
    comment: "Sehr zuverlässig und pünktlich. Der Fahrer war sehr freundlich und professionell."
  },
  {
    id: 2,
    name: "Thomas Müller",
    location: "Schwyz",
    comment: "Excellent service for airport transfers. Always on time and clean vehicles."
  },
  {
    id: 3,
    name: "Anna Weber",
    location: "Zug",
    comment: "Nutze den Service regelmässig für Geschäftstermine. Immer zufrieden!"
  }
];