import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHead = ({ 
  title = "Taxi Türlihof | Zuverlässiger Taxi-Service in Luzern, Schwyz, Zug",
  description = "Taxi Türlihof - Ihr zuverlässiger Taxi-Service in der Zentralschweiz. Mercedes-Flotte, Flughafentransfer Zürich/Basel, Stadtfahrten Luzern, Schwyz, Zug. Online buchen ☎️ 076 611 31 31",
  keywords = "Taxi Luzern, Taxi Schwyz, Taxi Zug, Flughafentransfer Zürich ab Luzern, Mercedes Taxi buchen, zuverlässiger Taxi Zentralschweiz, Taxi Weggis Vitznau, Geschäftstaxi Schwyz, Kurierfahrten, Taxi online buchen",
  image = "https://customer-assets.emergentagent.com/job_taxi-booking-hub-2/artifacts/7qpvp7gy_20240707_163617.jpg",
  url = "https://www.taxiturlihof.ch/",
  type = "website",
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor = "Taxi Türlihof",
  structuredData
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="de_CH" />
      <meta property="og:site_name" content="Taxi Türlihof" />
      
      {/* Article specific meta tags */}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Taxi Türlihof" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="de" />
      <meta name="geo.region" content="CH-LU" />
      <meta name="geo.placename" content="Luzern, Schwyz, Zug" />
      <meta name="geo.position" content="47.0502;8.3093" />
      <meta name="ICBM" content="47.0502, 8.3093" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hreflang="de-ch" href={url} />
      <link rel="alternate" hreflang="de" href={url} />
      <link rel="alternate" hreflang="x-default" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;