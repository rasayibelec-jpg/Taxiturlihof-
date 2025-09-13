<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Preisrechner</span>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <section style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                    🧮
                </div>
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
                    Preisrechner
                </h1>
                <p style="font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
                    Berechnen Sie den Fahrpreis für Ihre Route schnell und transparent
                </p>
            </div>
        </div>
    </section>

    <!-- Price Calculator -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 2px solid #fbbf24;">
                    <h2 style="text-align: center; font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem;">
                        Taxi-Preis berechnen
                    </h2>

                    <form id="price-calculator-form">
                        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Von (Startpunkt) *</label>
                                <input type="text" id="pickup_location" name="pickup_location" required 
                                       style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                       placeholder="z.B. Luzern Bahnhof">
                            </div>

                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Nach (Ziel) *</label>
                                <input type="text" id="destination" name="destination" required 
                                       style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;"
                                       placeholder="z.B. Zürich Flughafen">
                            </div>

                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Fahrzeugtyp</label>
                                <select id="vehicle_type" name="vehicle_type" 
                                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem;">
                                    <option value="standard">Standard (Mercedes C/E-Klasse) - CHF 4.20/km</option>
                                    <option value="premium">Premium (Mercedes S-Klasse) - CHF 5.00/km</option>
                                    <option value="van">Van (Mercedes V-Klasse) - CHF 5.00/km</option>
                                </select>
                            </div>
                        </div>

                        <div style="text-align: center;">
                            <button type="submit" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.1rem;">
                                🧮 Preis berechnen
                            </button>
                        </div>
                    </form>

                    <!-- Results -->
                    <div id="price-results" style="display: none; margin-top: 2rem; padding: 2rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px;">
                        <h3 style="color: #059669; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; text-align: center;">
                            💰 Geschätzte Kosten
                        </h3>
                        <div id="price-breakdown"></div>
                        <div style="text-align: center; margin-top: 1.5rem;">
                            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
                                * Preise sind Schätzungen. Exakte Preise erhalten Sie telefonisch.
                            </p>
                            <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #2563eb; color: #fff; margin-right: 1rem;">
                                📅 Jetzt buchen
                            </a>
                            <a href="tel:076 611 31 31" class="btn btn-success">
                                📞 076 611 31 31
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Current Pricing -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Aktuelle Preise
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    Transparente Tarife ohne versteckte Kosten
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; border-radius: 12px; text-align: center; border: 2px solid #fbbf24;">
                    <h3 style="color: #f59e0b; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Grundtaxe</h3>
                    <div style="font-size: 3rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">CHF 6.60</div>
                    <p style="color: #6b7280;">Pro Fahrt (alle Fahrzeugtypen)</p>
                </div>

                <div style="background: #fff; padding: 2rem; border-radius: 12px; text-align: center; border: 2px solid #3b82f6;">
                    <h3 style="color: #2563eb; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Standard</h3>
                    <div style="font-size: 3rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">CHF 4.20</div>
                    <p style="color: #6b7280;">Pro Kilometer<br><small>Mercedes C/E-Klasse</small></p>
                </div>

                <div style="background: #fff; padding: 2rem; border-radius: 12px; text-align: center; border: 2px solid #10b981;">
                    <h3 style="color: #059669; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Premium/Van</h3>
                    <div style="font-size: 3rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">CHF 5.00</div>
                    <p style="color: #6b7280;">Pro Kilometer<br><small>Mercedes S/V-Klasse</small></p>
                </div>

                <div style="background: #fff; padding: 2rem; border-radius: 12px; text-align: center; border: 2px solid #ea580c;">
                    <h3 style="color: #ea580c; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Wartezeit</h3>
                    <div style="font-size: 3rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">CHF 73.00</div>
                    <p style="color: #6b7280;">Pro Stunde</p>
                </div>
            </div>

            <div style="background: #f3f4f6; padding: 2rem; border-radius: 12px; margin-top: 3rem;">
                <h4 style="font-weight: 600; margin-bottom: 1rem; color: #1f2937;">💡 Wichtige Hinweise:</h4>
                <ul style="color: #6b7280; line-height: 1.8;">
                    <li>• Alle Preise inkl. MwSt.</li>
                    <li>• Keine Zuschläge für Nachts, Wochenende oder Feiertage</li>
                    <li>• Flughafentransfer: Preis auf Anfrage</li>
                    <li>• Exakte Preise über Preisrechner oder telefonisch</li>
                </ul>
            </div>
        </div>
    </section>
</main>

<script>
document.getElementById('price-calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const pickup = document.getElementById('pickup_location').value;
    const destination = document.getElementById('destination').value;
    const vehicleType = document.getElementById('vehicle_type').value;
    
    if (!pickup || !destination) {
        alert('Bitte geben Sie Start- und Zielpunkt ein.');
        return;
    }
    
    // Simple distance estimation (in reality, you'd use Google Maps API)
    const estimatedDistance = Math.floor(Math.random() * 50) + 5; // 5-55 km estimation
    
    let pricePerKm;
    let vehicleName;
    
    switch(vehicleType) {
        case 'standard':
            pricePerKm = 4.20;
            vehicleName = 'Standard (Mercedes C/E-Klasse)';
            break;
        case 'premium':
            pricePerKm = 5.00;
            vehicleName = 'Premium (Mercedes S-Klasse)';
            break;
        case 'van':
            pricePerKm = 5.00;
            vehicleName = 'Van (Mercedes V-Klasse)';
            break;
    }
    
    const grundtaxe = 6.60;
    const totalDistance = estimatedDistance * pricePerKm;
    const totalPrice = grundtaxe + totalDistance;
    
    const resultsDiv = document.getElementById('price-results');
    const breakdownDiv = document.getElementById('price-breakdown');
    
    breakdownDiv.innerHTML = `
        <div style="display: grid; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fff; border-radius: 8px;">
                <span><strong>Route:</strong> ${pickup} → ${destination}</span>
                <span style="color: #6b7280;">ca. ${estimatedDistance} km</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fff; border-radius: 8px;">
                <span><strong>Fahrzeug:</strong> ${vehicleName}</span>
                <span style="color: #6b7280;">CHF ${pricePerKm}/km</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fff; border-radius: 8px;">
                <span>Grundtaxe</span>
                <span style="font-weight: bold; color: #f59e0b;">CHF ${grundtaxe.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fff; border-radius: 8px;">
                <span>Distanz (${estimatedDistance} km × CHF ${pricePerKm})</span>
                <span style="font-weight: bold; color: #2563eb;">CHF ${totalDistance.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #10b981; color: #fff; border-radius: 8px; font-size: 1.25rem;">
                <span><strong>Geschätzter Gesamtpreis:</strong></span>
                <span style="font-weight: bold; font-size: 1.5rem;">CHF ${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
});
</script>

<?php get_footer(); ?>