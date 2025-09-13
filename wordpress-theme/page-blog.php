<?php get_header(); ?>

<main id="main" class="site-main">
    <section style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: #fff; padding: 120px 0 80px; text-align: center;">
        <div class="container">
            <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem; color: #fbbf24;">
                Taxi Türlihof Blog
            </h1>
            <p style="font-size: 1.25rem; color: #d1d5db; max-width: 600px; margin: 0 auto;">
                Aktuelle Neuigkeiten, Tipps und Informationen rund um Ihren Taxi-Service
            </p>
        </div>
    </section>

    <section style="padding: 80px 0; background: #f9fafb;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                
                <!-- Blog Post 1 -->
                <article style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fef3c7; padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚗</div>
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                            Neue Mercedes V-Klasse in unserer Flotte
                        </h2>
                        <p style="color: #6b7280; font-size: 0.875rem;">15. September 2024</p>
                    </div>
                    <div style="padding: 1.5rem;">
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Wir freuen uns, Ihnen unsere neueste Ergänzung vorstellen zu können: einen brandneuen Mercedes V-Klasse Van, der Platz für bis zu 8 Passagiere bietet und höchsten Komfort garantiert.
                        </p>
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Der neue Van ist besonders geeignet für:
                        </p>
                        <ul style="color: #6b7280; margin-bottom: 1.5rem; padding-left: 1.5rem;">
                            <li>Flughafentransfers für größere Gruppen</li>
                            <li>Familien mit viel Gepäck</li>
                            <li>Geschäfts- und Eventfahrten</li>
                            <li>Rollstuhlgerechte Transporte</li>
                        </ul>
                        <a href="<?php echo home_url('/flotte'); ?>" class="btn btn-primary">
                            Unsere Flotte ansehen →
                        </a>
                    </div>
                </article>

                <!-- Blog Post 2 -->
                <article style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dbeafe; padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✈️</div>
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                            Flughafentransfer Zürich: Neue Routen
                        </h2>
                        <p style="color: #6b7280; font-size: 0.875rem;">10. September 2024</p>
                    </div>
                    <div style="padding: 1.5rem;">
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Aufgrund der hohen Nachfrage haben wir unser Angebot für Flughafentransfers erweitert. Neben Zürich und Basel bedienen wir nun auch weitere Schweizer Flughäfen.
                        </p>
                        <p style="color: #6b7280; margin-bottom: 1.5rem; font-weight: 600;">
                            Neue Destinationen:
                        </p>
                        <ul style="color: #6b7280; margin-bottom: 1.5rem; padding-left: 1.5rem;">
                            <li>Flughafen Bern-Belp</li>
                            <li>Flughafen St. Gallen-Altenrhein</li>
                            <li>EuroAirport Basel-Mulhouse</li>
                        </ul>
                        <a href="<?php echo home_url('/flughafentransfer'); ?>" class="btn" style="background: #2563eb; color: #fff;">
                            Flughafentransfer buchen →
                        </a>
                    </div>
                </article>

                <!-- Blog Post 3 -->
                <article style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #d1fae5; padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                            Transparente Preise ohne Überraschungen
                        </h2>
                        <p style="color: #6b7280; font-size: 0.875rem;">5. September 2024</p>
                    </div>
                    <div style="padding: 1.5rem;">
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Bei Taxi Türlihof gibt es keine versteckten Kosten. Unsere Preisstruktur ist einfach und transparent - ohne Zuschläge für Nachts, Wochenende oder Feiertage.
                        </p>
                        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Unsere Preise:</h4>
                            <ul style="color: #6b7280; font-size: 0.875rem;">
                                <li>Grundtaxe: CHF 6.60</li>
                                <li>Standard: CHF 4.20/km</li>
                                <li>Premium/Van: CHF 5.00/km</li>
                                <li>Wartezeit: CHF 73.00/h</li>
                            </ul>
                        </div>
                        <a href="<?php echo home_url('/preisrechner'); ?>" class="btn btn-success">
                            Preis berechnen →
                        </a>
                    </div>
                </article>

                <!-- Blog Post 4 -->
                <article style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fce7f3; padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                            Online-Buchung jetzt noch einfacher
                        </h2>
                        <p style="color: #6b7280; font-size: 0.875rem;">1. September 2024</p>
                    </div>
                    <div style="padding: 1.5rem;">
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Unser neues Online-Buchungssystem macht die Reservierung Ihres Taxis noch einfacher. In nur wenigen Klicks können Sie Ihre Fahrt planen und buchen.
                        </p>
                        <p style="color: #6b7280; margin-bottom: 1.5rem; font-weight: 600;">
                            Neue Features:
                        </p>
                        <ul style="color: #6b7280; margin-bottom: 1.5rem; padding-left: 1.5rem;">
                            <li>Sofortige Preisberechnung</li>
                            <li>Fahrzeugauswahl</li>
                            <li>Terminbuchung möglich</li>
                            <li>E-Mail-Bestätigung</li>
                            <li>WhatsApp-Integration</li>
                        </ul>
                        <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #ec4899; color: #fff;">
                            Jetzt online buchen →
                        </a>
                    </div>
                </article>

                <!-- Blog Post 5 -->
                <article style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #e0e7ff; padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">⭐</div>
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                            15 Jahre Taxi Türlihof - Danke für Ihr Vertrauen!
                        </h2>
                        <p style="color: #6b7280; font-size: 0.875rem;">25. August 2024</p>
                    </div>
                    <div style="padding: 1.5rem;">
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Seit 2010 sind wir Ihr zuverlässiger Partner für Transportdienstleistungen in der Zentralschweiz. Ein herzliches Dankeschön an alle unsere treuen Kunden!
                        </p>
                        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Unsere Bilanz 2024:</h4>
                            <ul style="color: #6b7280; font-size: 0.875rem;">
                                <li>Über 10.000 zufriedene Fahrten</li>
                                <li>5.0 Sterne Bewertung</li>
                                <li>100% Mercedes-Flotte</li>
                                <li>24/7 Service das ganze Jahr</li>
                            </ul>
                        </div>
                        <p style="color: #6b7280; font-style: italic;">
                            "Ihr Vertrauen ist unser Antrieb für weitere 15 Jahre exzellenten Service!"
                        </p>
                    </div>
                </article>

                <!-- Blog Post 6 -->
                <article style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #f3e8ff; padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📞</div>
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                            Tipps für Ihre Taxibuchung
                        </h2>
                        <p style="color: #6b7280; font-size: 0.875rem;">20. August 2024</p>
                    </div>
                    <div style="padding: 1.5rem;">
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Damit Ihre Fahrt reibungslos verläuft, haben wir einige nützliche Tipps für Sie zusammengestellt.
                        </p>
                        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">📋 Checklist:</h4>
                            <ul style="color: #6b7280; font-size: 0.875rem;">
                                <li>Abholort genau angeben</li>
                                <li>Telefonnummer bereithalten</li>
                                <li>Fahrzeugtyp je nach Gepäck wählen</li>
                                <li>Bei Flughafenfahrten: Flugnummer mitteilen</li>
                                <li>Besondere Wünsche im Voraus kommunizieren</li>
                            </ul>
                        </div>
                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Bei Fragen stehen wir Ihnen jederzeit unter 076 611 31 31 zur Verfügung.
                        </p>
                        <a href="tel:076 611 31 31" class="btn" style="background: #7c3aed; color: #fff;">
                            📞 Jetzt anrufen
                        </a>
                    </div>
                </article>

            </div>

            <!-- Newsletter Subscription -->
            <div style="text-align: center; margin-top: 4rem; padding: 3rem; background: linear-gradient(45deg, #fef3c7, #fed7aa); border-radius: 12px;">
                <h3 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    📧 Newsletter abonnieren
                </h3>
                <p style="color: #6b7280; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
                    Bleiben Sie auf dem Laufenden über Neuigkeiten, Aktionen und Tipps von Taxi Türlihof.
                </p>
                <div style="display: flex; gap: 1rem; max-width: 400px; margin: 0 auto; flex-wrap: wrap;">
                    <input type="email" placeholder="Ihre E-Mail-Adresse" style="flex: 1; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; min-width: 200px;">
                    <button class="btn btn-primary">
                        Abonnieren
                    </button>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>