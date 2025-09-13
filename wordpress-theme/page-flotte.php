<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;">Mercedes-Flotte</span>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <section style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: #fff; padding: 5rem 0;">
        <div class="container">
            <div class="text-center">
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                    🚗
                </div>
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
                    Unsere Mercedes-Flotte
                </h1>
                <p style="font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
                    Moderne, gepflegte und komfortable Fahrzeuge für alle Ihre Transportbedürfnisse
                </p>
            </div>
        </div>
    </section>

    <!-- Fleet Gallery -->
    <section style="padding: 5rem 0;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Unsere Fahrzeuge
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 3rem;">
                    Klicken Sie durch unsere Mercedes-Flotte
                </p>
            </div>

            <div style="max-width: 900px; margin: 0 auto;">
                <div style="position: relative;">
                    <div id="fleet-gallery-main">
                        <!-- Images will be loaded by JavaScript -->
                    </div>
                    <button id="prev-btn" style="position: absolute; top: 50%; left: 20px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: #fff; border: none; padding: 1rem; border-radius: 50%; cursor: pointer; font-size: 1.5rem; z-index: 10;">‹</button>
                    <button id="next-btn" style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: #fff; border: none; padding: 1rem; border-radius: 50%; cursor: pointer; font-size: 1.5rem; z-index: 10;">›</button>
                </div>

                <!-- Thumbnails -->
                <div id="fleet-thumbnails" style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                    <!-- Thumbnails will be loaded by JavaScript -->
                </div>
            </div>

            <div style="text-center; margin-top: 3rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto;">
                    <div>
                        <h4 style="font-weight: 600; font-size: 1.125rem; margin-bottom: 0.5rem;">Standard</h4>
                        <p style="color: #6b7280; font-size: 0.875rem;">Mercedes C/E-Klasse<br>1-4 Personen<br>CHF 4.20/km</p>
                    </div>
                    <div>
                        <h4 style="font-weight: 600; font-size: 1.125rem; margin-bottom: 0.5rem;">Premium</h4>
                        <p style="color: #6b7280; font-size: 0.875rem;">Mercedes S-Klasse<br>1-4 Personen<br>CHF 5.00/km</p>
                    </div>
                    <div>
                        <h4 style="font-weight: 600; font-size: 1.125rem; margin-bottom: 0.5rem;">Van</h4>
                        <p style="color: #6b7280; font-size: 0.875rem;">Mercedes V-Klasse<br>bis 8 Personen<br>CHF 5.00/km</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Fleet Details -->
    <section style="padding: 5rem 0; background: #f9fafb;">
        <div class="container">
            <div style="text-center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">
                    Warum Mercedes-Fahrzeuge?
                </h2>
                <p style="font-size: 1.25rem; color: #6b7280; max-width: 600px; margin: 0 auto;">
                    Wir setzen ausschließlich auf Mercedes-Benz für höchste Qualität und Sicherheit
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dbeafe; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        ⭐
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Sicherheit</h3>
                    <p style="color: #6b7280;">
                        5-Sterne Euro-NCAP-Bewertung und modernste Sicherheitssysteme in allen Fahrzeugen
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #dcfce7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        👥
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Komfort</h3>
                    <p style="color: #6b7280;">
                        Ledersitze, Klimaanlage und viel Beinfreiheit für eine angenehme Fahrt
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🚗
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Zuverlässigkeit</h3>
                    <p style="color: #6b7280;">
                        Regelmäßige Wartung und bewährte Mercedes-Qualität für maximale Verfügbarkeit
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #f3e8ff; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🌱
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Umweltfreundlich</h3>
                    <p style="color: #6b7280;">
                        Moderne Euro-6-Motoren für niedrige Emissionen und effiziente Kraftstoffnutzung
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #fed7d7; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🧳
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Geräumigkeit</h3>
                    <p style="color: #6b7280;">
                        Große Kofferräume für Gepäck und flexible Sitzanordnung für alle Bedürfnisse
                    </p>
                </div>

                <div style="background: #fff; padding: 2rem; text-align: center; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="background: #e0f2fe; padding: 1rem; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        🔧
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Wartung</h3>
                    <p style="color: #6b7280;">
                        Professionelle Wartung in Mercedes-Werkstätten für optimale Leistung und Sicherheit
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section style="padding: 5rem 0; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: #fff;">
        <div class="container">
            <div style="text-center;">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">
                    Bereit für eine Fahrt?
                </h2>
                <p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem;">
                    Buchen Sie jetzt Ihre Fahrt mit unserer Mercedes-Flotte
                </p>

                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #2563eb; color: #fff; padding: 1rem 2rem; font-size: 1.1rem;">
                        📅 Online buchen
                    </a>
                    <a href="<?php echo home_url('/preisrechner'); ?>" class="btn" style="background: #f59e0b; color: #fff; padding: 1rem 2rem; font-size: 1.1rem;">
                        🧮 Preis berechnen
                    </a>
                    <a href="tel:076 611 31 31" class="btn btn-success" style="padding: 1rem 2rem; font-size: 1.1rem;">
                        📞 076 611 31 31
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<script>
// Fleet Gallery Images (you'll need to replace these with actual URLs)
const fleetImages = [
    {
        url: '<?php echo get_template_directory_uri(); ?>/assets/images/fleet1.jpg',
        title: 'Mercedes V-Klasse Van',
        description: 'Geräumig für Familien und Gruppen bis 8 Personen'
    },
    {
        url: '<?php echo get_template_directory_uri(); ?>/assets/images/fleet2.jpg',
        title: 'Mercedes V-Klasse Premium',
        description: 'Höchster Komfort für Gruppenfahrten und Flughafentransfers'
    },
    {
        url: '<?php echo get_template_directory_uri(); ?>/assets/images/fleet3.jpg',
        title: 'Mercedes Taxi bei Nacht',
        description: '24/7 Service - auch nachts zuverlässig unterwegs'
    }
];

let currentImageIndex = 0;

function loadMainImage() {
    const mainGallery = document.getElementById('fleet-gallery-main');
    const image = fleetImages[currentImageIndex];
    
    mainGallery.innerHTML = `
        <img src="${image.url}" alt="${image.title}" style="width: 100%; height: 500px; object-fit: cover; border-radius: 12px;">
        <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 1.5rem; border-radius: 8px; max-width: 400px;">
            <h4 style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.25rem;">${image.title}</h4>
            <p style="font-size: 0.875rem; opacity: 0.9; margin: 0;">${image.description}</p>
        </div>
    `;
}

function loadThumbnails() {
    const thumbnailsDiv = document.getElementById('fleet-thumbnails');
    
    thumbnailsDiv.innerHTML = fleetImages.map((image, index) => `
        <button onclick="showImage(${index})" style="border: ${index === currentImageIndex ? '3px solid #2563eb' : '2px solid transparent'}; border-radius: 8px; overflow: hidden; cursor: pointer; background: none; padding: 0;">
            <img src="${image.url}" alt="${image.title}" style="width: 100px; height: 60px; object-fit: cover; display: block;">
        </button>
    `).join('');
}

function showImage(index) {
    currentImageIndex = index;
    loadMainImage();
    loadThumbnails();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % fleetImages.length;
    loadMainImage();
    loadThumbnails();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + fleetImages.length) % fleetImages.length;
    loadMainImage();
    loadThumbnails();
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    loadMainImage();
    loadThumbnails();
    
    document.getElementById('next-btn').addEventListener('click', nextImage);
    document.getElementById('prev-btn').addEventListener('click', previousImage);
    
    // Auto-play (optional)
    setInterval(nextImage, 8000);
});
</script>

<?php get_footer(); ?>