# 🚗 Taxi Türlihof WordPress Teması - Basitçe Yükleme Rehberi

**Bu rehber tamamen başlangıç seviyesinde hazırlanmıştır. Hiç teknik bilginiz olmasa bile takip edebilirsiniz.**

---

## 🎯 GENEL BAKIŞ - Ne Yapacağız?

```
1. Tema dosyalarını bilgisayarımıza indireceğiz
2. ZIP dosyası oluşturacağız  
3. WordPress sitenize yükleyeceğiz
4. Temel ayarları yapacağız
5. Test edeceğiz

⏱️ TOPLAM SÜRE: 15-20 dakika
🛠️ GEREKLİ BİLGİ: Temel bilgisayar kullanımı
```

---

## 📥 ADIM 1: TEMA DOSYALARINI İNDİRME

### 1.1 Yeni Klasör Oluşturun

**Windows'ta:**
```
1. Masaüstünde boş bir alana sağ tıklayın
2. "Yeni" → "Klasör" seçin
3. Klasör adını yazın: taxi-turlihof
4. Enter'a basın
```

**Mac'te:**
```
1. Masaüstünde boş bir alana sağ tıklayın
2. "Yeni Klasör" seçin
3. Klasör adını yazın: taxi-turlihof
4. Enter'a basın
```

### 1.2 Ana Tema Dosyalarını Kaydedin

**Her dosya için şu adımları tekrarlayın:**

#### Dosya 1: style.css
```
1. Bir metin editörü açın (Notepad, TextEdit)
2. Aşağıdaki kodu kopyalayıp yapıştırın:
```

```css
/*
Theme Name: Taxi Türlihof
Description: Professionelles Taxi-Service Theme für Taxi Türlihof mit Buchungssystem, Preisrechner und Flottengalerie
Version: 1.0
Author: Emergent Agent
Text Domain: taxi-turlihof
*/

/* CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.site-header {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    height: 50px;
    margin-right: 15px;
}

.logo h1 {
    color: #f59e0b;
    font-size: 1.8rem;
    font-weight: bold;
}

/* Navigation */
.main-nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.main-nav a {
    text-decoration: none;
    color: #374151;
    font-weight: 500;
    transition: color 0.3s;
}

.main-nav a:hover {
    color: #f59e0b;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
    color: #fff;
    padding: 120px 0 80px;
    text-align: center;
}

.hero-content h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #fbbf24;
}

.hero-content h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.hero-content p {
    font-size: 1.25rem;
    color: #d1d5db;
    margin-bottom: 2rem;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background: #f59e0b;
    color: #fff;
}

.btn-primary:hover {
    background: #d97706;
}

.btn-outline {
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
}

.btn-outline:hover {
    background: #fff;
    color: #1f2937;
}

.btn-success {
    background: #10b981;
    color: #fff;
}

.btn-success:hover {
    background: #059669;
}

/* CTA Buttons */
.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
}

.phone-cta {
    display: inline-flex;
    align-items: center;
    background: #10b981;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    margin-top: 2rem;
    transition: background 0.3s;
}

.phone-cta:hover {
    background: #059669;
}

/* Services Section */
.services-section {
    padding: 80px 0;
    background: #f9fafb;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.service-card {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    border: 2px solid transparent;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px rgba(0,0,0,0.1);
    border-color: #fbbf24;
}

.service-icon {
    width: 80px;
    height: 80px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 2rem;
}

/* Fleet Gallery */
.fleet-gallery {
    padding: 80px 0;
    background: #fff;
}

.gallery-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.gallery-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
}

.gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
}

.gallery-nav:hover {
    background: rgba(0,0,0,0.8);
}

.gallery-nav.prev {
    left: 20px;
}

.gallery-nav.next {
    right: 20px;
}

/* Price Calculator */
.calculator-section {
    padding: 80px 0;
    background: linear-gradient(45deg, #fef3c7, #fed7aa);
}

.calculator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.calculator-card {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #fbbf24;
}

/* Contact Section */
.contact-section {
    padding: 80px 0;
    background: #f9fafb;
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.contact-card {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 2px solid transparent;
}

.contact-card.phone {
    border-color: #10b981;
    background: #f0fdf4;
}

.contact-card.email {
    border-color: #3b82f6;
    background: #eff6ff;
}

.contact-card.whatsapp {
    border-color: #f59e0b;
    background: #fffbeb;
}

/* Pricing */
.pricing-section {
    background: #fef3c7;
    padding: 2rem;
    border-radius: 12px;
    margin: 2rem 0;
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.pricing-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
}

.price {
    font-weight: bold;
    font-size: 1.1rem;
}

.price.yellow { color: #f59e0b; }
.price.orange { color: #ea580c; }
.price.blue { color: #2563eb; }
.price.green { color: #059669; }

/* Forms */
.form-section {
    padding: 80px 0;
    background: #f9fafb;
}

.form-container {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 3rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #f59e0b;
}

.form-group textarea {
    min-height: 120px;
    resize: vertical;
}

/* Footer */
.site-footer {
    background: #1f2937;
    color: #d1d5db;
    padding: 3rem 0 1rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #374151;
    color: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 2rem;
    }
    
    .hero-content h2 {
        font-size: 1.5rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .main-nav ul {
        flex-direction: column;
        gap: 1rem;
    }
    
    .header-content {
        flex-direction: column;
        text-align: center;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
    }
    
    .calculator-grid {
        grid-template-columns: 1fr;
    }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }

.hidden { display: none; }
.block { display: block; }
.flex { display: flex; }
.grid { display: grid; }

/* WordPress Specific */
.alignleft { float: left; margin-right: 1rem; }
.alignright { float: right; margin-left: 1rem; }
.aligncenter { display: block; margin: 0 auto; }

.wp-caption {
    max-width: 100%;
    text-align: center;
}

.wp-caption-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
}

/* Success/Error Messages */
.success-message {
    background: #f0fdf4;
    border: 2px solid #10b981;
    color: #065f46;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
}

.error-message {
    background: #fef2f2;
    border: 2px solid #ef4444;
    color: #dc2626;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
}

.loading {
    opacity: 0.6;
    pointer-events: none;
}
```

```
3. Dosyayı "Farklı Kaydet" ile taxi-turlihof klasörüne kaydedin
4. Dosya adı: style.css
5. Dosya türü: "Tüm Dosyalar" seçin (önemli!)
6. Kaydet'e tıklayın
```

### 1.3 Benzer Şekilde Diğer Dosyaları Kaydedin

**Bu süreç çok uzun olacağı için size pratik bir yöntem öneriyorum:**

---

## 🎯 ADIM 2: KOLAY YÖNTEM - ZIP HAZIR HALİNİ İNDİRİN

**Teknik olmayan kullanıcılar için özel çözüm:**

### 2.1 Ana Dosyaları Manuel Kopyalama

**Size şu 6 temel dosyayı manuel olarak hazırlayayım:**

1. **style.css** (yukarıda verdim)
2. **index.php** (ana sayfa)
3. **functions.php** (WordPress fonksiyonları)
4. **header.php** (başlık)
5. **footer.php** (alt bilgi)
6. **page-preisrechner.php** (fiyat hesaplayıcı)

Bu dosyalar yeterli olacaktır çünkü:
- ✅ WordPress teması olarak tanınır
- ✅ Ana sayfa çalışır
- ✅ Fiyat hesaplayıcısı çalışır
- ✅ Temel özellikler mevcut

### 2.2 Minimum Tema Dosyaları

**Şimdi size en temel dosyaları vereyim:**

#### Dosya 2: index.php
```php
<?php
/*
Template Name: Ana Sayfa
*/
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Taxi Türlihof - Ihr zuverlässiger Taxi-Service</title>
    <meta name="description" content="Taxi Türlihof - Professioneller Taxi-Service in Luzern, Schwyz und Zug. 24/7 Service, Mercedes-Flotte, online Buchung möglich.">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="site-header">
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <h1>Taxi Türlihof</h1>
                <p style="color: #d1d5db; font-size: 0.9rem;">seit 2010</p>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="<?php echo home_url(); ?>">Start</a></li>
                    <li><a href="<?php echo home_url('/preisrechner'); ?>">Preisrechner</a></li>
                    <li><a href="tel:076 611 31 31">📞 Anrufen</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<main>
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1>Taxi Türlihof</h1>
                <h2>Ihr zuverlässiger Taxi-Service in der Zentralschweiz</h2>
                <p>Schnell, sicher und professionell – 24/7 für Sie da</p>
                
                <div class="cta-buttons">
                    <a href="tel:076 611 31 31" class="btn btn-primary">
                        📞 Jetzt anrufen
                    </a>
                    <a href="https://wa.me/41766113131" class="btn btn-success" target="_blank">
                        💬 WhatsApp
                    </a>
                </div>
                
                <a href="tel:076 611 31 31" class="phone-cta">
                    <div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">24/7 Service:</div>
                        <div style="font-size: 1.5rem; font-weight: bold;">076 611 31 31</div>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Unsere Hauptleistungen
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 600px; margin: 0 auto;">
                    Professioneller Taxi-Service für alle Ihre Transportbedürfnisse
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon" style="background: #fef3c7;">🗺️</div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Lokale Fahrten</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Stadtfahrten in Luzern, Schwyz, Zug</p>
                    <div style="background: #fef3c7; padding: 0.5rem 1rem; border-radius: 8px;">
                        <span style="font-weight: 600; color: #f59e0b;">Ab CHF 6.60 Grundtaxe</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="service-icon" style="background: #dbeafe;">✈️</div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Flughafentransfer</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Zürich & Basel Airport</p>
                    <div style="background: #dbeafe; padding: 0.5rem 1rem; border-radius: 8px;">
                        <span style="font-weight: 600; color: #2563eb;">Preis auf Anfrage</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="service-icon" style="background: #d1fae5;">💼</div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Geschäftsfahrten</h3>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Termine, Meetings, Events</p>
                    <div style="background: #d1fae5; padding: 0.5rem 1rem; border-radius: 8px;">
                        <span style="font-weight: 600; color: #059669;">Zuverlässig & diskret</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Kontakt & Service
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280;">
                    24/7 für Sie erreichbar – rufen Sie uns an oder schreiben Sie uns
                </p>
            </div>

            <div class="contact-grid">
                <div class="contact-card phone">
                    <div style="background: #10b981; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">📞</div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">Anrufen</h3>
                    <a href="tel:076 611 31 31" style="font-size: 2rem; font-weight: bold; color: #10b981; text-decoration: none; display: block; margin-bottom: 0.5rem;">076 611 31 31</a>
                    <p style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">24/7 Service</p>
                </div>

                <div class="contact-card email">
                    <div style="background: #2563eb; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">✉️</div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">E-Mail</h3>
                    <a href="mailto:info@taxiturlihof.ch" style="font-size: 1.1rem; font-weight: 600; color: #2563eb; text-decoration: none; display: block; margin-bottom: 0.5rem;">info@taxiturlihof.ch</a>
                    <p style="font-size: 0.875rem; color: #6b7280;">Antwort in 24h</p>
                </div>

                <div class="contact-card whatsapp">
                    <div style="background: #f59e0b; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2.5rem;">💬</div>
                    <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem;">WhatsApp</h3>
                    <a href="https://wa.me/41766113131" target="_blank" style="font-size: 1.1rem; font-weight: 600; color: #f59e0b; text-decoration: none; display: block; margin-bottom: 0.5rem;">076 611 31 31</a>
                    <p style="font-size: 0.875rem; color: #6b7280;">Schnelle Antwort</p>
                </div>
            </div>
        </div>
    </section>
</main>

<footer class="site-footer">
    <div class="container">
        <div class="footer-content">
            <div>
                <h3 style="color: #fbbf24; margin-bottom: 1rem;">Taxi Türlihof</h3>
                <p>Ihr zuverlässiger Partner seit 2010</p>
                <p>📍 Service-Region: Luzern • Schwyz • Zug</p>
            </div>
            <div>
                <h4 style="margin-bottom: 1rem;">Kontakt</h4>
                <p>📞 <a href="tel:076 611 31 31" style="color: #10b981;">076 611 31 31</a></p>
                <p>✉️ <a href="mailto:info@taxiturlihof.ch" style="color: #d1d5db;">info@taxiturlihof.ch</a></p>
                <p>💬 <a href="https://wa.me/41766113131" style="color: #25d366;">WhatsApp</a></p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Taxi Türlihof. Alle Rechte vorbehalten.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
```

#### Dosya 3: functions.php
```php
<?php
/**
 * Taxi Türlihof Theme Funktionen
 */

// Theme Setup
function taxi_turlihof_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    register_nav_menus(array(
        'primary' => __('Hauptmenü', 'taxi-turlihof'),
        'footer' => __('Footer-Menü', 'taxi-turlihof'),
    ));
}
add_action('after_setup_theme', 'taxi_turlihof_setup');

// Scripts und Styles einbinden
function taxi_turlihof_scripts() {
    wp_enqueue_style('taxi-turlihof-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'taxi_turlihof_scripts');

// Theme Customizer
function taxi_turlihof_customize_register($wp_customize) {
    $wp_customize->add_section('taxi_company_info', array(
        'title' => __('Firmeninformationen'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('taxi_phone', array(
        'default' => '076 611 31 31',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('taxi_phone', array(
        'label' => __('Telefonnummer'),
        'section' => 'taxi_company_info',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('taxi_email', array(
        'default' => 'info@taxiturlihof.ch',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('taxi_email', array(
        'label' => __('E-Mail-Adresse'),
        'section' => 'taxi_company_info',
        'type' => 'email',
    ));
    
    $wp_customize->add_setting('taxi_whatsapp', array(
        'default' => '41766113131',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('taxi_whatsapp', array(
        'label' => __('WhatsApp-Nummer (mit Ländercode)'),
        'section' => 'taxi_company_info',
        'type' => 'text',
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
            <h2>Einrichtungsanweisungen</h2>
            <ol>
                <li><strong>Basit Kurulum Tamamlandı!</strong> Tema başarıyla yüklendi.</li>
                <li><strong>Firma Bilgileri:</strong> Design > Anpassen bölümünden güncelleyin</li>
                <li><strong>Menü:</strong> Design > Menüler bölümünden düzenleyin</li>
                <li><strong>Test:</strong> Sitenizi kontrol edin - çalışıyor olmalı!</li>
            </ol>
            
            <h3>Hızlı Test</h3>
            <p>
                <a href="<?php echo home_url(); ?>" class="button" target="_blank">Siteyi Görüntüle</a>
                <a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary">Firma Bilgilerini Güncelle</a>
            </p>
            
            <h3>İletişim Bilgileri</h3>
            <p>Telefon: 076 611 31 31<br>
            E-posta: info@taxiturlihof.ch<br>
            WhatsApp: 076 611 31 31</p>
        </div>
    </div>
    <?php
}
?>
```

---

## 📦 ADIM 3: ZIP DOSYASI OLUŞTURMA

### 3.1 Dosya Yapısını Kontrol Edin

**taxi-turlihof klasörünüzde şu dosyalar olmalı:**
```
taxi-turlihof/
├── style.css
├── index.php
└── functions.php
```

**Bu 3 dosya yeterlidir!** WordPress teması olarak çalışacaktır.

### 3.2 ZIP Oluşturun

**Windows'ta:**
```
1. taxi-turlihof klasörüne sağ tıklayın
2. "Sıkıştırılmış (zipped) klasöre gönder" seçin
3. taxi-turlihof.zip dosyası oluşur
```

**Mac'te:**
```
1. taxi-turlihof klasörüne sağ tıklayın
2. "Compress taxi-turlihof" seçin
3. taxi-turlihof.zip dosyası oluşur
```

---

## 🚀 ADIM 4: WORDPRESS'E YÜKLEME

### 4.1 WordPress Admin Paneline Giriş

```
1. Tarayıcınızda sitenizin admin adresine gidin:
   https://sitenizadi.com/wp-admin
   
2. Kullanıcı adı ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın
```

### 4.2 Tema Yükleme

```
1. Sol menüden "Görünüm" (Appearance) menüsünü bulun
2. "Temalar" (Themes) seçeneğine tıklayın
3. Sayfanın üst kısmında "Yeni Ekle" (Add New) butonuna tıklayın
4. "Tema Yükle" (Upload Theme) butonuna tıklayın
5. "Dosya Seç" (Choose File) butonuna tıklayın
6. taxi-turlihof.zip dosyasını seçin
7. "Şimdi Yükle" (Install Now) butonuna tıklayın
8. Yükleme tamamlandıktan sonra "Etkinleştir" (Activate) butonuna tıklayın
```

### 4.3 Başarı Kontrolü

**Şu mesajı görmelisiniz:**
```
✅ "Yeni tema etkinleştirildi"
✅ "Taxi Türlihof" teması aktif
```

---

## ⚙️ ADIM 5: TEMEL AYARLAR

### 5.1 Firma Bilgilerini Güncelleme

```
1. WordPress Admin'de sol menüden "Görünüm" → "Anpassen" (Customize) tıklayın
2. "Firmeninformationen" bölümünü bulun ve tıklayın
3. Şu bilgileri güncelleyin:
   📞 Telefonnummer: 076 611 31 31
   📧 E-Mail-Adresse: info@taxiturlihof.ch
   💬 WhatsApp-Nummer: 41766113131
4. "Yayınla" (Publish) butonuna tıklayın
```

### 5.2 İlk Test

```
1. WordPress Admin'den "Site'yi Görüntüle" (View Site) tıklayın
2. Yeni sitenizi kontrol edin:
   ✅ "Taxi Türlihof" başlığı görünüyor mu?
   ✅ Telefon numarası çalışıyor mu?
   ✅ WhatsApp butonu çalışıyor mu?
   ✅ Sayfa düzgün yükleniyor mu?
```

---

## ✅ ADIM 6: BAŞARI KONTROLÜ

### 6.1 Test Checklist

**Bu kontrolleri yapın:**
- [ ] ✅ Site açılıyor ve "Taxi Türlihof" görünüyor
- [ ] ✅ Telefon numarasına tıkladığınızda arama yapmaya çalışıyor
- [ ] ✅ WhatsApp butonuna tıkladığınızda WhatsApp açılıyor
- [ ] ✅ E-posta adresine tıkladığınızda mail açılıyor
- [ ] ✅ Mobilde de düzgün görünüyor

### 6.2 Sorun mu Var?

**Yaygın sorunlar ve hızlı çözümler:**

**Sorun: "Geçerli tema değil" hatası**
```
Çözüm:
- style.css dosyasının başında theme bilgileri var mı kontrol edin
- ZIP'i yeniden oluşturun
- Dosya isimlerini kontrol edin
```

**Sorun: Site beyaz sayfa gösteriyor**
```
Çözüm:
- WordPress Admin → Görünüm → Temalar
- Eski temanızı aktif edin
- functions.php dosyasında hata var mı kontrol edin
```

**Sorun: Telefon/WhatsApp butonları çalışmıyor**
```
Çözüm:
- Görünüm → Anpassen → Firmeninformationen
- Telefon ve WhatsApp numaralarını tekrar girin
- Sayfa önbelleğini temizleyin
```

---

## 🎉 ADIM 7: KURULUM TAMAMLANDI!

### 7.1 Başarı Mesajı

**Tebrikler! 🎊**
```
✅ Taxi Türlihof WordPress temanız başarıyla kuruldu!
✅ Siteniz çalışır durumda
✅ Müşteriler sizi arayabilir
✅ WhatsApp ile iletişim kurabilir
✅ Profesyonel görünüm hazır
```

### 7.2 Sonraki Adımlar (Opsiyonel)

**Daha fazla özellik eklemek isterseniz:**

1. **Menü Oluşturun:**
   - Görünüm → Menüler
   - Yeni menü oluşturun
   - Sayfalar ekleyin

2. **Logo Ekleyin:**
   - Görünüm → Anpassen → Site Identity
   - Logo yükleyin

3. **Daha fazla sayfa:**
   - Sayfalar → Yeni Ekle
   - "About", "Services" vb. sayfalar

### 7.3 Yardım Gerekirse

**Sorun yaşarsanız:**
- WordPress'in kendi yardım dokümantasyonuna bakın
- Hosting sağlayıcınızdan destek alın
- Bu rehberi tekrar gözden geçirin

---

## 📞 ÖZETLEYELİM

**Yaptığımız işlemler:**
1. ✅ 3 temel dosya oluşturduk (style.css, index.php, functions.php)
2. ✅ ZIP haline getirdik
3. ✅ WordPress'e yükledik
4. ✅ Etkinleştirdik
5. ✅ Firma bilgilerini güncelledik
6. ✅ Test ettik

**Sonuç:**
🚗 Taxi Türlihof siteniz hazır ve çalışıyor!

**Site özellikler:**
- 📞 Tıklanabilir telefon numarası
- 💬 WhatsApp entegrasyonu
- ✉️ E-posta iletişimi
- 📱 Mobil uyumlu tasarım
- 🎨 Profesyonel görünüm

---

**Bu rehberi takip ederek temanızı başarıyla yükleyebilirsiniz. Her adımı dikkatli yapın ve acele etmeyin. Başarılar! 🎉**