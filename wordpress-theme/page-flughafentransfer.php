<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Flughafentransfer</span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Flughafentransfer Zürich & Basel
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">
                    Zuverlässiger Transfer von der Zentralschweiz zu allen Flughäfen
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #2563eb; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #1d4ed8; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        ✈️ Transfer Buchen
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Airport Services -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Unsere Flughafentransfer-Services
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 800px; margin: 0 auto;">
                    Bequemer und zuverlässiger Transfer zu allen wichtigen Flughäfen der Schweiz
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background: #dbeafe; padding: 1rem; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✈️</div>
                        <h3 style="font-size: 1.5rem; font-weight: bold; color: #2563eb; margin: 0;">Flughafen Zürich</h3>
                    </div>
                    <div style="padding: 2rem;">
                        <p style="color: #6b7280; margin-bottom: 1rem;">Der größte Flughafen der Schweiz</p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 0.875rem; color: #6b7280;">Fahrtzeit von Luzern:</span>
                                <span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">ca. 1 Stunde</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 0.875rem; color: #6b7280;">Preis:</span>
                                <span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">auf Anfrage</span>
                            </div>
                        </div>
                        <div style="margin-top: 1rem;">
                            <h4 style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Abfahrtsorte:</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Luzern</span>
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Schwyz</span>
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Zug</span>
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Weggis</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background: #f3e8ff; padding: 1rem; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✈️</div>
                        <h3 style="font-size: 1.5rem; font-weight: bold; color: #7c3aed; margin: 0;">Flughafen Basel</h3>
                    </div>
                    <div style="padding: 2rem;">
                        <p style="color: #6b7280; margin-bottom: 1rem;">EuroAirport Basel-Mulhouse-Freiburg</p>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 0.875rem; color: #6b7280;">Fahrtzeit von Luzern:</span>
                                <span style="background: #f3e8ff; color: #6b21a8; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">ca. 1.5 Stunden</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 0.875rem; color: #6b7280;">Preis:</span>
                                <span style="background: #f3e8ff; color: #6b21a8; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">auf Anfrage</span>
                            </div>
                        </div>
                        <div style="margin-top: 1rem;">
                            <h4 style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Abfahrtsorte:</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Luzern</span>
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Schwyz</span>
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Zug</span>
                                <span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">Brunnen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Häufige Fragen zum Flughafentransfer
                </h2>
            </div>

            <div style="max-width: 800px; margin: 0 auto; display: grid; gap: 1rem;">
                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Wie früh sollte ich den Transfer buchen?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Idealerweise 24 Stunden im Voraus, aber wir können oft auch kurzfristige Buchungen umsetzen. Rufen Sie uns einfach an!
                    </div>
                </div>

                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Was passiert bei Flugverspätungen?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Wir überwachen Ihren Flug und passen die Abholzeit automatisch an. Bei Verspätungen entstehen keine zusätzlichen Kosten.
                    </div>
                </div>

                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Sind die Preise fix oder gibt es Aufschläge?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Unsere Flughafentransfer-Preise werden individuell kalkuliert und sind abhängig von Strecke, Fahrzeugtyp und Uhrzeit. Kontaktieren Sie uns für ein unverbindliches Angebot.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section style="padding: 5rem 0; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #fff;">
        <div class="container">
            <div style="text-center;">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Jetzt Flughafentransfer buchen
                </h2>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
                    Stressfrei zum Flug - zuverlässig und pünktlich!
                </p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #2563eb; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 Jetzt anrufen: 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #1d4ed8; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        ✈️ Transfer buchen
                    </a>
                </div>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.875rem; opacity: 0.75;">
                    <p>✈️ Flughafen Zürich & Basel • 🚗 Mercedes-Flotte • ⭐ 5.0 Sterne • 📞 24/7 Service</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>