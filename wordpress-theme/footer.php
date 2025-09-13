<footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 style="color: #fbbf24; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Taxi Türlihof</h3>
                    <p style="margin-bottom: 1rem;">Ihr zuverlässiger Taxi-Service in der Zentralschweiz seit 2010.</p>
                    <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                        <span style="margin-right: 0.5rem;">📞</span>
                        <a href="tel:076 611 31 31" style="color: #d1d5db; text-decoration: none;">076 611 31 31</a>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="margin-right: 0.5rem;">✉️</span>
                        <a href="mailto:info@taxiturlihof.ch" style="color: #d1d5db; text-decoration: none;">info@taxiturlihof.ch</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4 style="color: #f3f4f6; font-weight: 600; margin-bottom: 1rem;">Dienstleistungen</h4>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/taxi-luzern'); ?>" style="color: #d1d5db; text-decoration: none;">Taxi Luzern</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/taxi-schwyz'); ?>" style="color: #d1d5db; text-decoration: none;">Taxi Schwyz</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/taxi-zug'); ?>" style="color: #d1d5db; text-decoration: none;">Taxi Zug</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/flughafentransfer'); ?>" style="color: #d1d5db; text-decoration: none;">Flughafentransfer</a></li>
                        <li><a href="<?php echo home_url('/flotte'); ?>" style="color: #d1d5db; text-decoration: none;">Mercedes-Flotte</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4 style="color: #f3f4f6; font-weight: 600; margin-bottom: 1rem;">Service</h4>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/preisrechner'); ?>" style="color: #d1d5db; text-decoration: none;">Preisrechner</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/buchen'); ?>" style="color: #d1d5db; text-decoration: none;">Online Buchen</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="<?php echo home_url('/blog'); ?>" style="color: #d1d5db; text-decoration: none;">Blog</a></li>
                        <li><a href="<?php echo home_url('/kontakt'); ?>" style="color: #d1d5db; text-decoration: none;">Kontakt</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4 style="color: #f3f4f6; font-weight: 600; margin-bottom: 1rem;">Servicegebiete</h4>
                    <ul style="list-style: none; font-size: 0.875rem;">
                        <li style="margin-bottom: 0.25rem;">📍 Luzern</li>
                        <li style="margin-bottom: 0.25rem;">📍 Schwyz</li>
                        <li style="margin-bottom: 0.25rem;">📍 Zug</li>
                        <li style="margin-bottom: 0.25rem;">📍 Weggis & Vitznau</li>
                        <li style="margin-bottom: 0.25rem;">📍 Brunnen</li>
                        <li>📍 Arth-Goldau</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <p>&copy; <?php echo date('Y'); ?> Taxi Türlihof. Alle Rechte vorbehalten.</p>
                    <div style="display: flex; gap: 1rem;">
                        <span>⭐ 5.0 Sterne</span>
                        <span>🚗 Mercedes-Flotte</span>
                        <span>📞 24/7 Service</span>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #374151; text-align: center; font-size: 0.875rem;">
                    <p>Website erstellt mit WordPress • Optimiert für Suchmaschinen</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Floating Button -->
    <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <a href="https://wa.me/41766113131" target="_blank" style="display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: #25d366; color: white; border-radius: 50%; text-decoration: none; font-size: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            💬
        </a>
    </div>

    <!-- Call Floating Button -->
    <div style="position: fixed; bottom: 90px; right: 20px; z-index: 1000;">
        <a href="tel:076 611 31 31" style="display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: #10b981; color: white; border-radius: 50%; text-decoration: none; font-size: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            📞
        </a>
    </div>

    <?php wp_footer(); ?>
</body>
</html>