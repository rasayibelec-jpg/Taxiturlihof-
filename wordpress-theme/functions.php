<?php
/**
 * Taxi Türlihof Theme Funktionen
 */

// Theme Setup
function taxi_turlihof_setup() {
    // Theme-Unterstützung hinzufügen
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Navigationsmenüs registrieren
    register_nav_menus(array(
        'primary' => __('Hauptmenü', 'taxi-turlihof'),
        'footer' => __('Footer-Menü', 'taxi-turlihof'),
    ));
    
    // Bildgrößen festlegen
    add_image_size('fleet-gallery', 800, 400, true);
    add_image_size('service-icon', 100, 100, true);
}
add_action('after_setup_theme', 'taxi_turlihof_setup');

// Scripts und Styles einbinden
function taxi_turlihof_scripts() {
    // Hauptstylesheet
    wp_enqueue_style('taxi-turlihof-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom JavaScript
    wp_enqueue_script('taxi-turlihof-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Script für AJAX lokalisieren
    wp_localize_script('taxi-turlihof-script', 'taxi_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('taxi_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'taxi_turlihof_scripts');

// Custom Post Types erstellen
function taxi_turlihof_custom_post_types() {
    // Flottengalerie
    register_post_type('fleet', array(
        'labels' => array(
            'name' => 'Flottengalerie',
            'singular_name' => 'Fahrzeug',
            'add_new' => 'Neues Fahrzeug hinzufügen',
            'add_new_item' => 'Neues Fahrzeug hinzufügen',
            'edit_item' => 'Fahrzeug bearbeiten',
            'new_item' => 'Neues Fahrzeug',
            'view_item' => 'Fahrzeug anzeigen',
            'search_items' => 'Fahrzeuge suchen',
            'not_found' => 'Keine Fahrzeuge gefunden',
            'not_found_in_trash' => 'Keine Fahrzeuge im Papierkorb gefunden'
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-car',
        'rewrite' => array('slug' => 'flotte')
    ));
    
    // Buchungen
    register_post_type('booking', array(
        'labels' => array(
            'name' => 'Buchungen',
            'singular_name' => 'Buchung',
            'add_new' => 'Neue Buchung hinzufügen',
            'add_new_item' => 'Neue Buchung hinzufügen',
            'edit_item' => 'Buchung bearbeiten',
            'new_item' => 'Neue Buchung',
            'view_item' => 'Buchung anzeigen',
            'search_items' => 'Buchungen suchen',
            'not_found' => 'Keine Buchungen gefunden',
            'not_found_in_trash' => 'Keine Buchungen im Papierkorb gefunden'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title'),
        'menu_icon' => 'dashicons-calendar-alt',
        'capability_type' => 'post',
        'capabilities' => array(
            'create_posts' => 'do_not_allow'
        ),
        'map_meta_cap' => true
    ));
    
    // Kontaktanfragen
    register_post_type('contact', array(
        'labels' => array(
            'name' => 'Kontaktanfragen',
            'singular_name' => 'Kontaktanfrage',
            'view_item' => 'Nachricht anzeigen',
            'search_items' => 'Nachrichten suchen',
            'not_found' => 'Keine Nachrichten gefunden',
            'not_found_in_trash' => 'Keine Nachrichten im Papierkorb gefunden'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title'),
        'menu_icon' => 'dashicons-email-alt',
        'capability_type' => 'post',
        'capabilities' => array(
            'create_posts' => 'do_not_allow'
        ),
        'map_meta_cap' => true
    ));
}
add_action('init', 'taxi_turlihof_custom_post_types');

// Custom Meta Boxes hinzufügen
function taxi_turlihof_meta_boxes() {
    // Flottengalerie Meta Box
    add_meta_box(
        'fleet_details',
        'Fahrzeugdetails',
        'taxi_turlihof_fleet_meta_box_callback',
        'fleet',
        'normal',
        'high'
    );
    
    // Buchungs Meta Box
    add_meta_box(
        'booking_details',
        'Buchungsdetails',
        'taxi_turlihof_booking_meta_box_callback',
        'booking',
        'normal',
        'high'
    );
    
    // Kontakt Meta Box
    add_meta_box(
        'contact_details',
        'Kontaktdetails',
        'taxi_turlihof_contact_meta_box_callback',
        'contact',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'taxi_turlihof_meta_boxes');

// Flotten Meta Box Callback
function taxi_turlihof_fleet_meta_box_callback($post) {
    wp_nonce_field('taxi_turlihof_fleet_nonce', 'taxi_turlihof_fleet_nonce_field');
    
    $description = get_post_meta($post->ID, '_fleet_description', true);
    $vehicle_type = get_post_meta($post->ID, '_fleet_vehicle_type', true);
    $capacity = get_post_meta($post->ID, '_fleet_capacity', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="fleet_description">Beschreibung</label></th>';
    echo '<td><textarea id="fleet_description" name="fleet_description" rows="3" style="width:100%;">' . esc_textarea($description) . '</textarea></td></tr>';
    
    echo '<tr><th><label for="fleet_vehicle_type">Fahrzeugtyp</label></th>';
    echo '<td><select id="fleet_vehicle_type" name="fleet_vehicle_type">';
    echo '<option value="standard"' . selected($vehicle_type, 'standard', false) . '>Standard (C/E-Klasse)</option>';
    echo '<option value="premium"' . selected($vehicle_type, 'premium', false) . '>Premium (S-Klasse)</option>';
    echo '<option value="van"' . selected($vehicle_type, 'van', false) . '>Van (V-Klasse)</option>';
    echo '</select></td></tr>';
    
    echo '<tr><th><label for="fleet_capacity">Passagierkapazität</label></th>';
    echo '<td><input type="number" id="fleet_capacity" name="fleet_capacity" value="' . esc_attr($capacity) . '" min="1" max="8" /></td></tr>';
    echo '</table>';
}

// Buchungs Meta Box Callback
function taxi_turlihof_booking_meta_box_callback($post) {
    wp_nonce_field('taxi_turlihof_booking_nonce', 'taxi_turlihof_booking_nonce_field');
    
    $customer_name = get_post_meta($post->ID, '_booking_customer_name', true);
    $customer_email = get_post_meta($post->ID, '_booking_customer_email', true);
    $customer_phone = get_post_meta($post->ID, '_booking_customer_phone', true);
    $pickup_location = get_post_meta($post->ID, '_booking_pickup_location', true);
    $destination = get_post_meta($post->ID, '_booking_destination', true);
    $pickup_date = get_post_meta($post->ID, '_booking_pickup_date', true);
    $pickup_time = get_post_meta($post->ID, '_booking_pickup_time', true);
    $passenger_count = get_post_meta($post->ID, '_booking_passenger_count', true);
    $vehicle_type = get_post_meta($post->ID, '_booking_vehicle_type', true);
    $special_requests = get_post_meta($post->ID, '_booking_special_requests', true);
    $status = get_post_meta($post->ID, '_booking_status', true);
    
    echo '<table class="form-table">';
    echo '<tr><th>Kundenname</th><td>' . esc_html($customer_name) . '</td></tr>';
    echo '<tr><th>E-Mail</th><td><a href="mailto:' . esc_attr($customer_email) . '">' . esc_html($customer_email) . '</a></td></tr>';
    echo '<tr><th>Telefon</th><td><a href="tel:' . esc_attr($customer_phone) . '">' . esc_html($customer_phone) . '</a></td></tr>';
    echo '<tr><th>Abholort</th><td>' . esc_html($pickup_location) . '</td></tr>';
    echo '<tr><th>Zielort</th><td>' . esc_html($destination) . '</td></tr>';
    echo '<tr><th>Datum & Uhrzeit</th><td>' . esc_html($pickup_date) . ' um ' . esc_html($pickup_time) . '</td></tr>';
    echo '<tr><th>Passagiere</th><td>' . esc_html($passenger_count) . '</td></tr>';
    echo '<tr><th>Fahrzeugtyp</th><td>' . esc_html($vehicle_type) . '</td></tr>';
    echo '<tr><th>Sonderwünsche</th><td>' . esc_html($special_requests) . '</td></tr>';
    
    echo '<tr><th><label for="booking_status">Status</label></th>';
    echo '<td><select id="booking_status" name="booking_status">';
    echo '<option value="pending"' . selected($status, 'pending', false) . '>Ausstehend</option>';
    echo '<option value="confirmed"' . selected($status, 'confirmed', false) . '>Bestätigt</option>';
    echo '<option value="completed"' . selected($status, 'completed', false) . '>Abgeschlossen</option>';
    echo '<option value="cancelled"' . selected($status, 'cancelled', false) . '>Storniert</option>';
    echo '</select></td></tr>';
    echo '</table>';
}

// Kontakt Meta Box Callback
function taxi_turlihof_contact_meta_box_callback($post) {
    $name = get_post_meta($post->ID, '_contact_name', true);
    $email = get_post_meta($post->ID, '_contact_email', true);
    $phone = get_post_meta($post->ID, '_contact_phone', true);
    $message = get_post_meta($post->ID, '_contact_message', true);
    
    echo '<table class="form-table">';
    echo '<tr><th>Name</th><td>' . esc_html($name) . '</td></tr>';
    echo '<tr><th>E-Mail</th><td><a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a></td></tr>';
    echo '<tr><th>Telefon</th><td><a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a></td></tr>';
    echo '<tr><th>Nachricht</th><td>' . wp_kses_post($message) . '</td></tr>';
    echo '</table>';
}

// Meta Box Daten speichern
function taxi_turlihof_save_meta_boxes($post_id) {
    // Flotten Meta Box
    if (isset($_POST['taxi_turlihof_fleet_nonce_field']) && wp_verify_nonce($_POST['taxi_turlihof_fleet_nonce_field'], 'taxi_turlihof_fleet_nonce')) {
        if (isset($_POST['fleet_description'])) {
            update_post_meta($post_id, '_fleet_description', sanitize_textarea_field($_POST['fleet_description']));
        }
        if (isset($_POST['fleet_vehicle_type'])) {
            update_post_meta($post_id, '_fleet_vehicle_type', sanitize_text_field($_POST['fleet_vehicle_type']));
        }
        if (isset($_POST['fleet_capacity'])) {
            update_post_meta($post_id, '_fleet_capacity', intval($_POST['fleet_capacity']));
        }
    }
    
    // Buchungs Meta Box
    if (isset($_POST['taxi_turlihof_booking_nonce_field']) && wp_verify_nonce($_POST['taxi_turlihof_booking_nonce_field'], 'taxi_turlihof_booking_nonce')) {
        if (isset($_POST['booking_status'])) {
            update_post_meta($post_id, '_booking_status', sanitize_text_field($_POST['booking_status']));
        }
    }
}
add_action('save_post', 'taxi_turlihof_save_meta_boxes');

// AJAX Handler für Kontaktformular
function taxi_turlihof_handle_contact_form() {
    check_ajax_referer('taxi_nonce', 'nonce');
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Kontakt-Post erstellen
    $contact_id = wp_insert_post(array(
        'post_title' => 'Kontakt von ' . $name,
        'post_type' => 'contact',
        'post_status' => 'publish',
        'meta_input' => array(
            '_contact_name' => $name,
            '_contact_email' => $email,
            '_contact_phone' => $phone,
            '_contact_message' => $message
        )
    ));
    
    if ($contact_id) {
        // E-Mail-Benachrichtigung senden
        $admin_email = get_option('admin_email');
        $subject = 'Neue Kontaktanfrage - Taxi Türlihof';
        $email_message = "Neue Kontaktanfrage:\n\n";
        $email_message .= "Name: " . $name . "\n";
        $email_message .= "E-Mail: " . $email . "\n";
        $email_message .= "Telefon: " . $phone . "\n";
        $email_message .= "Nachricht: " . $message . "\n";
        
        wp_mail($admin_email, $subject, $email_message);
        
        wp_send_json_success('Nachricht erfolgreich gesendet!');
    } else {
        wp_send_json_error('Fehler beim Senden der Nachricht.');
    }
}
add_action('wp_ajax_taxi_contact_form', 'taxi_turlihof_handle_contact_form');
add_action('wp_ajax_nopriv_taxi_contact_form', 'taxi_turlihof_handle_contact_form');

// AJAX Handler für Buchungsformular
function taxi_turlihof_handle_booking_form() {
    check_ajax_referer('taxi_nonce', 'nonce');
    
    $customer_name = sanitize_text_field($_POST['customer_name']);
    $customer_email = sanitize_email($_POST['customer_email']);
    $customer_phone = sanitize_text_field($_POST['customer_phone']);
    $pickup_location = sanitize_text_field($_POST['pickup_location']);
    $destination = sanitize_text_field($_POST['destination']);
    $pickup_date = sanitize_text_field($_POST['pickup_date']);
    $pickup_time = sanitize_text_field($_POST['pickup_time']);
    $passenger_count = intval($_POST['passenger_count']);
    $vehicle_type = sanitize_text_field($_POST['vehicle_type']);
    $special_requests = sanitize_textarea_field($_POST['special_requests']);
    
    // Buchungs-Post erstellen
    $booking_id = wp_insert_post(array(
        'post_title' => 'Buchung von ' . $customer_name . ' - ' . $pickup_date,
        'post_type' => 'booking',
        'post_status' => 'publish',
        'meta_input' => array(
            '_booking_customer_name' => $customer_name,
            '_booking_customer_email' => $customer_email,
            '_booking_customer_phone' => $customer_phone,
            '_booking_pickup_location' => $pickup_location,
            '_booking_destination' => $destination,
            '_booking_pickup_date' => $pickup_date,
            '_booking_pickup_time' => $pickup_time,
            '_booking_passenger_count' => $passenger_count,
            '_booking_vehicle_type' => $vehicle_type,
            '_booking_special_requests' => $special_requests,
            '_booking_status' => 'pending'
        )
    ));
    
    if ($booking_id) {
        // Bestätigungs-E-Mails senden
        $admin_email = get_option('admin_email');
        
        // E-Mail an Kunden
        $customer_subject = 'Buchungsbestätigung - Taxi Türlihof';
        $customer_message = "Liebe/r " . $customer_name . ",\n\n";
        $customer_message .= "vielen Dank für Ihre Buchung! Hier sind die Details:\n\n";
        $customer_message .= "Buchungs-ID: " . $booking_id . "\n";
        $customer_message .= "Abholung: " . $pickup_location . "\n";
        $customer_message .= "Ziel: " . $destination . "\n";
        $customer_message .= "Datum: " . $pickup_date . "\n";
        $customer_message .= "Uhrzeit: " . $pickup_time . "\n";
        $customer_message .= "Passagiere: " . $passenger_count . "\n";
        $customer_message .= "Fahrzeug: " . $vehicle_type . "\n\n";
        $customer_message .= "Wir werden Ihre Buchung in Kürze bestätigen.\n\n";
        $customer_message .= "Mit freundlichen Grüßen,\nTaxi Türlihof Team\n076 611 31 31";
        
        wp_mail($customer_email, $customer_subject, $customer_message);
        
        // E-Mail an Admin
        $admin_subject = 'Neue Buchung - Taxi Türlihof';
        $admin_message = "Neue Buchung erhalten:\n\n";
        $admin_message .= "Kunde: " . $customer_name . "\n";
        $admin_message .= "E-Mail: " . $customer_email . "\n";
        $admin_message .= "Telefon: " . $customer_phone . "\n";
        $admin_message .= "Abholung: " . $pickup_location . "\n";
        $admin_message .= "Ziel: " . $destination . "\n";
        $admin_message .= "Datum: " . $pickup_date . "\n";
        $admin_message .= "Uhrzeit: " . $pickup_time . "\n";
        $admin_message .= "Passagiere: " . $passenger_count . "\n";
        $admin_message .= "Fahrzeug: " . $vehicle_type . "\n";
        $admin_message .= "Sonderwünsche: " . $special_requests . "\n";
        
        wp_mail($admin_email, $admin_subject, $admin_message);
        
        wp_send_json_success(array(
            'message' => 'Buchung erfolgreich eingereicht!',
            'booking_id' => $booking_id
        ));
    } else {
        wp_send_json_error('Fehler beim Einreichen der Buchung.');
    }
}
add_action('wp_ajax_taxi_booking_form', 'taxi_turlihof_handle_booking_form');
add_action('wp_ajax_nopriv_taxi_booking_form', 'taxi_turlihof_handle_booking_form');

// AJAX Handler für Preisrechner - Verbindung zum React Backend
function taxi_turlihof_handle_price_calculator() {
    check_ajax_referer('taxi_nonce', 'nonce');
    
    $pickup_location = sanitize_text_field($_POST['pickup_location']);
    $destination = sanitize_text_field($_POST['destination']);
    $pickup_date = sanitize_text_field($_POST['pickup_date']);
    $pickup_time = sanitize_text_field($_POST['pickup_time']);
    $passenger_count = intval($_POST['passenger_count']);
    $vehicle_type = sanitize_text_field($_POST['vehicle_type']);
    
    // Backend URL aus WordPress-Optionen holen oder Standard verwenden
    $backend_url = get_option('taxi_backend_url', 'http://localhost:8001');
    
    // Daten für React Backend API vorbereiten
    $api_data = array(
        'pickup_location' => $pickup_location,
        'destination' => $destination,
        'pickup_date' => $pickup_date ? $pickup_date : date('Y-m-d'),
        'pickup_time' => $pickup_time ? $pickup_time : date('H:i'),
        'passenger_count' => $passenger_count,
        'vehicle_type' => $vehicle_type
    );
    
    // API-Aufruf an React Backend
    $response = wp_remote_post($backend_url . '/api/calculate-price', array(
        'method' => 'POST',
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'body' => json_encode($api_data),
        'timeout' => 30
    ));
    
    if (is_wp_error($response)) {
        wp_send_json_error('Verbindungsfehler. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: 076 611 31 31.');
        return;
    }
    
    $response_code = wp_remote_retrieve_response_code($response);
    $response_body = wp_remote_retrieve_body($response);
    
    if ($response_code !== 200) {
        wp_send_json_error('Berechnungsservice vorübergehend nicht verfügbar. Bitte rufen Sie uns für ein Angebot an: 076 611 31 31.');
        return;
    }
    
    $data = json_decode($response_body, true);
    
    if (!$data || isset($data['error'])) {
        wp_send_json_error('Preis für diese Route kann nicht berechnet werden. Bitte rufen Sie uns an: 076 611 31 31.');
        return;
    }
    
    // Preisberechnungsdaten zurückgeben
    wp_send_json_success($data);
}
add_action('wp_ajax_taxi_calculate_price', 'taxi_turlihof_handle_price_calculator');
add_action('wp_ajax_nopriv_taxi_calculate_price', 'taxi_turlihof_handle_price_calculator');

// Flottenbilder für Galerie holen
function taxi_turlihof_get_fleet_images() {
    $fleet_posts = get_posts(array(
        'post_type' => 'fleet',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ));
    
    $images = array();
    foreach ($fleet_posts as $post) {
        $image_url = get_the_post_thumbnail_url($post->ID, 'fleet-gallery');
        if ($image_url) {
            $images[] = array(
                'url' => $image_url,
                'title' => get_the_title($post->ID),
                'description' => get_post_meta($post->ID, '_fleet_description', true),
                'vehicle_type' => get_post_meta($post->ID, '_fleet_vehicle_type', true),
                'capacity' => get_post_meta($post->ID, '_fleet_capacity', true)
            );
        }
    }
    
    // Wenn keine benutzerdefinierten Flottenbilder vorhanden, Standard-Fallback zurückgeben
    if (empty($images)) {
        $images = array(
            array(
                'url' => 'https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/7exvefg3_IMG-20250908-WA0001.jpg',
                'title' => 'Mercedes V-Klasse Van',
                'description' => 'Geräumig für Familien und Gruppen bis 8 Personen',
                'vehicle_type' => 'van',
                'capacity' => '8'
            ),
            array(
                'url' => 'https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/o32qjjzx_IMG-20250908-WA0002.jpg',
                'title' => 'Mercedes V-Klasse Premium',
                'description' => 'Höchster Komfort für Gruppenfahrten und Flughafentransfers',
                'vehicle_type' => 'premium',
                'capacity' => '7'
            ),
            array(
                'url' => 'https://customer-assets.emergentagent.com/job_swiss-taxi-portal/artifacts/xkyxwgjm_IMG-20250908-WA0000.jpg',
                'title' => 'Mercedes Taxi bei Nacht',
                'description' => '24/7 Service - auch nachts zuverlässig unterwegs',
                'vehicle_type' => 'standard',
                'capacity' => '4'
            )
        );
    }
    
    return $images;
}

// Admin Dashboard Widget für aktuelle Buchungen
function taxi_turlihof_dashboard_widgets() {
    wp_add_dashboard_widget(
        'taxi_recent_bookings',
        'Aktuelle Taxi-Buchungen',
        'taxi_turlihof_recent_bookings_widget'
    );
}
add_action('wp_dashboard_setup', 'taxi_turlihof_dashboard_widgets');

function taxi_turlihof_recent_bookings_widget() {
    $bookings = get_posts(array(
        'post_type' => 'booking',
        'posts_per_page' => 5,
        'meta_query' => array(
            array(
                'key' => '_booking_status',
                'value' => 'pending',
                'compare' => '='
            )
        )
    ));
    
    if ($bookings) {
        echo '<ul>';
        foreach ($bookings as $booking) {
            $customer_name = get_post_meta($booking->ID, '_booking_customer_name', true);
            $pickup_date = get_post_meta($booking->ID, '_booking_pickup_date', true);
            $pickup_location = get_post_meta($booking->ID, '_booking_pickup_location', true);
            
            echo '<li>';
            echo '<strong>' . esc_html($customer_name) . '</strong> - ';
            echo esc_html($pickup_date) . ' ab ' . esc_html($pickup_location);
            echo ' <a href="' . get_edit_post_link($booking->ID) . '">(Bearbeiten)</a>';
            echo '</li>';
        }
        echo '</ul>';
    } else {
        echo '<p>Keine ausstehenden Buchungen.</p>';
    }
}

// Theme Customizer
function taxi_turlihof_customize_register($wp_customize) {
    // Firmeninformationen Sektion
    $wp_customize->add_section('taxi_company_info', array(
        'title' => __('Firmeninformationen'),
        'priority' => 30,
    ));
    
    // Telefonnummer
    $wp_customize->add_setting('taxi_phone', array(
        'default' => '076 611 31 31',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('taxi_phone', array(
        'label' => __('Telefonnummer'),
        'section' => 'taxi_company_info',
        'type' => 'text',
    ));
    
    // E-Mail-Adresse
    $wp_customize->add_setting('taxi_email', array(
        'default' => 'info@taxiturlihof.ch',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('taxi_email', array(
        'label' => __('E-Mail-Adresse'),
        'section' => 'taxi_company_info',
        'type' => 'email',
    ));
    
    // WhatsApp-Nummer
    $wp_customize->add_setting('taxi_whatsapp', array(
        'default' => '41766113131',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('taxi_whatsapp', array(
        'label' => __('WhatsApp-Nummer (mit Ländercode)'),
        'section' => 'taxi_company_info',
        'type' => 'text',
    ));
    
    // Backend URL Einstellung
    $wp_customize->add_setting('taxi_backend_url', array(
        'default' => 'http://localhost:8001',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('taxi_backend_url', array(
        'label' => __('Backend API URL (für Preisrechner)'),
        'section' => 'taxi_company_info',
        'type' => 'url',
        'description' => __('URL des Backend API Servers für Preisberechnungen')
    ));
}
add_action('customize_register', 'taxi_turlihof_customize_register');

// Hilfsfunktion zum Abrufen von Customizer-Werten
function taxi_get_option($option, $default = '') {
    return get_theme_mod($option, $default);
}

// Admin-Menü für Theme-Einstellungen hinzufügen
function taxi_turlihof_admin_menu() {
    add_theme_page(
        'Taxi Türlihof Einstellungen',
        'Taxi Einstellungen',
        'manage_options',
        'taxi-settings',
        'taxi_turlihof_settings_page'
    );
}
add_action('admin_menu', 'taxi_turlihof_admin_menu');

function taxi_turlihof_settings_page() {
    ?>
    <div class="wrap">
        <h1>Taxi Türlihof Theme Einstellungen</h1>
        <div class="card" style="max-width: 800px;">
            <h2>✅ React Entegrasyon Tamamlandı!</h2>
            <p><strong>React build işlemi başarılı!</strong> Artık React uygulamanız WordPress'te çalışıyor.</p>
            
            <h3>Kurulum Adımları</h3>
            <ol>
                <li><strong>✅ React Build:</strong> Başarıyla tamamlandı</li>
                <li><strong>✅ Static Dosyalar:</strong> WordPress temasına kopyalandı</li>
                <li><strong>✅ React Sayfa Şablonu:</strong> page-react.php oluşturuldu</li>
                <li><strong>🔧 Manuel Adım:</strong> Yeni sayfa oluşturun ve "React Taxi App" şablonunu seçin</li>
            </ol>
            
            <h3>React Sayfa Oluşturma</h3>
            <p>
                <a href="<?php echo admin_url('post-new.php?post_type=page'); ?>" class="button button-primary">Yeni Sayfa Oluştur</a>
                <span style="margin-left: 10px;">→ Sayfa şablonu: "React Taxi App" seçin</span>
            </p>
            
            <h3>Mevcut Özellikler</h3>
            <ul>
                <li>✅ React App build edildi (main.040f0c1e.js)</li>
                <li>✅ CSS dosyaları hazır (main.3622ae45.css)</li>
                <li>✅ WordPress entegrasyonu tamamlandı</li>
                <li>✅ Tüm React bileşenleri çalışır durumda</li>
            </ul>
            
            <h3>Hızlı Linkler</h3>
            <p>
                <a href="<?php echo admin_url('edit.php?post_type=fleet'); ?>" class="button">Flottengalerie verwalten</a>
                <a href="<?php echo admin_url('edit.php?post_type=booking'); ?>" class="button">Buchungen anzeigen</a>
                <a href="<?php echo admin_url('edit.php?post_type=contact'); ?>" class="button">Nachrichten anzeigen</a>
                <a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary">Theme anpassen</a>
            </p>
            
            <h3>React vs WordPress Seçenekleri</h3>
            <div style="background: #f0f6fc; padding: 15px; border-left: 4px solid #0073aa;">
                <p><strong>🎯 İki seçeneğiniz var:</strong></p>
                <ul>
                    <li><strong>React Sayfa:</strong> Tüm özellikler React ile (dinamik, modern)</li>
                    <li><strong>WordPress Sayfaları:</strong> Klasik WordPress yönetimi (kolay düzenleme)</li>
                </ul>
                <p>Her ikisini birden kullanabilirsiniz!</p>
            </div>
        </div>
    </div>
    <?php
}

// Custom Admin CSS hinzufügen
function taxi_turlihof_admin_styles() {
    echo '<style>
        .post-type-booking .column-title { width: 25%; }
        .post-type-contact .column-title { width: 30%; }
        .post-type-fleet .column-title { width: 20%; }
    </style>';
}
add_action('admin_head', 'taxi_turlihof_admin_styles');

?>