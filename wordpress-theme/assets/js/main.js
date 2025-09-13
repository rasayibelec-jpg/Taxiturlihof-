/**
 * Taxi Türlihof Main JavaScript
 */

(function($) {
    'use strict';

    // Document Ready
    $(document).ready(function() {
        initializeComponents();
    });

    function initializeComponents() {
        initFleetGallery();
        initPriceCalculator();
        initBookingForm();
        initContactForm();
        initShowHideDetails();
    }

    // Fleet Gallery
    function initFleetGallery() {
        const gallery = $('#fleet-gallery');
        if (gallery.length === 0) return;

        // This will be handled by each page's specific JavaScript
        // Fleet images are loaded via PHP from custom post type
    }

    // Price Calculator
    function initPriceCalculator() {
        const calculatorForm = $('#price-calculator-form');
        if (calculatorForm.length === 0) return;

        calculatorForm.on('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                action: 'taxi_calculate_price',
                nonce: taxi_ajax.nonce,
                pickup_location: $('#pickup_location').val(),
                destination: $('#destination').val(),
                pickup_date: $('#pickup_date').val(),
                pickup_time: $('#pickup_time').val(),
                passenger_count: $('#passenger_count').val(),
                vehicle_type: $('#vehicle_type').val()
            };

            // Show loading
            const resultsDiv = $('#calculation-results');
            resultsDiv.html('<p>Berechnung läuft...</p>').show();

            $.ajax({
                url: taxi_ajax.ajax_url,
                type: 'POST',
                data: formData,
                success: function(response) {
                    if (response.success) {
                        displayPriceResults(response.data);
                    } else {
                        resultsDiv.html('<p style="color: red;">Fehler: ' + response.data + '</p>');
                    }
                },
                error: function() {
                    resultsDiv.html('<p style="color: red;">Fehler bei der Berechnung. Bitte versuchen Sie es erneut.</p>');
                }
            });
        });
    }

    function displayPriceResults(data) {
        const resultsDiv = $('#calculation-results');
        const whatsappUrl = generateWhatsAppUrl(data);
        
        resultsDiv.html(`
            <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 2rem; border-radius: 12px; margin-top: 2rem;">
                <h3 style="color: #065f46; margin-bottom: 1.5rem; font-size: 1.5rem;">
                    ✅ Fahrtkosten berechnet
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div>
                        <h4 style="color: #374151; margin-bottom: 0.5rem;">📍 Strecke</h4>
                        <p><strong>${data.pickup_location}</strong><br>↓<br><strong>${data.destination}</strong></p>
                        <p style="color: #6b7280; font-size: 0.875rem;">
                            ${data.distance} km • ${data.duration} Min.
                        </p>
                    </div>
                    
                    <div>
                        <h4 style="color: #374151; margin-bottom: 0.5rem;">🚗 Fahrzeug</h4>
                        <p><strong>${data.vehicle_type}</strong></p>
                        <p style="color: #6b7280; font-size: 0.875rem;">
                            ${data.passenger_count} Passagiere
                        </p>
                    </div>
                    
                    <div>
                        <h4 style="color: #374151; margin-bottom: 0.5rem;">💰 Preis</h4>
                        <p style="font-size: 2rem; font-weight: bold; color: #059669;">
                            CHF ${data.total_price}
                        </p>
                        <p style="color: #6b7280; font-size: 0.875rem;">
                            inkl. MwSt.
                        </p>
                    </div>
                </div>
                
                <div style="background: #fff; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">📊 Preisaufstellung:</h4>
                    <div style="display: grid; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Grundtaxe:</span>
                            <span>CHF ${data.base_fare}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Fahrstrecke (${data.distance} km):</span>
                            <span>CHF ${data.distance_fare}</span>
                        </div>
                        ${data.booking_fee ? `
                        <div style="display: flex; justify-content: space-between;">
                            <span>Buchungsgebühr:</span>
                            <span>CHF ${data.booking_fee}</span>
                        </div>
                        ` : ''}
                        <hr style="margin: 0.5rem 0;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                            <span>Gesamtpreis:</span>
                            <span>CHF ${data.total_price}</span>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-success">
                        💬 WhatsApp Buchung
                    </a>
                    <a href="tel:076 611 31 31" class="btn btn-primary">
                        📞 Anrufen
                    </a>
                    <a href="/buchen" class="btn" style="background: #2563eb; color: #fff;">
                        📅 Online buchen
                    </a>
                </div>
            </div>
        `);
    }

    function generateWhatsAppUrl(data) {
        const message = `Hallo! Ich möchte ein Taxi buchen:

📍 Von: ${data.pickup_location}
📍 Nach: ${data.destination}
📅 Datum: ${data.pickup_date || 'Sofort'}
🕐 Zeit: ${data.pickup_time || 'Sofort'}
👥 Passagiere: ${data.passenger_count}
🚗 Fahrzeug: ${data.vehicle_type}

💰 Geschätzter Preis: CHF ${data.total_price}
📏 Distanz: ${data.distance} km

Können Sie die Fahrt bestätigen? Vielen Dank!`;

        return `https://wa.me/41766113131?text=${encodeURIComponent(message)}`;
    }

    // Booking Form
    function initBookingForm() {
        const bookingForm = $('#booking-form');
        if (bookingForm.length === 0) return;

        bookingForm.on('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                action: 'taxi_booking_form',
                nonce: taxi_ajax.nonce,
                customer_name: $('#customer_name').val(),
                customer_email: $('#customer_email').val(),
                customer_phone: $('#customer_phone').val(),
                pickup_location: $('#pickup_location').val(),
                destination: $('#destination').val(),
                pickup_date: $('#pickup_date').val(),
                pickup_time: $('#pickup_time').val(),
                passenger_count: $('#passenger_count').val(),
                vehicle_type: $('#vehicle_type').val(),
                special_requests: $('#special_requests').val()
            };

            // Show loading
            const submitBtn = bookingForm.find('button[type="submit"]');
            const originalText = submitBtn.text();
            submitBtn.text('Buchung wird gesendet...').prop('disabled', true);

            $.ajax({
                url: taxi_ajax.ajax_url,
                type: 'POST',
                data: formData,
                success: function(response) {
                    if (response.success) {
                        showBookingSuccess(response.data);
                        bookingForm[0].reset();
                    } else {
                        showBookingError(response.data);
                    }
                },
                error: function() {
                    showBookingError('Fehler beim Senden der Buchung. Bitte versuchen Sie es erneut.');
                },
                complete: function() {
                    submitBtn.text(originalText).prop('disabled', false);
                }
            });
        });
    }

    function showBookingSuccess(data) {
        const successDiv = $('<div>').html(`
            <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
                <h3 style="color: #065f46; margin-bottom: 1rem;">
                    ✅ Buchung erfolgreich gesendet!
                </h3>
                <p style="margin-bottom: 1rem;">
                    Vielen Dank für Ihre Buchung! Wir haben Ihre Anfrage erhalten und werden Sie in Kürze kontaktieren.
                </p>
                <div style="background: #fff; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Buchungs-ID:</strong> ${data.booking_id}</p>
                </div>
                <p style="font-size: 0.875rem; color: #6b7280;">
                    Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
                </p>
            </div>
        `);
        
        $('#booking-form').after(successDiv);
        $('html, body').animate({
            scrollTop: successDiv.offset().top - 100
        }, 500);
    }

    function showBookingError(message) {
        const errorDiv = $('<div>').html(`
            <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
                <h3 style="color: #dc2626; margin-bottom: 1rem;">
                    ❌ Fehler bei der Buchung
                </h3>
                <p>${message}</p>
                <p style="margin-top: 1rem;">
                    Bitte rufen Sie uns direkt an: <a href="tel:076 611 31 31" style="color: #10b981; font-weight: bold;">076 611 31 31</a>
                </p>
            </div>
        `);
        
        $('#booking-form').after(errorDiv);
        setTimeout(() => errorDiv.fadeOut(), 5000);
    }

    // Contact Form
    function initContactForm() {
        const contactForm = $('#contact-form');
        if (contactForm.length === 0) return;

        contactForm.on('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                action: 'taxi_contact_form',
                nonce: taxi_ajax.nonce,
                name: $('#contact_name').val(),
                email: $('#contact_email').val(),
                phone: $('#contact_phone').val(),
                message: $('#contact_message').val()
            };

            // Show loading
            const submitBtn = contactForm.find('button[type="submit"]');
            const originalText = submitBtn.text();
            submitBtn.text('Nachricht wird gesendet...').prop('disabled', true);

            $.ajax({
                url: taxi_ajax.ajax_url,
                type: 'POST',
                data: formData,
                success: function(response) {
                    if (response.success) {
                        showContactSuccess();
                        contactForm[0].reset();
                    } else {
                        showContactError(response.data);
                    }
                },
                error: function() {
                    showContactError('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
                },
                complete: function() {
                    submitBtn.text(originalText).prop('disabled', false);
                }
            });
        });
    }

    function showContactSuccess() {
        const successDiv = $('<div>').html(`
            <div style="background: #f0fdf4; border: 2px solid #10b981; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
                <h3 style="color: #065f46; margin-bottom: 1rem;">
                    ✅ Nachricht erfolgreich gesendet!
                </h3>
                <p>Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.</p>
            </div>
        `);
        
        $('#contact-form').after(successDiv);
        setTimeout(() => successDiv.fadeOut(), 5000);
    }

    function showContactError(message) {
        const errorDiv = $('<div>').html(`
            <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
                <h3 style="color: #dc2626; margin-bottom: 1rem;">
                    ❌ Fehler beim Senden
                </h3>
                <p>${message}</p>
            </div>
        `);
        
        $('#contact-form').after(errorDiv);
        setTimeout(() => errorDiv.fadeOut(), 5000);
    }

    // Show/Hide Details functionality
    function initShowHideDetails() {
        $(document).on('click', '#show-details', function() {
            const button = $(this);
            const details = $('#pricing-details');
            
            if (details.hasClass('hidden')) {
                details.removeClass('hidden');
                button.html('⬆️ Weniger anzeigen');
            } else {
                details.addClass('hidden');
                button.html('⬇️ Mehr erfahren');
            }
        });
    }

    // Utility Functions
    function scrollToElement(element) {
        $('html, body').animate({
            scrollTop: element.offset().top - 100
        }, 500);
    }

})(jQuery);