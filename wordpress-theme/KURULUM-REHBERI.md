# 🚀 TAXI TÜRLIHOF WORDPRESS TEMA KURULUM REHBERİ

## 📦 TEMA PAKETİ İÇERİĞİ

Bu pakette aşağıdaki dosyalar bulunmaktadır:
```
taxi-turlihof-theme/
├── style.css (Ana CSS dosyası)
├── index.php (Ana sayfa template)
├── header.php (Başlık kısmı)
├── footer.php (Alt kısım)
├── functions.php (WordPress fonksiyonları)
├── page-preisrechner.php (Fiyat hesaplayıcı sayfası)
├── page-buchen.php (Online rezervasyon sayfası)
├── page-flotte.php (Araç galerisi sayfası)
├── assets/
│   ├── js/main.js (JavaScript dosyası)
│   └── images/ (Görsel dosyaları)
└── KURULUM-REHBERI.md (Bu dosya)
```

## 🔧 ADIM ADIM KURULUM TALİMATLARI

### ADIM 1: WordPress Hazırlığı
1. **WordPress 6.0+** yüklü olduğundan emin olun
2. **Admin paneline** giriş yapın
3. **Mevcut temanızı** yedekleyin (önemli!)

### ADIM 2: Tema Yükleme
1. WordPress Admin → **Görünüm** → **Temalar**
2. **Yeni Ekle** → **Tema Yükle** tıklayın
3. `taxi-turlihof-theme.zip` dosyasını seçin
4. **Şimdi Yükle** → **Etkinleştir** tıklayın

### ADIM 3: Gerekli Eklentiler
Aşağıdaki eklentileri kurun:
```
1. Contact Form 7 (iletişim formları için)
2. Yoast SEO (SEO optimizasyonu için)
3. WP Mail SMTP (e-posta gönderimi için)
4. UpdraftPlus (yedekleme için)
```

### ADIM 4: Mercedes Resimlerini Ekleme
1. **Medya** → **Yeni Ekle**
2. Mercedes resimlerini yükleyin:
   - `fleet1.jpg` (V-Klasse Van)
   - `fleet2.jpg` (V-Klasse Premium)  
   - `fleet3.jpg` (Gece taksi)
3. **Yazılar** → **Fleet Gallery** → **Yeni Ekle**
4. Her resim için yeni bir "Fleet" postu oluşturun

### ADIM 5: Sayfa Oluşturma
Aşağıdaki sayfaları oluşturun:

**1. Preisrechner Sayfası:**
- **Sayfalar** → **Yeni Ekle**
- **Başlık:** "Preisrechner"
- **Kalıcı Bağlantı:** `/preisrechner`
- **Sayfa Template:** "Preisrechner Template"

**2. Buchen Sayfası:**
- **Başlık:** "Online Buchen"
- **Kalıcı Bağlantı:** `/buchen`
- **Sayfa Template:** "Buchen Template"

**3. Flotte Sayfası:**
- **Başlık:** "Mercedes-Flotte"
- **Kalıcı Bağlantı:** `/flotte`
- **Sayfa Template:** "Flotte Template"

### ADIM 6: Menü Ayarları
1. **Görünüm** → **Menüler**
2. **Yeni menü oluştur** → "Ana Menü"
3. Sayfaları ekleyin:
   - Home
   - Preisrechner
   - Buchen
   - Dienstleistungen (alt menü olarak şehir sayfaları)
   - Kontakt

### ADIM 7: WordPress Customizer Ayarları
1. **Görünüm** → **Özelleştir**
2. **Company Information** bölümüne gidin
3. Bilgilerinizi güncelleyin:
   - **Telefon:** 076 611 31 31
   - **E-mail:** info@taxiturlihof.ch  
   - **WhatsApp:** 41766113131

### ADIM 8: E-posta Ayarları (WP Mail SMTP)
1. **WP Mail SMTP** eklentisini kurun
2. **Ayarlar** → **WP Mail SMTP**
3. Gmail SMTP ayarlarını yapın:
   - **SMTP Host:** smtp.gmail.com
   - **Port:** 587
   - **Kullanıcı adı:** rasayibelec@gmail.com
   - **Şifre:** [App Password]

### ADIM 9: SEO Ayarları (Yoast)
1. **Yoast SEO** eklentisini kurun
2. **SEO** → **Genel** → Yapılandırma sihirbazını çalıştırın
3. **Şirket bilgilerini** girin:
   - **Şirket adı:** Taxi Türlihof
   - **Logo:** Mercedes logo yükleyin

## ✅ KURULUM SONRASI KONTROL LİSTESİ

### Test Edilecekler:
- [ ] Ana sayfa doğru görünüyor
- [ ] Fiyat hesaplayıcı çalışıyor
- [ ] Online rezervasyon formu çalışıyor
- [ ] Mercedes resimleri görünüyor
- [ ] İletişim formları e-posta gönderiyor
- [ ] Mobil uyumluluk
- [ ] Sayfa hızı (GTmetrix ile test edin)

### Yaygın Sorunlar ve Çözümler:

**❌ "Sayfa bulunamadı" hatası:**
- Çözüm: Ayarlar → Kalıcı Bağlantılar → Kaydet

**❌ Resimler görünmüyor:**
- Çözüm: Medya klasörü izinlerini kontrol edin (755)

**❌ E-posta gitmiyor:**
- Çözüm: WP Mail SMTP test özelliğini kullanın

**❌ Rezervasyon formu çalışmıyor:**
- Çözüm: Contact Form 7 eklentisini etkinleştirin

## 📞 DESTEK

Kurulum sırasında sorun yaşarsanız:
1. Önce bu rehberi tekrar okuyun
2. WordPress error loglarını kontrol edin
3. Eklenti çakışması olup olmadığını test edin

## 🎯 TEMA ÖZELLİKLERİ

### Admin Panel'den Yönetebileceğiniz:
✅ **Mercedes Araç Galerisi** - Resim ekle/sil/düzenle
✅ **Rezervasyonlar** - Tüm rezervasyonları görüntüle
✅ **İletişim Mesajları** - Gelen mesajları oku
✅ **Şirket Bilgileri** - Telefon, e-mail, WhatsApp
✅ **Blog Yazıları** - SEO için makale yazın
✅ **Menü Yapısı** - Navigasyonu düzenleyin

### Otomatik Özellikler:
✅ **SEO Optimizasyonu** - Schema markup dahil
✅ **Responsive Tasarım** - Mobil uyumlu
✅ **Hızlı Yükleme** - Optimize edilmiş kod
✅ **Google İndeksleme** - Sitemap otomatik
✅ **E-posta Bildirimleri** - Rezervasyon/İletişim

## 🏆 SONUÇ

Bu tema sizin için özel olarak geliştirilmiş ve tüm ihtiyaçlarınızı karşılayacak şekilde tasarlanmıştır. WordPress admin panelinden kolayca yönetebilir, içerikleri güncelleyebilir ve yeni özellikler ekleyebilirsiniz.

**Kurulum tamamlandıktan sonra sitenizi test etmeyi unutmayın!**

---
*Bu tema, mevcut React tabanlı sitenizin tam WordPress versiyonudur.*