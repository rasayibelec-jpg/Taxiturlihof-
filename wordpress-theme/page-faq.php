<?php get_header(); ?>

<main id="main" class="site-main">
    <section style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: #fff; padding: 120px 0 80px; text-align: center;">
        <div class="container">
            <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem; color: #fbbf24;">
                Häufig gestellte Fragen
            </h1>
            <p style="font-size: 1.25rem; color: #d1d5db; max-width: 600px; margin: 0 auto;">
                Antworten auf die wichtigsten Fragen zu unserem Taxi-Service
            </p>
        </div>
    </section>

    <section style="padding: 80px 0; background: #f9fafb;">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto;">
                
                <!-- FAQ Item 1 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>🕐 Bietet Taxi Türlihof 24/7 Service an?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem;">
                            Ja, Taxi Türlihof ist rund um die Uhr verfügbar - 24 Stunden am Tag, 7 Tage die Woche, 365 Tage im Jahr. 
                            Sie können uns jederzeit unter <strong>076 611 31 31</strong> erreichen oder bequem online buchen. 
                            Auch an Feiertagen und Wochenenden sind wir für Sie da, ohne Aufpreis!
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 2 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>📍 Welche Gebiete bedient Taxi Türlihof?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            Unser Hauptservicegebiet umfasst die gesamte Zentralschweiz:
                        </p>
                        <ul style="color: #6b7280; padding-left: 1.5rem; margin-bottom: 1rem;">
                            <li><strong>Luzern</strong> (Stadt und Umgebung)</li>
                            <li><strong>Schwyz</strong> (inkl. Einsiedeln, Arth-Goldau, Brunnen)</li>
                            <li><strong>Zug</strong> (Stadt und Umgebung)</li>
                            <li><strong>Weggis & Vitznau</strong> (Vierwaldstättersee)</li>
                            <li><strong>Flughafentransfers</strong> nach Zürich und Basel</li>
                        </ul>
                        <p style="color: #6b7280;">
                            Für weitere Destinationen kontaktieren Sie uns gerne - wir finden eine Lösung!
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 3 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>💰 Wie berechnen sich die Preise?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            Unsere Preisstruktur ist transparent und fair:
                        </p>
                        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <ul style="color: #6b7280; list-style: none; padding: 0;">
                                <li style="margin-bottom: 0.5rem;"><strong>Grundtaxe:</strong> CHF 6.60 (für alle Fahrzeuge)</li>
                                <li style="margin-bottom: 0.5rem;"><strong>Standard (C/E-Klasse):</strong> CHF 4.20 pro Kilometer</li>
                                <li style="margin-bottom: 0.5rem;"><strong>Premium/Van (S/V-Klasse):</strong> CHF 5.00 pro Kilometer</li>
                                <li><strong>Wartezeit:</strong> CHF 73.00 pro Stunde</li>
                            </ul>
                        </div>
                        <p style="color: #6b7280;">
                            <strong>Keine Zuschläge</strong> für Nachts, Wochenende oder Feiertage! 
                            Nutzen Sie unseren <a href="/preisrechner" style="color: #f59e0b; font-weight: 600;">Preisrechner</a> für eine genaue Kostenschätzung.
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 4 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>📱 Kann ich online ein Taxi buchen?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            Ja! Sie haben mehrere Möglichkeiten, Ihr Taxi zu buchen:
                        </p>
                        <ul style="color: #6b7280; padding-left: 1.5rem; margin-bottom: 1rem;">
                            <li><strong>Online-Buchung:</strong> Über unsere <a href="/buchen" style="color: #f59e0b; font-weight: 600;">Buchungsseite</a></li>
                            <li><strong>Telefon:</strong> 076 611 31 31 (24/7 verfügbar)</li>
                            <li><strong>WhatsApp:</strong> Über den grünen Button auf unserer Website</li>
                            <li><strong>E-Mail:</strong> info@taxiturlihof.ch</li>
                        </ul>
                        <p style="color: #6b7280;">
                            Bei der Online-Buchung erhalten Sie sofort eine Bestätigung per E-Mail.
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 5 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>🚗 Welche Fahrzeuge nutzt Taxi Türlihof?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            Wir verfügen über eine moderne <strong>100% Mercedes-Flotte</strong>:
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                                <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Standard</h4>
                                <p style="color: #6b7280; font-size: 0.875rem;">Mercedes C/E-Klasse<br>1-4 Personen<br>Komfortabel & sparsam</p>
                            </div>
                            <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                                <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Premium</h4>
                                <p style="color: #6b7280; font-size: 0.875rem;">Mercedes S-Klasse<br>1-4 Personen<br>Luxus & Exklusivität</p>
                            </div>
                            <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                                <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Van</h4>
                                <p style="color: #6b7280; font-size: 0.875rem;">Mercedes V-Klasse<br>bis 8 Personen<br>Ideal für Gruppen</p>
                            </div>
                        </div>
                        <p style="color: #6b7280;">
                            Alle Fahrzeuge sind gepflegt, klimatisiert und mit modernen Sicherheitssystemen ausgestattet.
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 6 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>✈️ Bieten Sie Flughafentransfers an?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            Ja, wir bieten zuverlässige Flughafentransfers zu allen wichtigen Schweizer Flughäfen:
                        </p>
                        <ul style="color: #6b7280; padding-left: 1.5rem; margin-bottom: 1rem;">
                            <li><strong>Zürich Kloten (ZUR)</strong> - Hauptdestination</li>
                            <li><strong>Basel-Mulhouse (BSL)</strong> - EuroAirport</li>
                            <li><strong>Bern-Belp (BRN)</strong> - auf Anfrage</li>
                            <li><strong>St. Gallen-Altenrhein (ACH)</strong> - auf Anfrage</li>
                        </ul>
                        <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">🎯 Unser Service:</h4>
                            <ul style="color: #6b7280; font-size: 0.875rem; padding-left: 1rem;">
                                <li>Pünktliche Abholung/Ankunft</li>
                                <li>Flugüberwachung bei Verspätungen</li>
                                <li>Gepäckservice inklusive</li>
                                <li>Meet & Greet Service verfügbar</li>
                            </ul>
                        </div>
                        <p style="color: #6b7280;">
                            Für Flughafentransfers empfehlen wir eine Voranmeldung. 
                            <a href="/flughafentransfer" style="color: #f59e0b; font-weight: 600;">Mehr Informationen hier</a>.
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 7 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>💳 Welche Zahlungsmethoden akzeptieren Sie?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            Wir akzeptieren alle gängigen Zahlungsmethoden:
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                            <div style="text-align: center; padding: 0.5rem;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">💵</div>
                                <p style="color: #6b7280; font-size: 0.875rem; font-weight: 600;">Bargeld</p>
                            </div>
                            <div style="text-align: center; padding: 0.5rem;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">💳</div>
                                <p style="color: #6b7280; font-size: 0.875rem; font-weight: 600;">EC-Karte</p>
                            </div>
                            <div style="text-align: center; padding: 0.5rem;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">💴</div>
                                <p style="color: #6b7280; font-size: 0.875rem; font-weight: 600;">Kreditkarten</p>
                            </div>
                            <div style="text-align: center; padding: 0.5rem;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
                                <p style="color: #6b7280; font-size: 0.875rem; font-weight: 600;">Kontaktlos</p>
                            </div>
                            <div style="text-align: center; padding: 0.5rem;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧾</div>
                                <p style="color: #6b7280; font-size: 0.875rem; font-weight: 600;">Rechnung</p>
                            </div>
                            <div style="text-align: center; padding: 0.5rem;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📞</div>
                                <p style="color: #6b7280; font-size: 0.875rem; font-weight: 600;">TWINT</p>
                            </div>
                        </div>
                        <p style="color: #6b7280; margin-top: 1rem;">
                            Für Geschäftskunden bieten wir auch Rechnungsstellung an.
                        </p>
                    </div>
                </div>

                <!-- FAQ Item 8 -->
                <div style="background: #fff; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <button onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600;">
                        <span>⏰ Wie kurzfristig kann ich ein Taxi bestellen?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-content" style="display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-top: 1rem; margin-bottom: 1rem;">
                            <strong>Sofortfahrten:</strong> In der Regel sind wir innerhalb von 5-15 Minuten bei Ihnen, 
                            abhängig von Ihrem Standort und aktueller Auslastung.
                        </p>
                        <p style="color: #6b7280; margin-bottom: 1rem;">
                            <strong>Terminfahrten:</strong> Können bis zu 30 Minuten vor der gewünschten Abholzeit gebucht werden.
                        </p>
                        <div style="background: #f0fdf4; border: 1px solid #10b981; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #065f46; font-weight: 600; margin-bottom: 0.5rem;">💡 Tipp:</h4>
                            <p style="color: #6b7280; font-size: 0.875rem;">
                                Für wichtige Termine (Flughafen, Geschäftstermine, etc.) empfehlen wir eine 
                                Voranmeldung von mindestens 1-2 Stunden für optimale Planungssicherheit.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact CTA -->
                <div style="text-align: center; margin-top: 3rem; padding: 2rem; background: linear-gradient(45deg, #fef3c7, #fed7aa); border-radius: 12px;">
                    <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                        Haben Sie weitere Fragen?
                    </h3>
                    <p style="color: #6b7280; margin-bottom: 2rem;">
                        Unser freundliches Team steht Ihnen jederzeit zur Verfügung!
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:076 611 31 31" class="btn btn-primary">
                            📞 Anrufen
                        </a>
                        <a href="https://wa.me/41766113131" target="_blank" class="btn btn-success">
                            💬 WhatsApp
                        </a>
                        <a href="mailto:info@taxiturlihof.ch" class="btn" style="background: #2563eb; color: #fff;">
                            ✉️ E-Mail
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
</main>

<script>
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '−';
        button.style.backgroundColor = '#f9fafb';
    } else {
        content.style.display = 'none';
        icon.textContent = '+';
        button.style.backgroundColor = 'transparent';
    }
}
</script>

<?php get_footer(); ?>