// Taxi Türlihof Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Booking form handler
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingForm);
    }

    // Price calculator handler
    const calculatorForm = document.getElementById('price-calculator-form');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', handlePriceCalculator);
    }

    // Initialize fleet gallery if present
    initializeFleetGallery();
    
    // Initialize testimonials carousel if present
    initializeTestimonialsCarousel();
    
    // Add scroll-to-top functionality
    addScrollToTop();
    
    // Initialize FAQ accordions
    initializeFAQ();
    
    // Handle service details toggle
    initializeServiceDetails();
});

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Add WordPress AJAX action and nonce
    formData.append('action', 'taxi_contact_form');
    formData.append('nonce', taxi_ajax.nonce);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    
    // Send AJAX request
    fetch(taxi_ajax.ajax_url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('✅ Nachricht gesendet! Wir melden uns schnellstmöglich bei Ihnen.', 'success');
            form.reset();
        } else {
            showMessage('❌ Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('❌ Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'error');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Booking Form Handler
function handleBookingForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    const requiredFields = ['customer_name', 'customer_email', 'customer_phone', 'pickup_location', 'destination', 'pickup_date', 'pickup_time'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            showMessage('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }
    }
    
    // Add WordPress AJAX action and nonce
    formData.append('action', 'taxi_booking_form');
    formData.append('nonce', taxi_ajax.nonce);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    
    // Send AJAX request
    fetch(taxi_ajax.ajax_url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(`✅ Buchung erfolgreich! Buchungsnummer: ${data.data.booking_id.toString().slice(0, 8)}`, 'success');
            form.style.display = 'none';
            document.getElementById('booking-success').style.display = 'block';
            
            // Show review request after 3 seconds
            setTimeout(() => {
                showMessage('⭐ Wie war unser Service? Helfen Sie anderen Kunden mit einer ehrlichen Bewertung!', 'info');
            }, 3000);
        } else {
            showMessage('❌ Fehler bei der Buchung. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('❌ Fehler bei der Buchung. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'error');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Price Calculator Handler
function handlePriceCalculator(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const pickup = formData.get('pickup_location');
    const destination = formData.get('destination');
    const vehicleType = formData.get('vehicle_type');
    
    if (!pickup || !destination) {
        showMessage('Bitte geben Sie Start- und Zielpunkt ein.', 'error');
        return;
    }
    
    // Simple distance estimation (in production, use Google Maps API)
    const estimatedDistance = calculateDistance(pickup, destination);
    
    let pricePerKm, vehicleName;
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
        default:
            pricePerKm = 4.20;
            vehicleName = 'Standard (Mercedes C/E-Klasse)';
    }
    
    const grundtaxe = 6.60;
    const totalDistance = estimatedDistance * pricePerKm;
    const totalPrice = grundtaxe + totalDistance;
    
    displayPriceResults(pickup, destination, estimatedDistance, vehicleName, pricePerKm, grundtaxe, totalDistance, totalPrice);
}

// Calculate distance estimation
function calculateDistance(pickup, destination) {
    // Simple keyword-based distance estimation
    const airportKeywords = ['flughafen', 'airport', 'zürich', 'basel'];
    const localKeywords = ['luzern', 'schwyz', 'zug', 'weggis', 'vitznau', 'brunnen'];
    
    const pickupLower = pickup.toLowerCase();
    const destLower = destination.toLowerCase();
    
    const isPickupAirport = airportKeywords.some(keyword => pickupLower.includes(keyword));
    const isDestAirport = airportKeywords.some(keyword => destLower.includes(keyword));
    const isPickupLocal = localKeywords.some(keyword => pickupLower.includes(keyword));
    const isDestLocal = localKeywords.some(keyword => destLower.includes(keyword));
    
    if ((isPickupAirport && isDestLocal) || (isPickupLocal && isDestAirport)) {
        return Math.floor(Math.random() * 20) + 50; // 50-70 km for airport transfers
    } else if (isPickupLocal && isDestLocal) {
        return Math.floor(Math.random() * 30) + 5; // 5-35 km for local trips
    } else {
        return Math.floor(Math.random() * 40) + 15; // 15-55 km for other trips
    }
}

// Display price calculation results
function displayPriceResults(pickup, destination, distance, vehicleName, pricePerKm, grundtaxe, totalDistance, totalPrice) {
    const resultsDiv = document.getElementById('price-results');
    const breakdownDiv = document.getElementById('price-breakdown');
    
    if (!resultsDiv || !breakdownDiv) return;
    
    breakdownDiv.innerHTML = `
        <div style="display: grid; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fff; border-radius: 8px;">
                <span><strong>Route:</strong> ${pickup} → ${destination}</span>
                <span style="color: #6b7280;">ca. ${distance} km</span>
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
                <span>Distanz (${distance} km × CHF ${pricePerKm})</span>
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
}

// Initialize Fleet Gallery
function initializeFleetGallery() {
    // This will be handled by individual page scripts
}

// Initialize Testimonials Carousel
function initializeTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Initialize
    showSlide(0);
    
    // Auto-advance
    setInterval(nextSlide, 5000);
    
    // Add navigation buttons if they exist
    const nextBtn = carousel.querySelector('.next-btn');
    const prevBtn = carousel.querySelector('.prev-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
}

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #1f2937;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize FAQ Accordions
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                    }
                });
                
                // Toggle current item
                answer.style.display = isOpen ? 'none' : 'block';
            });
        }
    });
}

// Initialize Service Details Toggle
function initializeServiceDetails() {
    const toggleBtn = document.getElementById('show-details');
    const detailsSection = document.getElementById('pricing-details');
    
    if (toggleBtn && detailsSection) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = detailsSection.classList.contains('hidden');
            
            if (isHidden) {
                detailsSection.classList.remove('hidden');
                toggleBtn.innerHTML = '⬆️ Weniger anzeigen';
            } else {
                detailsSection.classList.add('hidden');
                toggleBtn.innerHTML = '⬇️ Mehr erfahren';
            }
        });
    }
}

// Show message notifications
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    if (!document.getElementById('message-styles')) {
        const styles = document.createElement('style');
        styles.id = 'message-styles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
    
    // Allow manual dismissal
    messageDiv.addEventListener('click', () => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    });
}

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}