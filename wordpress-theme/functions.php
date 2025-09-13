<?php
/**
 * Taxi Türlihof Theme Functions
 */

// Theme Setup
function taxi_turlihof_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'taxi-turlihof'),
        'footer' => __('Footer Menu', 'taxi-turlihof'),
    ));
    
    // Set image sizes
    add_image_size('fleet-gallery', 800, 400, true);
    add_image_size('service-icon', 100, 100, true);
}
add_action('after_setup_theme', 'taxi_turlihof_setup');

// Enqueue Scripts and Styles
function taxi_turlihof_scripts() {
    // Main stylesheet
    wp_enqueue_style('taxi-turlihof-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Custom JavaScript
    wp_enqueue_script('taxi-turlihof-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('taxi-turlihof-script', 'taxi_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('taxi_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'taxi_turlihof_scripts');

// Create Custom Post Types
function taxi_turlihof_custom_post_types() {
    // Fleet Gallery
    register_post_type('fleet', array(
        'labels' => array(
            'name' => 'Fleet Gallery',
            'singular_name' => 'Fleet Image',
            'add_new' => 'Add New Image',
            'add_new_item' => 'Add New Fleet Image',
            'edit_item' => 'Edit Fleet Image',
            'new_item' => 'New Fleet Image',
            'view_item' => 'View Fleet Image',
            'search_items' => 'Search Fleet Images',
            'not_found' => 'No fleet images found',
            'not_found_in_trash' => 'No fleet images found in trash'
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-car',
        'rewrite' => array('slug' => 'fleet')
    ));
    
    // Bookings
    register_post_type('booking', array(
        'labels' => array(
            'name' => 'Bookings',
            'singular_name' => 'Booking',
            'add_new' => 'Add New Booking',
            'add_new_item' => 'Add New Booking',
            'edit_item' => 'Edit Booking',
            'new_item' => 'New Booking',
            'view_item' => 'View Booking',
            'search_items' => 'Search Bookings',
            'not_found' => 'No bookings found',
            'not_found_in_trash' => 'No bookings found in trash'
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
    
    // Contacts
    register_post_type('contact', array(
        'labels' => array(
            'name' => 'Contact Messages',
            'singular_name' => 'Contact Message',
            'view_item' => 'View Message',
            'search_items' => 'Search Messages',
            'not_found' => 'No messages found',
            'not_found_in_trash' => 'No messages found in trash'
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

// Add Custom Meta Boxes
function taxi_turlihof_meta_boxes() {
    // Fleet Gallery Meta Box
    add_meta_box(
        'fleet_details',
        'Fleet Details',
        'taxi_turlihof_fleet_meta_box_callback',
        'fleet',
        'normal',
        'high'
    );
    
    // Booking Meta Box
    add_meta_box(
        'booking_details',
        'Booking Details',
        'taxi_turlihof_booking_meta_box_callback',
        'booking',
        'normal',
        'high'
    );
    
    // Contact Meta Box
    add_meta_box(
        'contact_details',
        'Contact Details',
        'taxi_turlihof_contact_meta_box_callback',
        'contact',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'taxi_turlihof_meta_boxes');

// Fleet Meta Box Callback
function taxi_turlihof_fleet_meta_box_callback($post) {
    wp_nonce_field('taxi_turlihof_fleet_nonce', 'taxi_turlihof_fleet_nonce_field');
    
    $description = get_post_meta($post->ID, '_fleet_description', true);
    $vehicle_type = get_post_meta($post->ID, '_fleet_vehicle_type', true);
    $capacity = get_post_meta($post->ID, '_fleet_capacity', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="fleet_description">Description</label></th>';
    echo '<td><textarea id="fleet_description" name="fleet_description" rows="3" style="width:100%;">' . esc_textarea($description) . '</textarea></td></tr>';
    
    echo '<tr><th><label for="fleet_vehicle_type">Vehicle Type</label></th>';
    echo '<td><select id="fleet_vehicle_type" name="fleet_vehicle_type">';
    echo '<option value="standard"' . selected($vehicle_type, 'standard', false) . '>Standard (C/E-Klasse)</option>';
    echo '<option value="premium"' . selected($vehicle_type, 'premium', false) . '>Premium (S-Klasse)</option>';
    echo '<option value="van"' . selected($vehicle_type, 'van', false) . '>Van (V-Klasse)</option>';
    echo '</select></td></tr>';
    
    echo '<tr><th><label for="fleet_capacity">Passenger Capacity</label></th>';
    echo '<td><input type="number" id="fleet_capacity" name="fleet_capacity" value="' . esc_attr($capacity) . '" min="1" max="8" /></td></tr>';
    echo '</table>';
}

// Booking Meta Box Callback
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
    echo '<tr><th>Customer Name</th><td>' . esc_html($customer_name) . '</td></tr>';
    echo '<tr><th>Email</th><td><a href="mailto:' . esc_attr($customer_email) . '">' . esc_html($customer_email) . '</a></td></tr>';
    echo '<tr><th>Phone</th><td><a href="tel:' . esc_attr($customer_phone) . '">' . esc_html($customer_phone) . '</a></td></tr>';
    echo '<tr><th>Pickup Location</th><td>' . esc_html($pickup_location) . '</td></tr>';
    echo '<tr><th>Destination</th><td>' . esc_html($destination) . '</td></tr>';
    echo '<tr><th>Date & Time</th><td>' . esc_html($pickup_date) . ' at ' . esc_html($pickup_time) . '</td></tr>';
    echo '<tr><th>Passengers</th><td>' . esc_html($passenger_count) . '</td></tr>';
    echo '<tr><th>Vehicle Type</th><td>' . esc_html($vehicle_type) . '</td></tr>';
    echo '<tr><th>Special Requests</th><td>' . esc_html($special_requests) . '</td></tr>';
    
    echo '<tr><th><label for="booking_status">Status</label></th>';
    echo '<td><select id="booking_status" name="booking_status">';
    echo '<option value="pending"' . selected($status, 'pending', false) . '>Pending</option>';
    echo '<option value="confirmed"' . selected($status, 'confirmed', false) . '>Confirmed</option>';
    echo '<option value="completed"' . selected($status, 'completed', false) . '>Completed</option>';
    echo '<option value="cancelled"' . selected($status, 'cancelled', false) . '>Cancelled</option>';
    echo '</select></td></tr>';
    echo '</table>';
}

// Contact Meta Box Callback
function taxi_turlihof_contact_meta_box_callback($post) {
    $name = get_post_meta($post->ID, '_contact_name', true);
    $email = get_post_meta($post->ID, '_contact_email', true);
    $phone = get_post_meta($post->ID, '_contact_phone', true);
    $message = get_post_meta($post->ID, '_contact_message', true);
    
    echo '<table class="form-table">';
    echo '<tr><th>Name</th><td>' . esc_html($name) . '</td></tr>';
    echo '<tr><th>Email</th><td><a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a></td></tr>';
    echo '<tr><th>Phone</th><td><a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a></td></tr>';
    echo '<tr><th>Message</th><td>' . wp_kses_post($message) . '</td></tr>';
    echo '</table>';
}

// Save Meta Box Data
function taxi_turlihof_save_meta_boxes($post_id) {
    // Fleet Meta Box
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
    
    // Booking Meta Box
    if (isset($_POST['taxi_turlihof_booking_nonce_field']) && wp_verify_nonce($_POST['taxi_turlihof_booking_nonce_field'], 'taxi_turlihof_booking_nonce')) {
        if (isset($_POST['booking_status'])) {
            update_post_meta($post_id, '_booking_status', sanitize_text_field($_POST['booking_status']));
        }
    }
}
add_action('save_post', 'taxi_turlihof_save_meta_boxes');

// AJAX Handler for Contact Form
function taxi_turlihof_handle_contact_form() {
    check_ajax_referer('taxi_nonce', 'nonce');
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Create contact post
    $contact_id = wp_insert_post(array(
        'post_title' => 'Contact from ' . $name,
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
        // Send email notification
        $admin_email = get_option('admin_email');
        $subject = 'New Contact Form Submission - Taxi Türlihof';
        $email_message = "New contact form submission:\n\n";
        $email_message .= "Name: " . $name . "\n";
        $email_message .= "Email: " . $email . "\n";
        $email_message .= "Phone: " . $phone . "\n";
        $email_message .= "Message: " . $message . "\n";
        
        wp_mail($admin_email, $subject, $email_message);
        
        wp_send_json_success('Message sent successfully!');
    } else {
        wp_send_json_error('Failed to send message.');
    }
}
add_action('wp_ajax_taxi_contact_form', 'taxi_turlihof_handle_contact_form');
add_action('wp_ajax_nopriv_taxi_contact_form', 'taxi_turlihof_handle_contact_form');

// AJAX Handler for Booking Form
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
    
    // Create booking post
    $booking_id = wp_insert_post(array(
        'post_title' => 'Booking from ' . $customer_name . ' - ' . $pickup_date,
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
        // Send confirmation emails
        $admin_email = get_option('admin_email');
        
        // Email to customer
        $customer_subject = 'Booking Confirmation - Taxi Türlihof';
        $customer_message = "Dear " . $customer_name . ",\n\n";
        $customer_message .= "Thank you for your booking! Here are the details:\n\n";
        $customer_message .= "Booking ID: " . $booking_id . "\n";
        $customer_message .= "Pickup: " . $pickup_location . "\n";
        $customer_message .= "Destination: " . $destination . "\n";
        $customer_message .= "Date: " . $pickup_date . "\n";
        $customer_message .= "Time: " . $pickup_time . "\n";
        $customer_message .= "Passengers: " . $passenger_count . "\n";
        $customer_message .= "Vehicle: " . $vehicle_type . "\n\n";
        $customer_message .= "We will confirm your booking soon.\n\n";
        $customer_message .= "Best regards,\nTaxi Türlihof Team\n076 611 31 31";
        
        wp_mail($customer_email, $customer_subject, $customer_message);
        
        // Email to admin
        $admin_subject = 'New Booking - Taxi Türlihof';
        $admin_message = "New booking received:\n\n";
        $admin_message .= "Customer: " . $customer_name . "\n";
        $admin_message .= "Email: " . $customer_email . "\n";
        $admin_message .= "Phone: " . $customer_phone . "\n";
        $admin_message .= "Pickup: " . $pickup_location . "\n";
        $admin_message .= "Destination: " . $destination . "\n";
        $admin_message .= "Date: " . $pickup_date . "\n";
        $admin_message .= "Time: " . $pickup_time . "\n";
        $admin_message .= "Passengers: " . $passenger_count . "\n";
        $admin_message .= "Vehicle: " . $vehicle_type . "\n";
        $admin_message .= "Special Requests: " . $special_requests . "\n";
        
        wp_mail($admin_email, $admin_subject, $admin_message);
        
        wp_send_json_success(array(
            'message' => 'Booking submitted successfully!',
            'booking_id' => $booking_id
        ));
    } else {
        wp_send_json_error('Failed to submit booking.');
    }
}
add_action('wp_ajax_taxi_booking_form', 'taxi_turlihof_handle_booking_form');
add_action('wp_ajax_nopriv_taxi_booking_form', 'taxi_turlihof_handle_booking_form');

// AJAX Handler for Price Calculator - Connect to React backend
function taxi_turlihof_handle_price_calculator() {
    check_ajax_referer('taxi_nonce', 'nonce');
    
    $pickup_location = sanitize_text_field($_POST['pickup_location']);
    $destination = sanitize_text_field($_POST['destination']);
    $pickup_date = sanitize_text_field($_POST['pickup_date']);
    $pickup_time = sanitize_text_field($_POST['pickup_time']);
    $passenger_count = intval($_POST['passenger_count']);
    $vehicle_type = sanitize_text_field($_POST['vehicle_type']);
    
    // Get backend URL from WordPress options or use default
    $backend_url = get_option('taxi_backend_url', 'http://localhost:8001'); // You can set this in WordPress admin
    
    // Prepare data for the React backend API
    $api_data = array(
        'pickup_location' => $pickup_location,
        'destination' => $destination,
        'pickup_date' => $pickup_date ? $pickup_date : date('Y-m-d'),
        'pickup_time' => $pickup_time ? $pickup_time : date('H:i'),
        'passenger_count' => $passenger_count,
        'vehicle_type' => $vehicle_type
    );
    
    // Make API call to React backend
    $response = wp_remote_post($backend_url . '/api/calculate-price', array(
        'method' => 'POST',
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'body' => json_encode($api_data),
        'timeout' => 30
    ));
    
    if (is_wp_error($response)) {
        wp_send_json_error('Connection error. Please try again or call us directly at 076 611 31 31.');
        return;
    }
    
    $response_code = wp_remote_retrieve_response_code($response);
    $response_body = wp_remote_retrieve_body($response);
    
    if ($response_code !== 200) {
        wp_send_json_error('Calculation service temporarily unavailable. Please call us at 076 611 31 31 for a quote.');
        return;
    }
    
    $data = json_decode($response_body, true);
    
    if (!$data || isset($data['error'])) {
        wp_send_json_error('Unable to calculate price for this route. Please call us at 076 611 31 31.');
        return;
    }
    
    // Return the price calculation data
    wp_send_json_success($data);
}
add_action('wp_ajax_taxi_calculate_price', 'taxi_turlihof_handle_price_calculator');
add_action('wp_ajax_nopriv_taxi_calculate_price', 'taxi_turlihof_handle_price_calculator');

// Get Fleet Images for Gallery
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
    
    // If no custom fleet images, return default fallback
    if (empty($images)) {
        $images = array(
            array(
                'url' => get_template_directory_uri() . '/assets/images/fleet1.jpg',
                'title' => 'Mercedes V-Klasse Van',
                'description' => 'Geräumig für Familien und Gruppen bis 8 Personen',
                'vehicle_type' => 'van',
                'capacity' => '8'
            ),
            array(
                'url' => get_template_directory_uri() . '/assets/images/fleet2.jpg',
                'title' => 'Mercedes V-Klasse Premium',
                'description' => 'Höchster Komfort für Gruppenfahrten und Flughafentransfers',
                'vehicle_type' => 'premium',
                'capacity' => '7'
            ),
            array(
                'url' => get_template_directory_uri() . '/assets/images/fleet3.jpg',
                'title' => 'Mercedes Taxi bei Nacht',
                'description' => '24/7 Service - auch nachts zuverlässig unterwegs',
                'vehicle_type' => 'standard',
                'capacity' => '4'
            )
        );
    }
    
    return $images;
}

// Admin Dashboard Widget for Recent Bookings
function taxi_turlihof_dashboard_widgets() {
    wp_add_dashboard_widget(
        'taxi_recent_bookings',
        'Recent Taxi Bookings',
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
            echo esc_html($pickup_date) . ' from ' . esc_html($pickup_location);
            echo ' <a href="' . get_edit_post_link($booking->ID) . '">(Edit)</a>';
            echo '</li>';
        }
        echo '</ul>';
    } else {
        echo '<p>No pending bookings.</p>';
    }
}

// Theme Customizer
function taxi_turlihof_customize_register($wp_customize) {
    // Company Information Section
    $wp_customize->add_section('taxi_company_info', array(
        'title' => __('Company Information'),
        'priority' => 30,
    ));
    
    // Phone Number
    $wp_customize->add_setting('taxi_phone', array(
        'default' => '076 611 31 31',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('taxi_phone', array(
        'label' => __('Phone Number'),
        'section' => 'taxi_company_info',
        'type' => 'text',
    ));
    
    // Email Address
    $wp_customize->add_setting('taxi_email', array(
        'default' => 'info@taxiturlihof.ch',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('taxi_email', array(
        'label' => __('Email Address'),
        'section' => 'taxi_company_info',
        'type' => 'email',
    ));
    
    // WhatsApp Number
    $wp_customize->add_setting('taxi_whatsapp', array(
        'default' => '41766113131',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('taxi_whatsapp', array(
        'label' => __('WhatsApp Number (with country code)'),
        'section' => 'taxi_company_info',
        'type' => 'text',
    ));
    
    // Backend URL Setting
    $wp_customize->add_setting('taxi_backend_url', array(
        'default' => 'http://localhost:8001',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('taxi_backend_url', array(
        'label' => __('Backend API URL (for price calculator)'),
        'section' => 'taxi_company_info',
        'type' => 'url',
        'description' => __('URL of the backend API server for price calculations')
    ));
}
add_action('customize_register', 'taxi_turlihof_customize_register');

// Helper function to get customizer values
function taxi_get_option($option, $default = '') {
    return get_theme_mod($option, $default);
}

// Add admin menu for theme settings
function taxi_turlihof_admin_menu() {
    add_theme_page(
        'Taxi Türlihof Settings',
        'Taxi Settings',
        'manage_options',
        'taxi-settings',
        'taxi_turlihof_settings_page'
    );
}
add_action('admin_menu', 'taxi_turlihof_admin_menu');

function taxi_turlihof_settings_page() {
    ?>
    <div class="wrap">
        <h1>Taxi Türlihof Theme Settings</h1>
        <div class="card" style="max-width: 800px;">
            <h2>Setup Instructions</h2>
            <ol>
                <li><strong>Fleet Gallery:</strong> Add your vehicle images in Fleet Gallery section</li>
                <li><strong>Menus:</strong> Set up navigation menu in Appearance > Menus</li>
                <li><strong>Customizer:</strong> Configure company information in Appearance > Customize</li>
                <li><strong>Backend Connection:</strong> Update the backend URL in Customizer if needed</li>
            </ol>
            
            <h3>Quick Links</h3>
            <p>
                <a href="<?php echo admin_url('edit.php?post_type=fleet'); ?>" class="button">Manage Fleet Gallery</a>
                <a href="<?php echo admin_url('edit.php?post_type=booking'); ?>" class="button">View Bookings</a>
                <a href="<?php echo admin_url('edit.php?post_type=contact'); ?>" class="button">View Messages</a>
                <a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary">Customize Theme</a>
            </p>
            
            <h3>Support</h3>
            <p>For technical support or customization, contact your developer.</p>
        </div>
    </div>
    <?php
}

// Add custom admin CSS
function taxi_turlihof_admin_styles() {
    echo '<style>
        .post-type-booking .column-title { width: 25%; }
        .post-type-contact .column-title { width: 30%; }
        .post-type-fleet .column-title { width: 20%; }
    </style>';
}
add_action('admin_head', 'taxi_turlihof_admin_styles');

?>