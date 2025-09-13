<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <div class="logo-brand" style="display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.jpg" alt="Taxi Türlihof Logo" style="height: 80px; margin-right: 1rem;">
                    <div style="text-align: left;">
                        <h1 class="site-title">Taxi Türlihof</h1>
                        <p style="color: #d1d5db; font-size: 1.1rem;">seit 2010</p>
                    </div>
                </div>
                
                <h2>Ihr zuverlässiger Taxi-Service in der Zentralschweiz</h2>
                <p>Schnell, sicher und professionell – 24/7 für Sie da</p>

                <div class="cta-buttons">
                    <a href="<?php echo home_url('/preisrechner'); ?>" class="btn btn-primary">
                        🧮 Preis berechnen
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn btn-outline">
                        🚗 Jetzt buchen
                    </a>
                </div>

                <a href="tel:076 611 31 31" class="phone-cta">
                    <div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">24/7 Service:</div>
                        <div style="font-size: 1.5rem; font-weight: bold;">076 611 31 31</div>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
        <div class="container">
            <div class="text-center">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Unsere Hauptleistungen
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 600px; margin: 0 auto;">
                    Professioneller Taxi-Service für alle Ihre Transportbedürfnisse
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon" style="background: #fef3c7;">
                        🗺️
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Lokale Fahrten</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Stadtfahrten in Luzern, Schwyz, Zug</p>
                    <div style="background: #fef3c7; padding: 0.5rem 1rem; border-radius: 8px;">
                        <span style="font-weight: 600; color: #f59e0b;">Ab CHF 6.60 Grundtaxe</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="service-icon" style="background: #dbeafe;">
                        ✈️
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Flughafentransfer</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Zürich & Basel Airport</p>
                    <div style="background: #dbeafe; padding: 0.5rem 1rem; border-radius: 8px;">
                        <span style="font-weight: 600; color: #2563eb;">Preis auf Anfrage</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="service-icon" style="background: #d1fae5;">
                        💼
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Geschäftsfahrten</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Termine, Meetings, Events</p>
                    <div style="background: #d1fae5; padding: 0.5rem 1rem; border-radius: 8px;">
                        <span style="font-weight: 600; color: #059669;">Zuverlässig & diskret</span>
                    </div>
                </div>
            </div>

            <!-- Detailed Pricing -->
            <div style="text-align: center; margin-top: 3rem;">
                <button id="show-details" class="btn" style="background: #f3f4f6; color: #374151; border: 1px solid #d1d5db;">
                    ⬇️ Mehr erfahren
                </button>
            </div>

            <div id="pricing-details" class="pricing-section hidden">
                <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; text-align: center;">
                    💰 Transparente Preise
                </h3>

                <div class="pricing-grid">
                    <div>
                        <h4 style="font-weight: 600; margin-bottom: 1rem;">Grundpreise (alle Fahrzeuge)</h4>
                        <div class="pricing-item">
                            <span>Grundtaxe</span>
                            <span class="price yellow">CHF 6.60</span>
                        </div>
                        <div class="pricing-item">
                            <span>Wartezeit</span>
                            <span class="price orange">CHF 73.00</span>
                        </div>
                    </div>

                    <div>
                        <h4 style="font-weight: 600; margin-bottom: 1rem;">Pro Kilometer</h4>
                        <div class="pricing-item">
                            <span>Standard (C/E-Klasse)</span>
                            <span class="price blue">CHF 4.20</span>
                        </div>
                        <div class="pricing-item">
                            <span>Premium/Van (S/V-Klasse)</span>
                            <span class="price green">CHF 5.00</span>
                        </div>
                    </div>
                </div>

                <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
                    <h5 style="font-weight: 600; margin-bottom: 0.5rem;">💡 Wichtige Hinweise:</h5>
                    <ul style="font-size: 0.875rem; color: #6b7280; line-height: 1.6;">
                        <li>• Alle Preise inkl. MwSt.</li>
                        <li>• Keine Zuschläge für Nachts, Wochenende oder Feiertage</li>
                        <li>• Wartezeit: CHF 73.00 pro Stunde</li>
                        <li>• Exakte Preise über Preisrechner oder telefonisch</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Fleet Gallery -->
    <section class="fleet-gallery">
        <div class="container">
            <div class="text-center">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Unsere Mercedes-Flotte
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 3rem;">
                    Moderne, gepflegte und komfortable Fahrzeuge für alle Ihre Bedürfnisse
                </p>
            </div>

            <div class="gallery-container">
                <div id="fleet-gallery">
                    <!-- Images will be loaded by JavaScript -->
                </div>
                <button class="gallery-nav prev" onclick="previousImage()">‹</button>
                <button class="gallery-nav next" onclick="nextImage()">›</button>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 600px; margin: 0 auto;">
                    <div>
                        <h4 style="font-weight: 600;">Standard</h4>
                        <p style="color: #6b7280; font-size: 0.875rem;">Mercedes C/E-Klasse<br>1-4 Personen</p>
                    </div>
                    <div>
                        <h4 style="font-weight: 600;">Premium</h4>
                        <p style="color: #6b7280; font-size: 0.875rem;">Mercedes S-Klasse<br>1-4 Personen</p>
                    </div>
                    <div>
                        <h4 style="font-weight: 600;">Van</h4>
                        <p style="color: #6b7280; font-size: 0.875rem;">Mercedes V-Klasse<br>bis 8 Personen</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Calculator CTA -->
    <section class="calculator-section">
        <div class="container">
            <div class="text-center">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Berechnen Sie Ihren Fahrpreis und buchen Sie online
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 3rem;">
                    Transparente Preise, einfache Buchung – alles in wenigen Klicks
                </p>
            </div>

            <div class="calculator-grid">
                <div class="calculator-card">
                    <div style="text-align: center;">
                        <div style="background: #fef3c7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                            🧮
                        </div>
                        
                        <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Preis berechnen</h3>
                        
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Geben Sie Start und Ziel ein und erhalten Sie sofort eine präzise Kostenübersicht für Ihre Fahrt.
                        </p>

                        <a href="<?php echo home_url('/preisrechner'); ?>" class="btn btn-primary" style="width: 100%; justify-content: center;">
                            🧮 Zum Preisrechner →
                        </a>
                    </div>
                </div>

                <div class="calculator-card">
                    <div style="text-align: center;">
                        <div style="background: #dbeafe; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                            📅
                        </div>
                        
                        <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Online buchen</h3>
                        
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Buchen Sie Ihre Fahrt bequem online. Wählen Sie Datum, Uhrzeit und alle Details für Ihren Transport.
                        </p>

                        <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #2563eb; color: #fff; width: 100%; justify-content: center;">
                            📅 Jetzt buchen →
                        </a>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 3rem;">
                <a href="tel:076 611 31 31" style="display: inline-flex; align-items: center; background: #10b981; color: #fff; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: bold;">
                    <div style="margin-right: 1rem; font-size: 1.25rem;">📞</div>
                    <div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Oder rufen Sie uns an:</div>
                        <div style="font-size: 1.25rem; font-weight: bold;">076 611 31 31</div>
                    </div>
                </a>
                <p style="color: #6b7280; margin-top: 0.5rem; font-size: 0.875rem;">24 Stunden am Tag, 7 Tage die Woche</p>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <div class="text-center">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Kontakt & Service
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 3rem;">
                    24/7 für Sie erreichbar – rufen Sie uns an oder schreiben Sie uns
                </p>
            </div>

            <div class="contact-grid">
                <div class="contact-card phone">
                    <div style="background: #10b981; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">
                        📞
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">Anrufen</h3>
                    <a href="tel:076 611 31 31" style="font-size: 2rem; font-weight: bold; color: #10b981; text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        076 611 31 31
                    </a>
                    <p style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">24/7 Service</p>
                </div>

                <div class="contact-card email">
                    <div style="background: #2563eb; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">
                        ✉️
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">E-Mail</h3>
                    <a href="mailto:info@taxiturlihof.ch" style="font-size: 1.1rem; font-weight: 600; color: #2563eb; text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        info@taxiturlihof.ch
                    </a>
                    <p style="font-size: 0.875rem; color: #6b7280;">Antwort in 24h</p>
                </div>

                <div class="contact-card whatsapp">
                    <div style="background: #f59e0b; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">
                        💬
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">WhatsApp</h3>
                    <a href="https://wa.me/41766113131" target="_blank" style="font-size: 1.1rem; font-weight: 600; color: #f59e0b; text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        076 611 31 31
                    </a>
                    <p style="font-size: 0.875rem; color: #6b7280;">Schnelle Antwort</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; margin-bottom: 0.5rem;">
                    📍 Service-Region: Luzern • Schwyz • Zug
                </p>
                <p style="font-size: 0.875rem; color: #9ca3af;">
                    Taxi Türlihof – Ihr zuverlässiger Partner seit 2010
                </p>
            </div>
        </div>
    </section>
</main>

<script>
// Fleet Gallery JavaScript
const fleetImages = [
    {
        url: '<?php echo get_template_directory_uri(); ?>/assets/images/fleet1.jpg',
        title: 'Mercedes V-Klasse Van',
        description: 'Geräumig für Familien und Gruppen bis 8 Personen'
    },
    {
        url: '<?php echo get_template_directory_uri(); ?>/assets/images/fleet2.jpg',
        title: 'Mercedes V-Klasse Premium',
        description: 'Höchster Komfort für Gruppenfahrten und Flughafentransfers'
    },
    {
        url: '<?php echo get_template_directory_uri(); ?>/assets/images/fleet3.jpg',
        title: 'Mercedes Taxi bei Nacht',
        description: '24/7 Service - auch nachts zuverlässig unterwegs'
    }
];

let currentImageIndex = 0;

function loadGalleryImage() {
    const gallery = document.getElementById('fleet-gallery');
    const image = fleetImages[currentImageIndex];
    
    gallery.innerHTML = `
        <img src="${image.url}" alt="${image.title}" class="gallery-image">
        <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 1rem; border-radius: 8px;">
            <h4 style="font-weight: bold; margin-bottom: 0.25rem;">${image.title}</h4>
            <p style="font-size: 0.875rem; opacity: 0.9;">${image.description}</p>
        </div>
    `;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % fleetImages.length;
    loadGalleryImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + fleetImages.length) % fleetImages.length;
    loadGalleryImage();
}

// Show/Hide Details
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryImage();
    
    const showDetailsBtn = document.getElementById('show-details');
    const pricingDetails = document.getElementById('pricing-details');
    
    showDetailsBtn.addEventListener('click', function() {
        if (pricingDetails.classList.contains('hidden')) {
            pricingDetails.classList.remove('hidden');
            showDetailsBtn.innerHTML = '⬆️ Weniger anzeigen';
        } else {
            pricingDetails.classList.add('hidden');
            showDetailsBtn.innerHTML = '⬇️ Mehr erfahren';
        }
    });
});
</script>

<?php get_footer(); ?>