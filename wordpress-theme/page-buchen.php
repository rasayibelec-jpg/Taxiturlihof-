<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Online buchen</span>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <section style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                    📅
                </div>
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
                    Online buchen
                </h1>
                <p style="font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
                    Buchen Sie Ihre Fahrt bequem online - Bestätigung per E-Mail
                </p>
            </div>
        </div>
    </section>

    <!-- Booking Form -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 2px solid #2563eb;">
                    <h2 style="text-align: center; font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem;">
                        Taxi online buchen
                    </h2>

                    <form id="booking-form">
                        <!-- Customer Information -->
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">
                                👤 Ihre Daten
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Name *</label>
                                    <input type="text" id="customer_name" name="customer_name" required 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="Ihr vollständiger Name">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">E-Mail *</label>
                                    <input type="email" id="customer_email" name="customer_email" required 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="ihre.email@beispiel.ch">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Telefon *</label>
                                    <input type="tel" id="customer_phone" name="customer_phone" required 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="076 123 45 67">
                                </div>
                            </div>
                        </div>

                        <!-- Trip Information -->
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">
                                🚗 Fahrt-Details
                            </h3>
                            <div style="display: grid; gap: 1rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Von (Abholort) *</label>
                                    <input type="text" id="pickup_location" name="pickup_location" required 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="z.B. Luzern Bahnhof, Bahnhofplatz 1">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Nach (Zielort) *</label>
                                    <input type="text" id="destination" name="destination" required 
                                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                           placeholder="z.B. Zürich Flughafen Terminal 1">
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                    <div>
                                        <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Datum *</label>
                                        <input type="date" id="pickup_date" name="pickup_date" required 
                                               style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                               min="<?php echo date('Y-m-d'); ?>">
                                    </div>
                                    <div>
                                        <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Uhrzeit *</label>
                                        <input type="time" id="pickup_time" name="pickup_time" required 
                                               style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Vehicle & Passengers -->
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">
                                🚙 Fahrzeug & Personen
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Fahrzeugtyp</label>
                                    <select id="vehicle_type" name="vehicle_type" 
                                            style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;">
                                        <option value="standard">Standard (Mercedes C/E-Klasse) - 1-4 Personen</option>
                                        <option value="premium">Premium (Mercedes S-Klasse) - 1-4 Personen</option>
                                        <option value="van">Van (Mercedes V-Klasse) - bis 8 Personen</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Anzahl Personen</label>
                                    <select id="passenger_count" name="passenger_count" 
                                            style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;">
                                        <option value="1">1 Person</option>
                                        <option value="2">2 Personen</option>
                                        <option value="3">3 Personen</option>
                                        <option value="4">4 Personen</option>
                                        <option value="5">5 Personen</option>
                                        <option value="6">6 Personen</option>
                                        <option value="7">7 Personen</option>
                                        <option value="8">8 Personen</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Special Requests -->
                        <div style="margin-bottom: 2rem;">
                            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">💬 Besondere Wünsche oder Anmerkungen</label>
                            <textarea id="special_requests" name="special_requests" rows="4" 
                                      style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; resize: vertical;"
                                      placeholder="z.B. Kindersitz benötigt, viel Gepäck, Wartezeit eingeplant..."></textarea>
                        </div>

                        <!-- Submit Button -->
                        <div style="text-align: center;">
                            <button type="submit" class="btn" style="background: #2563eb; color: #fff; padding: 1rem 3rem; font-size: 1.1rem; border: none; border-radius: 8px; cursor: pointer;">
                                📅 Buchung absenden
                            </button>
                        </div>
                    </form>

                    <!-- Success Message -->
                    <div id="booking-success" style="display: none; margin-top: 2rem; padding: 2rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; text-align: center;">
                        <h3 style="color: #059669; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">
                            ✅ Buchung erfolgreich!
                        </h3>
                        <p style="color: #047857; margin-bottom: 1rem;">
                            Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
                        </p>
                        <p style="font-size: 0.875rem; color: #6b7280;">
                            Bei Fragen rufen Sie uns gerne an: <strong>076 611 31 31</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Alternative Options -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Andere Optionen
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Benötigen Sie erst eine Preiskalkulation oder bevorzugen Sie den direkten Kontakt?
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🧮
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Preis berechnen</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Kalkulieren Sie zunächst den ungefähren Fahrpreis für Ihre Route
                    </p>
                    <a href="<?php echo home_url('/preisrechner'); ?>" class="btn" style="background: #f59e0b; color: #fff; padding: 0.75rem 1.5rem;">
                        Zum Preisrechner
                    </a>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dcfce7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        📞
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Telefonisch buchen</h3>
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Für spontane Fahrten oder bei speziellen Wünschen rufen Sie uns an
                    </p>
                    <a href="tel:076 611 31 31" class="btn btn-success" style="padding: 0.75rem 1.5rem;">
                        076 611 31 31
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<script>
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Basic validation
    if (!data.customer_name || !data.customer_email || !data.customer_phone || 
        !data.pickup_location || !data.destination || !data.pickup_date || !data.pickup_time) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }
    
    // Simulate form submission (in real WordPress, this would use AJAX)
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        this.style.display = 'none';
        document.getElementById('booking-success').style.display = 'block';
        
        // Reset button (in case user goes back)
        submitButton.textContent = '📅 Buchung absenden';
        submitButton.disabled = false;
        
        // In real implementation, you would:
        // 1. Send data to WordPress via AJAX
        // 2. Save to database
        // 3. Send confirmation emails
        // 4. Show actual booking ID
        
    }, 2000);
});

// Set minimum date to today
document.getElementById('pickup_date').min = new Date().toISOString().split('T')[0];

// Auto-select van when more than 4 passengers
document.getElementById('passenger_count').addEventListener('change', function() {
    const count = parseInt(this.value);
    const vehicleSelect = document.getElementById('vehicle_type');
    
    if (count > 4) {
        vehicleSelect.value = 'van';
    }
});
</script>

<?php get_footer(); ?>