<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Taxi Türlihof - Ihr zuverlässiger 24/7 Taxi-Service in der Zentralschweiz. Mercedes-Flotte, Flughafentransfer Zürich/Basel, Stadtfahrten Luzern, Schwyz, Zug. Online buchen ☎️ 076 611 31 31">
    <meta name="keywords" content="Taxi Luzern 24h, Taxi Schwyz, Taxi Zug, Flughafentransfer Zürich ab Luzern, Mercedes Taxi buchen, Notfall Taxi Zentralschweiz, Taxi Weggis Vitznau, Geschäftstaxi Schwyz, Kurierfahrten, Taxi online buchen">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Taxi Türlihof | Zuverlässiger Taxi-Service in Luzern, Schwyz, Zug | 24/7 Service">
    <meta property="og:description" content="Taxi Türlihof - Ihr zuverlässiger 24/7 Taxi-Service in der Zentralschweiz. Mercedes-Flotte, Flughafentransfer Zürich/Basel, Online buchen ☎️ 076 611 31 31">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg">
    <meta property="og:url" content="<?php echo home_url(); ?>">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="de_CH">
    <meta property="og:site_name" content="Taxi Türlihof">
    
    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Taxi Türlihof | 24/7 Taxi-Service Zentralschweiz">
    <meta name="twitter:description" content="Mercedes-Flotte, Flughafentransfer, Online buchen ☎️ 076 611 31 31">
    <meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg">
    
    <!-- Local Business Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "<?php echo home_url(); ?>",
        "name": "Taxi Türlihof",
        "image": "<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg",
        "description": "Zuverlässiger 24/7 Taxi-Service in der Zentralschweiz mit Mercedes-Flotte",
        "url": "<?php echo home_url(); ?>",
        "telephone": "+41766113131",
        "email": "info@taxiturlihof.ch",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Luzern",
            "addressRegion": "LU",
            "addressCountry": "CH"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.0502,
            "longitude": 8.3093
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "CHF 6.60 - CHF 300",
        "areaServed": [
            {
                "@type": "City",
                "name": "Luzern",
                "addressCountry": "CH"
            },
            {
                "@type": "City",
                "name": "Schwyz",
                "addressCountry": "CH"
            },
            {
                "@type": "City",
                "name": "Zug",
                "addressCountry": "CH"
            },
            {
                "@type": "City",
                "name": "Weggis",
                "addressCountry": "CH"
            },
            {
                "@type": "City",
                "name": "Vitznau",
                "addressCountry": "CH"
            },
            {
                "@type": "City",
                "name": "Brunnen",
                "addressCountry": "CH"
            },
            {
                "@type": "City",
                "name": "Arth-Goldau",
                "addressCountry": "CH"
            }
        ],
        "serviceType": [
            "Taxi Service",
            "Airport Transfer",
            "Business Transportation",
            "Local Transportation"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "39"
        }
    }
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Bietet Taxi Türlihof 24/7 Service an?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, Taxi Türlihof ist rund um die Uhr verfügbar. Sie können uns jederzeit unter 076 611 31 31 erreichen oder online buchen."
                }
            },
            {
                "@type": "Question",
                "name": "Welche Gebiete bedient Taxi Türlihof?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wir bedienen Luzern, Schwyz, Zug, Weggis, Vitznau, Brunnen, Arth-Goldau und die gesamte Zentralschweiz. Flughafentransfers nach Zürich und Basel sind ebenfalls möglich."
                }
            },
            {
                "@type": "Question",
                "name": "Kann ich online ein Taxi buchen?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, Sie können ganz einfach online über unsere Website ein Taxi buchen oder uns direkt unter 076 611 31 31 anrufen."
                }
            },
            {
                "@type": "Question",
                "name": "Welche Fahrzeuge nutzt Taxi Türlihof?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wir verfügen über eine moderne Mercedes-Flotte mit Standard-Taxis, Premium-Fahrzeugen und Vans für größere Gruppen."
                }
            }
        ]
    }
    </script>
    
    <link rel="canonical" href="<?php echo home_url(add_query_arg(array($_GET), $wp->request)); ?>">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header class="site-header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="<?php echo home_url(); ?>">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg" alt="Taxi Türlihof Logo">
                        <h1>Taxi Türlihof</h1>
                    </a>
                </div>

                <nav class="main-nav">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'main-menu',
                        'container' => false,
                        'fallback_cb' => 'taxi_turlihof_fallback_menu'
                    ));
                    ?>
                </nav>

                <div class="header-phone">
                    <a href="tel:076 611 31 31" class="btn btn-success">
                        📞 076 611 31 31
                    </a>
                </div>
            </div>
        </div>
    </header>

<?php
// Fallback menu if no menu is assigned
function taxi_turlihof_fallback_menu() {
    echo '<ul>';
    echo '<li><a href="' . home_url() . '">Home</a></li>';
    echo '<li><a href="' . home_url('/preisrechner') . '">Preisrechner</a></li>';
    echo '<li><a href="' . home_url('/buchen') . '">Buchen</a></li>';
    echo '<li><a href="' . home_url('/taxi-luzern') . '">Taxi Luzern</a></li>';
    echo '<li><a href="' . home_url('/taxi-schwyz') . '">Taxi Schwyz</a></li>';
    echo '<li><a href="' . home_url('/taxi-zug') . '">Taxi Zug</a></li>';
    echo '<li><a href="' . home_url('/flughafentransfer') . '">Flughafentransfer</a></li>';
    echo '<li><a href="' . home_url('/flotte') . '">Flotte</a></li>;
    echo '<li><a href="' . home_url('/kontakt') . '">Kontakt</a></li>';
    echo '</ul>';
}
?>