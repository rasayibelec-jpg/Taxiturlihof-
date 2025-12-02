/**
 * Structured Data (Schema.org) für Taxi Türlihof
 * Optimiert für lokale SEO und Local Search
 */

// Hauptgeschäft - LocalBusiness Schema
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": "https://www.taxiturlihof.ch/#business",
  "name": "Taxi Türlihof",
  "legalName": "Taxi Türlihof",
  "description": "Zuverlässiger Taxi-Service in der Zentralschweiz. Mercedes-Flotte, Flughafentransfer, Stadtfahrten, Geschäftsfahrten. Zuverlässig Service in Luzern, Schwyz, Zug und Umgebung.",
  "url": "https://www.taxiturlihof.ch/",
  "logo": "https://www.taxiturlihof.ch/icons/icon-512x512.png",
  "image": "https://www.taxiturlihof.ch/icons/icon-512x512.png",
  "telephone": "+41766113131",
  "email": "rasayibelec@gmail.com",
  "priceRange": "CHF",
  
  // Adresse
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Türlihof 4",
    "addressLocality": "Oberarth",
    "postalCode": "6414",
    "addressRegion": "Schwyz",
    "addressCountry": "CH"
  },
  
  // Geo-Koordinaten (Oberarth)
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "47.0448",
    "longitude": "8.6266"
  },
  
  // Service-Gebiete
  "areaServed": [
    {
      "@type": "City",
      "name": "Luzern",
      "addressRegion": "Luzern",
      "addressCountry": "CH"
    },
    {
      "@type": "City",
      "name": "Zug",
      "addressRegion": "Zug",
      "addressCountry": "CH"
    },
    {
      "@type": "City",
      "name": "Schwyz",
      "addressRegion": "Schwyz",
      "addressCountry": "CH"
    },
    {
      "@type": "City",
      "name": "Oberarth",
      "addressRegion": "Schwyz",
      "addressCountry": "CH"
    },
    {
      "@type": "City",
      "name": "Arth-Goldau",
      "addressRegion": "Schwyz",
      "addressCountry": "CH"
    },
    {
      "@type": "City",
      "name": "Weggis",
      "addressRegion": "Luzern",
      "addressCountry": "CH"
    },
    {
      "@type": "City",
      "name": "Vitznau",
      "addressRegion": "Luzern",
      "addressCountry": "CH"
    }
  ],
  
  // Öffnungszeiten - Zuverlässiger Service (Zuverlässig erreichbar)
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  
  // Angebotene Services
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Taxi Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Flughafentransfer",
          "description": "Zuverlässiger Transfer zu Flughäfen Zürich, Basel, Mailand"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Stadtfahrten",
          "description": "Taxi-Service in Luzern, Zug, Schwyz und Umgebung"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Geschäftstaxi",
          "description": "Professionelle Business-Fahrten mit Mercedes-Flotte"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Preisrechner",
          "description": "Online Preisberechnung für Ihre Taxi-Fahrt"
        }
      }
    ]
  },
  
  // Kontaktpunkte
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+41766113131",
      "contactType": "customer service",
      "areaServed": "CH",
      "availableLanguage": ["German", "English"]
    }
  ],
  
  // Same As (Social Media - wenn vorhanden)
  "sameAs": [
    "https://www.taxiturlihof.ch/"
  ],
  
  // Aggregate Rating (Durchschnittsbewertung)
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "39",
    "reviewCount": "39"
  }
});

// Website Schema
export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.taxiturlihof.ch/#website",
  "url": "https://www.taxiturlihof.ch/",
  "name": "Taxi Türlihof",
  "description": "Zuverlässiger Taxi-Service in Luzern, Schwyz, Zug - Mercedes-Flotte, Online-Buchung",
  "publisher": {
    "@id": "https://www.taxiturlihof.ch/#business"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.taxiturlihof.ch/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

// Breadcrumb Schema Generator
export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Service-spezifische Schemas
export const getServiceSchema = (serviceName, serviceDescription, serviceUrl) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@id": "https://www.taxiturlihof.ch/#business"
  },
  "description": serviceDescription,
  "url": serviceUrl,
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  }
});

// FAQ Schema Generator
export const getFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Kombiniertes Schema für die Hauptseite
export const getHomePageSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    getLocalBusinessSchema(),
    getWebsiteSchema(),
    getBreadcrumbSchema([
      { name: "Home", url: "https://www.taxiturlihof.ch/" }
    ]),
    // Individuelle Reviews
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sema Celebi"
      },
      "datePublished": "2024-04-17",
      "reviewBody": "Vielen Dank für die ausgezeichnete Fahrt mit TaxiTürlihof! Ihr professioneller Fahrstil und die freundliche, zuvorkommende Art haben die Fahrt wirklich angenehm gemacht. Es ist klar, dass Sie nicht nur ein guter Fahrer sind, sondern auch ein echter Botschafter für Ihr Unternehmen.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@id": "https://www.taxiturlihof.ch/#business"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "M K"
      },
      "datePublished": "2024-01-17",
      "reviewBody": "Absolut zuverlässig. Sehr sauber und pünktlich. Kann ich nur weiterempfehlen!",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@id": "https://www.taxiturlihof.ch/#business"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Hasan Hatipoglu"
      },
      "datePublished": "2024-08-17",
      "reviewBody": "Sehr freundlich, nochmals vielen Dank! Perfekter Service und immer pünktlich.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@id": "https://www.taxiturlihof.ch/#business"
      }
    }
  ]
});
