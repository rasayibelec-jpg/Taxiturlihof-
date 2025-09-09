import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = {
    'taxi-luzern': 'Taxi Luzern',
    'taxi-schwyz': 'Taxi Schwyz', 
    'taxi-zug': 'Taxi Zug',
    'flughafentransfer': 'Flughafentransfer',
    'blog': 'Blog',
    'kontakt': 'Kontakt'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-gray-100 py-3 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors duration-200"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const displayName = breadcrumbNameMap[value] || value;

            return (
              <React.Fragment key={to}>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {last ? (
                  <span className="text-gray-900 font-medium">{displayName}</span>
                ) : (
                  <Link 
                    to={to}
                    className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                  >
                    {displayName}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.taxiturlihof.ch/"
              },
              ...pathnames.map((value, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": breadcrumbNameMap[value] || value,
                "item": `https://www.taxiturlihof.ch/${pathnames.slice(0, index + 1).join("/")}`
              }))
            ]
          })
        }}
      />
    </nav>
  );
};

export default Breadcrumb;