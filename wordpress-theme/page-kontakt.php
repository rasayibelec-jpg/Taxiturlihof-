<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Kontakt</span>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <section style="background: linear-gradient(135deg, #10b981 0%, #2563eb 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                    📞
                </div>
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
                    Kontakt & 24/7 Service
                </h1>
                <p style="font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
                    Wir sind jederzeit für Sie da – rufen Sie uns an oder schreiben Sie uns
                </p>
            </div>
        </div>
    </section>

    <!-- Contact Options -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
                
                <!-- Phone -->
                <div style="background: #f0fdf4; padding: 2rem; text-align: center; border-radius: 12px; border: 2px solid #10b981;">
                    <div style="background: #10b981; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">
                        📞
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">Anrufen</h3>
                    <a href="tel:076 611 31 31" style="font-size: 2rem; font-weight: bold; color: #10b981; text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        076 611 31 31
                    </a>
                    <p style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">24/7 Service</p>
                </div>

                <!-- Email -->
                <div style="background: #eff6ff; padding: 2rem; text-align: center; border-radius: 12px; border: 2px solid #2563eb;">
                    <div style="background: #2563eb; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">
                        ✉️
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">E-Mail</h3>
                    <a href="mailto:info@taxiturlihof.ch" style="font-size: 1.1rem; font-weight: 600; color: #2563eb; text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        info@taxiturlihof.ch
                    </a>
                    <p style="font-size: 0.875rem; color: #6b7280;">Antwort in 24h</p>
                </div>

                <!-- WhatsApp -->
                <div style="background: #fffbeb; padding: 2rem; text-align: center; border-radius: 12px; border: 2px solid #f59e0b;">
                    <div style="background: #f59e0b; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">
                        💬
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">WhatsApp</h3>
                    <a href="https://wa.me/<?php echo taxi_get_option('taxi_whatsapp', '41766113131'); ?>" target="_blank" rel="noopener noreferrer" style="font-size: 1.1rem; font-weight: 600; color: #f59e0b; text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        076 611 31 31
                    </a>
                    <p style="font-size: 0.875rem; color: #6b7280;">Schnelle Antwort</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form -->
    <section style="padding: 3rem 0; background: #f9fafb;">
        <div class="container">
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h2 style="text-align: center; font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem;">
                        Nachricht senden
                    </h2>

                    <form id="contact-form">
                        <div style="display: grid; gap: 1.5rem;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Name *</label>
                                    <input type="text" name="name" required 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="Ihr Name">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Telefon</label>
                                    <input type="tel" name="phone" 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="Ihre Telefonnummer">
                                </div>
                            </div>

                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">E-Mail *</label>
                                <input type="email" name="email" required 
                                       style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                       placeholder="ihre.email@beispiel.ch">
                            </div>

                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Nachricht *</label>
                                <textarea name="message" required rows="6" 
                                          style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; resize: vertical;"
                                          placeholder="Ihre Nachricht oder Anfrage..."></textarea>
                            </div>

                            <div style="text-align: center;">
                                <button type="submit" class="btn" style="background: #f59e0b; color: #fff; padding: 1rem 3rem; font-size: 1.1rem; border: none; border-radius: 8px; cursor: pointer;">
                                    ✉️ Nachricht senden
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Success Message -->
                    <div id="contact-success" style="display: none; margin-top: 2rem; padding: 2rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; text-align: center;">
                        <h3 style="color: #059669; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">
                            ✅ Nachricht gesendet!
                        </h3>
                        <p style="color: #047857; margin: 0;">
                            Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews with QR Code -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Was unsere Kunden sagen
                </h2>
                <div style="display: flex; align-items: center; justify-center; margin-bottom: 2rem;">
                    <div style="display: flex; margin-right: 0.5rem;">
                        ⭐⭐⭐⭐⭐
                    </div>
                    <span style="margin-left: 0.5rem; font-size: 1.5rem; font-weight: bold; color: #1f2937;">5.0</span>
                    <span style="margin-left: 0.5rem; color: #6b7280;">(39 Bewertungen)</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                <div style="background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 1rem;">⭐⭐⭐⭐⭐</div>
                    <p style="color: #6b7280; margin-bottom: 1rem; font-style: italic;">
                        "Sehr pünktlich und freundlich. Perfekter Service vom Luzern Bahnhof zum Hotel."
                    </p>
                    <p style="font-weight: 600; color: #1f2937;">- Maria S.</p>
                </div>

                <div style="background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 1rem;">⭐⭐⭐⭐⭐</div>
                    <p style="color: #6b7280; margin-bottom: 1rem; font-style: italic;">
                        "Saubere Mercedes-Fahrzeuge und sehr professionelle Fahrer. Empfehlenswert!"
                    </p>
                    <p style="font-weight: 600; color: #1f2937;">- Thomas M.</p>
                </div>

                <div style="background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 1rem;">⭐⭐⭐⭐⭐</div>
                    <p style="color: #6b7280; margin-bottom: 1rem; font-style: italic;">
                        "24/7 erreichbar, auch spontane Fahrten kein Problem. Top Service!"
                    </p>
                    <p style="font-weight: 600; color: #1f2937;">- Andrea K.</p>
                </div>
            </div>

            <!-- QR Code for Reviews -->
            <div style="text-center;">
                <div style="background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; border: 2px solid #fbbf24;">
                    <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 1.5rem;">
                        📱 Bewerten Sie uns!
                    </h3>
                    <div style="display: flex; align-items: center; justify-center; gap: 1.5rem;">
                        <div style="text-center;">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://google.com/search?q=Taxi+T%C3%BCrlihof&hl=de%23lrd=0x0:0x0,3" 
                                 alt="QR Code für Google Bewertungen" 
                                 style="width: 100px; height: 100px; border-radius: 8px;">
                            <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">QR-Code scannen</p>
                        </div>
                        <div style="text-left;">
                            <p style="font-size: 0.875rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Schnell bewerten:</p>
                            <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem;">• QR-Code mit Handy scannen</p>
                            <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem;">• Google Bewertung abgeben</p>
                            <p style="font-size: 0.75rem; color: #6b7280;">• Anderen Kunden helfen</p>
                        </div>
                    </div>
                    <a href="https://google.com/search?q=Taxi+T%C3%BCrlihof&hl=de#lrd=0x0:0x0,3" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="btn" 
                       style="background: #fbbf24; color: #fff; padding: 0.75rem 1.5rem; font-size: 0.875rem; font-weight: 600; margin-top: 1rem; display: inline-block; border: none; border-radius: 8px; text-decoration: none;">
                        Jetzt bewerten
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Location Info -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="text-center; margin-bottom: 3rem;">
                    <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                        Unser Servicegebiet
                    </h2>
                    <p style="font-size: 1.25rem; color: #6b7280;">
                        Taxi Türlihof bedient die gesamte Zentralschweiz
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
                    <?php
                    $service_areas = array(
                        "Luzern" => "Altstadt, Bahnhof, KKL, Pilatus",
                        "Schwyz" => "Brunnen, Mythenregion, Stoos",
                        "Zug" => "Bahnhof, Zugersee, Business District",
                        "Weggis & Vitznau" => "Rigi-Bahn, Seeufer", 
                        "Brunnen & Gersau" => "Vierwaldstättersee",
                        "Arth-Goldau" => "Pilatus, Rigi-Bahnen"
                    );
                    
                    foreach ($service_areas as $area => $details) {
                        echo '<div style="background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-center;">';
                        echo '<div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📍</div>';
                        echo '<h4 style="font-size: 1.125rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">' . $area . '</h4>';
                        echo '<p style="color: #6b7280; font-size: 0.875rem; margin: 0;">' . $details . '</p>';
                        echo '</div>';
                    }
                    ?>
                </div>

                <div style="text-center; padding: 2rem; background: #f3f4f6; border-radius: 12px;">
                    <p style="color: #6b7280; margin-bottom: 0.5rem;">
                        📍 <strong>Service-Region:</strong> Luzern • Schwyz • Zug • Weggis • Vitznau • Brunnen • Arth-Goldau
                    </p>
                    <p style="font-size: 0.875rem; color: #9ca3af;">
                        Taxi Türlihof – Ihr zuverlässiger Partner seit 2010
                    </p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>