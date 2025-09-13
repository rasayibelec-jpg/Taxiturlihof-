<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Taxi Luzern</span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Taxi Luzern - Ihr zuverlässiger Partner
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">
                    24/7 Mercedes-Taxi-Service in der Stadt Luzern
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #f59e0b; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #d97706; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        🚗 Online Buchen
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Warum Taxi Türlihof in Luzern wählen?
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 800px; margin: 0 auto;">
                    Als lokaler Taxi-Service kennen wir Luzern wie unsere Westentasche. 
                    Von der Altstadt bis zur Kapellbrücke - wir bringen Sie schnell und sicher ans Ziel.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🕐
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">24/7 Verfügbar</h3>
                    <p style="color: #6b7280;">
                        Rund um die Uhr erreichbar - auch nachts, am Wochenende und an Feiertagen
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🚗
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Mercedes-Flotte</h3>
                    <p style="color: #6b7280;">
                        Moderne, saubere Mercedes-Fahrzeuge für höchsten Komfort
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🗺️
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Lokale Expertise</h3>
                    <p style="color: #6b7280;">
                        Wir kennen alle Routen, Shortcuts und die besten Wege durch Luzern
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Popular Destinations -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Beliebte Ziele in Luzern
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Wir bringen Sie zu allen wichtigen Orten in und um Luzern
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <?php
                $luzern_destinations = array(
                    "Luzern Bahnhof",
                    "Kapellbrücke", 
                    "Altstadt Luzern",
                    "KKL Luzern",
                    "Pilatus Bergbahn",
                    "Verkehrshaus",
                    "Hotel Schweizerhof",
                    "Universität Luzern"
                );
                
                foreach ($luzern_destinations as $destination) {
                    echo '<div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-center; transition: background 0.3s;" onmouseover="this.style.background=\'#fef3c7\'" onmouseout="this.style.background=\'#f3f4f6\'">';
                    echo '<div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📍</div>';
                    echo '<h4 style="font-weight: 600; color: #1f2937; margin: 0;">' . $destination . '</h4>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Häufige Fragen zu Taxi Luzern
                </h2>
            </div>

            <div style="max-width: 800px; margin: 0 auto; display: grid; gap: 1rem;">
                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Wie lange dauert es bis ein Taxi in Luzern kommt?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        In der Regel sind wir innerhalb von 5-10 Minuten bei Ihnen, abhängig von Ihrem Standort in Luzern und der aktuellen Verkehrssituation.
                    </div>
                </div>

                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Fahren Sie auch vom Flughafen Zürich nach Luzern?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Ja, wir bieten zuverlässige Flughafentransfers von und zum Flughafen Zürich an. Die Fahrt dauert ca. 1 Stunde. Preis auf Anfrage.
                    </div>
                </div>

                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Kann ich ein Taxi für mehrere Personen buchen?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Selbstverständlich! Wir haben Mercedes V-Klasse Vans für bis zu 8 Personen sowie Standard-Fahrzeuge für 1-4 Personen.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Other Cities -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Weitere Servicegebiete von Taxi Türlihof
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Wir sind auch in anderen Städten der Zentralschweiz für Sie da
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dcfce7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        📍
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Taxi Schwyz</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Sicher durch die Berglandschaft - Ihr Taxi-Service in Schwyz und Brunnen
                    </p>
                    <a href="<?php echo home_url('/taxi-schwyz'); ?>" style="color: #059669; text-decoration: none; font-weight: 600;">
                        Mehr erfahren →
                    </a>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #ccfbf1; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        📍
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Taxi Zug</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Stressfrei am Zugersee - Ihr Bahnhof-Taxi und zuverlässiger Partner
                    </p>
                    <a href="<?php echo home_url('/taxi-zug'); ?>" style="color: #0d9488; text-decoration: none; font-weight: 600;">
                        Mehr erfahren →
                    </a>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dbeafe; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        ✈️
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Flughafentransfer</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Zuverlässiger Transfer zu allen Schweizer Flughäfen
                    </p>
                    <a href="<?php echo home_url('/flughafentransfer'); ?>" style="color: #2563eb; text-decoration: none; font-weight: 600;">
                        Mehr erfahren →
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section style="padding: 5rem 0; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #fff;">
        <div class="container">
            <div style="text-center;">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Jetzt Taxi in Luzern buchen
                </h2>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
                    Rufen Sie uns an oder buchen Sie online - wir sind rund um die Uhr für Sie da!
                </p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #f59e0b; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 Jetzt anrufen: 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #d97706; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        🚗 Online Buchen
                    </a>
                </div>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.875rem; opacity: 0.75;">
                    <p>⭐ 5.0 Sterne • 39 Bewertungen • 24/7 Service • Mercedes-Flotte</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>