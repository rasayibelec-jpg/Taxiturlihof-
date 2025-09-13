<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Taxi Zug</span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section style="background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Taxi Zug - Ihr zuverlässiger Partner am Zugersee
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">
                    Stressfrei unterwegs mit 24/7 Mercedes-Taxi-Service
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #0d9488; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #0f766e; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
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
                    Taxi Zug - Ihr Taxi Bahnhof Partner
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 800px; margin: 0 auto;">
                    Stressfrei unterwegs mit Taxi Turlihof – Ihr Taxi Bahnhof und zuverlässiger 
                    Partner am Zugersee für alle Ihre Transportbedürfnisse.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #ccfbf1; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🚂
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Bahnhof-Service</h3>
                    <p style="color: #6b7280;">
                        Direkter Service vom und zum Bahnhof Zug - immer pünktlich zu Ihrem Zug
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #ccfbf1; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🕐
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">24/7 Verfügbar</h3>
                    <p style="color: #6b7280;">
                        Rund um die Uhr erreichbar - auch für frühe Züge oder späte Ankünfte
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #ccfbf1; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        💼
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Business-Fahrten</h3>
                    <p style="color: #6b7280;">
                        Perfekt für Geschäftsreisende - diskret, pünktlich und komfortabel
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
                    Beliebte Ziele in und um Zug
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Wir bringen Sie überall in der Region Zug hin
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <?php
                $zug_destinations = array(
                    "Bahnhof Zug",
                    "Zugersee", 
                    "Altstadt Zug",
                    "Zugerberg",
                    "Baar",
                    "Cham",
                    "Steinhausen",
                    "Walchwil"
                );
                
                foreach ($zug_destinations as $destination) {
                    echo '<div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-center; transition: background 0.3s;" onmouseover="this.style.background=\'#ccfbf1\'" onmouseout="this.style.background=\'#f3f4f6\'">';
                    echo '<div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📍</div>';
                    echo '<h4 style="font-weight: 600; color: #1f2937; margin: 0;">' . $destination . '</h4>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </section>

    <!-- Business Services -->
    <section style="padding: 5rem 0; background: #fff;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Business-Services in Zug
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Zug als Wirtschaftsstandort - wir bringen Sie zu allen wichtigen Terminen
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
                <div style="background: #f9fafb; padding: 1.5rem; border-radius: 12px;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="background: #ccfbf1; padding: 0.5rem; border-radius: 50%; margin-right: 1rem; font-size: 1.25rem;">🚂</div>
                        <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin: 0;">Bahnhof-Transfer</h3>
                    </div>
                    <p style="color: #6b7280; margin: 0;">
                        Zuverlässiger Transport vom und zum Bahnhof Zug. Wir sorgen dafür, dass Sie Ihren Zug nicht verpassen.
                    </p>
                </div>

                <div style="background: #f9fafb; padding: 1.5rem; border-radius: 12px;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="background: #ccfbf1; padding: 0.5rem; border-radius: 50%; margin-right: 1rem; font-size: 1.25rem;">🚗</div>
                        <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin: 0;">Firmen-Fahrten</h3>
                    </div>
                    <p style="color: #6b7280; margin: 0;">
                        Geschäftsfahrten zu Kunden, Meetings oder Events - diskret und professionell.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section style="padding: 5rem 0; background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%); color: #fff;">
        <div class="container">
            <div style="text-center;">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    Jetzt Taxi in Zug buchen
                </h2>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
                    Stressfrei am Zugersee unterwegs - Ihr zuverlässiger Taxi-Partner!
                </p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #0d9488; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        📞 Jetzt anrufen: 076 611 31 31
                    </a>
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #0f766e; color: #fff; padding: 1rem 2rem; font-size: 1.1rem; font-weight: bold;">
                        🚗 Online Buchen
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>