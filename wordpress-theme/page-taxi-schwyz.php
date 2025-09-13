<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Taxi Schwyz</span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section style="background: linear-gradient(135deg, #059669 0%, #2563eb 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Taxi Schwyz - Sicher durch die Berglandschaft
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">
                    24/7 Mercedes-Taxi-Service in Schwyz und Brunnen
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #059669; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #047857; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        🚗 Online Buchen
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Ihr zuverlässiger Taxi-Partner in Schwyz
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 800px; margin: 0 auto;">
                    Mit Taxi Turlihof gelangen Sie sicher durch die Berglandschaft und erreichen 
                    jedes Ziel in Schwyz und Brunnen - von der Mythenregion bis zum Vierwaldstättersee.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dcfce7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        ⛰️
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Berglandschaft</h3>
                    <p style="color: #6b7280;">
                        Erfahrene Fahrer, die alle Bergstraßen und Routen in Schwyz perfekt kennen
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dcfce7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🕐
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">24/7 Verfügbar</h3>
                    <p style="color: #6b7280;">
                        Auch in den Bergen immer erreichbar - rund um die Uhr für Sie da
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dcfce7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🚗
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Mercedes-Flotte</h3>
                    <p style="color: #6b7280;">
                        Sichere, moderne Fahrzeuge für alle Wetterbedingungen in den Bergen
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Destinations -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Beliebte Ziele in Schwyz & Brunnen
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Wir bringen Sie zu allen wichtigen Orten in der Mythenregion
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <?php
                $schwyz_destinations = array(
                    "Schwyz Bahnhof",
                    "Brunnen Bahnhof", 
                    "Mythenzentrum",
                    "Victorinox Museum",
                    "Gersau",
                    "Morschach",
                    "Stoos",
                    "Muotathal"
                );
                
                foreach ($schwyz_destinations as $destination) {
                    echo '<div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-center; transition: background 0.3s;" onmouseover="this.style.background=\'#dcfce7\'" onmouseout="this.style.background=\'#f3f4f6\'">';
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
                    Häufige Fragen zu Taxi Schwyz
                </h2>
            </div>

            <div style="max-width: 800px; margin: 0 auto; display: grid; gap: 1rem;">
                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Fahren Sie auch auf den Stoos?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Ja, wir fahren Sie gerne zur Stoosbahn-Talstation in Schwyz. Von dort können Sie mit der steilsten Standseilbahn der Welt auf den Stoos fahren.
                    </div>
                </div>

                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    <button class="faq-question" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>Sind Ihre Fahrzeuge für Bergstraßen geeignet?</span>
                        <span>+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #6b7280;">
                        Selbstverständlich! Unsere Mercedes-Flotte ist perfekt für alle Wetterbedingungen und Bergstraßen in der Region Schwyz ausgerüstet.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section style="padding: 5rem 0; background: linear-gradient(135deg, #059669 0%, #2563eb 100%); color: #fff;">
        <div class="container">
            <div style="text-center;">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Jetzt Taxi in Schwyz buchen
                </h2>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
                    Sicher durch die Berglandschaft - rufen Sie uns an!
                </p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #059669; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 Jetzt anrufen: 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #047857; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        🚗 Online Buchen
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>