# 🚗 Taxi Türlihof WordPress Teması - Yükleme Rehberi

Bu rehber, Taxi Türlihof WordPress temasının nasıl yükleneceğini ve kurulacağını detaylı olarak açıklar.

## 📋 Ön Gereksinimler

### Hosting Gereksinimleri
- ✅ **WordPress 5.0+** kurulu
- ✅ **PHP 7.4+** destekli hosting
- ✅ **MySQL 5.6+** veritabanı
- ✅ **HTTPS** sertifikası (SSL)
- ✅ En az **512MB RAM**
- ✅ **cPanel** veya **FTP** erişimi

### Gerekli Bilgiler
- WordPress admin kullanıcı adı/şifre
- Hosting kontrol paneli erişimi
- Domain adresiniz (örn: taxiturlihof.ch)

---

## 🗂️ ADIM 1: Tema Dosyalarını Hazırlama

### 1.1 Tema Dosyalarını İndirin
```
taxi-turlihof/
├── style.css
├── index.php
├── header.php
├── footer.php
├── functions.php
├── single.php
├── assets/
│   ├── js/main.js
│   └── images/
├── page-*.php (10 adet sayfa şablonu)
├── README.md
└── KURULUM-REHBERI.md
```

### 1.2 ZIP Dosyası Oluşturun
- Tüm `taxi-turlihof` klasörünü seçin
- **ZIP** dosyası oluşturun: `taxi-turlihof.zip`
- Dosya boyutunun **10MB**'den az olduğundan emin olun

---

## 🚀 ADIM 2: WordPress'e Tema Yükleme

### Yöntem 1: WordPress Admin Paneli (Önerilen)

#### 2.1 WordPress'e Giriş
```
1. Sitenize gidin: https://sitenizadı.com/wp-admin
2. Kullanıcı adı/şifre ile giriş yapın
```

#### 2.2 Tema Yükleme
```
1. Sol menüden "Görünüm" → "Temalar" tıklayın
2. "Yeni Ekle" butonuna tıklayın
3. "Tema Yükle" butonuna tıklayın
4. "taxi-turlihof.zip" dosyasını seçin
5. "Şimdi Yükle" butonuna tıklayın
6. Yükleme tamamlandıktan sonra "Etkinleştir" tıklayın
```

### Yöntem 2: FTP ile Manuel Yükleme

#### 2.1 FTP Bağlantısı
```
1. FTP istemcisi açın (FileZilla, WinSCP vb.)
2. Hosting bilgilerinizle bağlanın:
   - Host: ftp.sitenizadı.com
   - Kullanıcı: FTP kullanıcı adınız
   - Şifre: FTP şifreniz
```

#### 2.2 Dosyaları Yükleyin
```
1. /public_html/wp-content/themes/ klasörüne gidin
2. taxi-turlihof klasörünü ZIP'ten çıkarın
3. Tüm klasörü FTP ile yükleyin
4. WordPress admin panelinden temayı etkinleştirin
```

---

## ⚙️ ADIM 3: İlk Kurulum ve Yapılandırma

### 3.1 Tema Etkinleştirme Kontrolü
```
✅ WordPress admin → Görünüm → Temalar
✅ "Taxi Türlihof" teması aktif olmalı
✅ Site önizleme çalışıyor olmalı
```

### 3.2 Temel Ayarlar
```
1. WordPress Admin → Görünüm → Taxi Einstellungen
2. Kurulum talimatlarını okuyun
3. Hızlı linklerden gerekli bölümlere gidin
```

---

## 🎨 ADIM 4: Tema Özelleştirme

### 4.1 Firma Bilgilerini Güncelleme
```
Görünüm → Anpassen (Özelleştir) → Firmeninformationen

📞 Telefon: 076 611 31 31
📧 E-posta: info@taxiturlihof.ch  
💬 WhatsApp: 41766113131
🔗 Backend URL: http://localhost:8001
```

### 4.2 Logo Yükleme
```
1. Görünüm → Anpassen → Website-Identität
2. Logo auswählen → Resim yükleyin
3. Site-Symbol (favicon) yükleyin
```

### 4.3 Menü Oluşturma
```
1. Görünüm → Menüs → Neues Menü erstellen
2. Menü adı: "Hauptmenü"
3. Sayfalar ekleyin:
   ✅ Startseite (Ana Sayfa)
   ✅ Preisrechner
   ✅ Buchen  
   ✅ Taxi Luzern
   ✅ Taxi Schwyz
   ✅ Taxi Zug
   ✅ Flughafentransfer
   ✅ Flotte
   ✅ Kontakt
4. Menü konumu: "Hauptmenü" seçin
5. Kaydet
```

---

## 🚗 ADIM 5: Filo Galerisi Kurulumu

### 5.1 Araç Fotoğrafları Ekleme
```
1. Sol menü → Flottengalerie → Neues Fahrzeug hinzufügen
2. Her araç için:
   
   ARAÇ 1:
   ✅ Başlık: "Mercedes V-Klasse Van"
   ✅ Fahrzeugtyp: Van (V-Klasse)
   ✅ Kapazität: 8
   ✅ Beschreibung: "Geräumig für Familien und Gruppen bis 8 Personen"
   ✅ Beitragsbild: Mercedes V-Klasse fotoğrafı
   
   ARAÇ 2:  
   ✅ Başlık: "Mercedes S-Klasse Premium"
   ✅ Fahrzeugtyp: Premium (S-Klasse)
   ✅ Kapazität: 4
   ✅ Beschreibung: "Höchster Komfort für Geschäftsfahrten"
   ✅ Beitragsbild: Mercedes S-Klasse fotoğrafı
   
   ARAÇ 3:
   ✅ Başlık: "Mercedes C-Klasse Standard"  
   ✅ Fahrzeugtyp: Standard (C/E-Klasse)
   ✅ Kapazität: 4
   ✅ Beschreibung: "Komfortabel und zuverlässig"
   ✅ Beitragsbild: Mercedes C-Klasse fotoğrafı
```

---

## 🔧 ADIM 6: Backend API Bağlantısı (Preisrechner için)

### 6.1 Backend URL Ayarlama
```
Eğer React backend'iniz çalışıyorsa:

1. Görünüm → Anpassen → Firmeninformationen
2. Backend API URL: Gerçek backend URL'inizi girin
   Örnek: https://api.taxiturlihof.ch
   veya: http://localhost:8001 (test için)
```

### 6.2 API Test Etme
```
1. Sitede /preisrechner sayfasına gidin
2. Test hesaplama yapın:
   - Von: Luzern
   - Nach: Zürich
   - Calculate düğmesine basın
3. Sonuç geliyorsa ✅ Çalışıyor
4. Hata alıyorsa backend URL'i kontrol edin
```

---

## 📧 ADIM 7: E-posta Ayarları

### 7.1 SMTP Eklentisi Kurma (Önerilen)
```
1. Eklentiler → Yeni Ekle → "WP Mail SMTP" ara
2. Eklentiyi yükle ve etkinleştir
3. Ayarlar → WP Mail SMTP
4. E-posta servisinizi yapılandırın:
   - Gmail, Outlook, özel SMTP
```

### 7.2 E-posta Test Etme
```
1. Site'de iletişim formunu doldurun
2. Test e-postası gönderin
3. E-posta geliyorsa ✅ Çalışıyor
4. Gelmiyorsa SMTP ayarlarını kontrol edin
```

---

## 📱 ADIM 8: Mobil ve Test

### 8.1 Mobil Uyumluluk Testi
```
✅ Telefonda siteyi açın
✅ Tüm sayfalar düzgün görünüyor mu?
✅ Butonlar çalışıyor mu?
✅ WhatsApp butonu çalışıyor mu?
✅ Telefon butonu çalışıyor mu?
```

### 8.2 Fonksiyon Testi
```
✅ Ana sayfa yükleniyor
✅ Preisrechner çalışıyor  
✅ Buchung formu çalışıyor
✅ İletişim formu çalışıyor
✅ Filo galerisi gösteriliyor
✅ Tüm linkler çalışıyor
```

---

## 🔍 ADIM 9: SEO ve Performans

### 9.1 SEO Eklentisi (Opsiyonel)
```
1. Yoast SEO veya RankMath yükleyin
2. Temel SEO ayarlarını yapın
3. Sitemap oluşturun
4. Google Search Console'a ekleyin
```

### 9.2 Performans Optimizasyonu
```
1. Önbellek eklentisi yükleyin (W3 Total Cache)
2. Resim optimizasyonu yapın
3. CSS/JS sıkıştırma etkinleştirin
```

---

## ❗ Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### 🔴 Tema Yüklenmiyor
```
Çözüm:
1. ZIP dosyası 10MB'den küçük olmalı
2. Tema klasör yapısı doğru olmalı  
3. style.css başında theme header bulunmalı
4. FTP ile manuel yüklemeyi deneyin
```

#### 🔴 Sayfa Bulunamıyor (404)
```
Çözüm:
1. Ayarlar → Kalıcı Bağlantılar → Kaydet
2. .htaccess dosyasını kontrol edin
3. Sayfa şablonlarının doğru yüklendiğini kontrol edin
```

#### 🔴 Preisrechner Çalışmıyor
```
Çözüm:
1. Backend URL'i kontrol edin
2. API sunucunuzun çalıştığından emin olun
3. CORS ayarlarını kontrol edin
4. Console'da hata mesajlarına bakın
```

#### 🔴 E-posta Gitmiyor
```
Çözüm:
1. SMTP eklentisi kurun
2. WordPress e-posta ayarlarını kontrol edin
3. Hosting sağlayıcısından e-posta limitlerini sorun
4. Spam klasörünü kontrol edin
```

#### 🔴 Mobilde Görünüm Bozuk
```
Çözüm:
1. Tarayıcı önbelleğini temizleyin
2. Responsive tema ayarlarını kontrol edin
3. CSS çakışması var mı kontrol edin
```

---

## 📞 Destek

### Teknik Destek
- **Tema Sorunları:** Geliştiricinizle iletişime geçin
- **WordPress Genel:** wordpress.org/support
- **Hosting Sorunları:** Hosting sağlayıcınız

### Kullanışlı Linkler
- WordPress Codex: https://codex.wordpress.org/
- Theme Geliştirme: https://developer.wordpress.org/themes/
- Plugin Dizini: https://wordpress.org/plugins/

---

## ✅ Kurulum Tamamlandı Kontrol Listesi

Kurulum sonrası kontrol edilecek:

- [ ] ✅ Tema aktif ve site görünüyor
- [ ] ✅ Firma bilgileri güncellendi  
- [ ] ✅ Logo yüklendi
- [ ] ✅ Menü kuruldu ve çalışıyor
- [ ] ✅ 3 araç fotoğrafı filo galerisinde
- [ ] ✅ Preisrechner test edildi
- [ ] ✅ Buchung formu test edildi  
- [ ] ✅ İletişim formu test edildi
- [ ] ✅ E-posta bildirimleri çalışıyor
- [ ] ✅ Mobil görünüm kontrol edildi
- [ ] ✅ Tüm sayfalar açılıyor
- [ ] ✅ WhatsApp butonu çalışıyor
- [ ] ✅ Telefon butonu çalışıyor

**🎉 KURULUM TAMAMLANDI! Taxi Türlihof WordPress siteniz hazır!**

---

*Bu rehberi takip ederken herhangi bir sorunla karşılaştığınızda, lütfen her adımı sırayla kontrol edin ve gerekirse teknik destek alın.*