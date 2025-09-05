export const paymentMethods = [
  {
    id: 1,
    name: "Bargeld",
    description: "Klassische Barzahlung",
    icon: "banknote",
    available: true,
    logoUrl: null
  },
  {
    id: 2,
    name: "Visa",
    description: "Visa Kreditkarte",
    icon: "credit-card",
    available: true,
    logoUrl: "https://images.unsplash.com/photo-1609429019995-8c40f49535a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjcmVkaXQlMjBjYXJkfGVufDB8fHx8MTc1NzA1Nzc1MXww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    name: "Mastercard",
    description: "Mastercard Kreditkarte",
    icon: "credit-card",
    available: true,
    logoUrl: "https://images.pexels.com/photos/210742/pexels-photo-210742.jpeg"
  },
  {
    id: 4,
    name: "SumUp",
    description: "Mobile Kartenzahlung",
    icon: "smartphone",
    available: true,
    logoUrl: "https://images.unsplash.com/photo-1726137065519-c9a1b9eca951?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxwYXltZW50JTIwbWV0aG9kc3xlbnwwfHx8fDE3NTcwNTc3NjF8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 5,
    name: "TWINT",
    description: "Mobile Payment App",
    icon: "smartphone",
    available: true,
    logoUrl: "https://customer-assets.emergentagent.com/job_webseite-bauer/artifacts/wziyes8t_Screenshot_20250905_093910_Google.jpg"
  },
  {
    id: 6,
    name: "PayPal",
    description: "Online-Bezahlung",
    icon: "wallet",
    available: true,
    logoUrl: "https://images.unsplash.com/photo-1648091854674-59abf26bbf39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxQYXlQYWx8ZW58MHx8fHwxNzU3MDU3NzI4fDA&ixlib=rb-4.1.0&q=85"
  }
];

export const pricingStructure = {
  basicRate: {
    price: "CHF 6.60",
    description: "Grundtarif pro Fahrt"
  },
  perKilometer: {
    price: "CHF 4.20",
    description: "Pro Kilometer"
  },
  waitingTime: {
    price: "CHF 73.00",
    description: "Wartezeit pro Stunde"
  }
};

export const pricingExamples = [
  {
    route: "Luzern Bahnhof → Flughafen Zürich",
    distance: "47 km",
    estimatedPrice: "CHF 203.00",
    description: "Grundtarif + 47km × CHF 4.20"
  },
  {
    route: "Zug Zentrum → Bahnhof Zug",
    distance: "3 km",
    estimatedPrice: "CHF 19.20",
    description: "Grundtarif + 3km × CHF 4.20"
  },
  {
    route: "Schwyz → Brunnen",
    distance: "8 km",
    estimatedPrice: "CHF 40.20",
    description: "Grundtarif + 8km × CHF 4.20"
  },
  {
    route: "Stadtfahrt Luzern (mit 10 Min. Wartezeit)",
    distance: "5 km",
    estimatedPrice: "CHF 39.43",
    description: "Grundtarif + 5km × CHF 4.20 + 10 Min. Wartezeit"
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