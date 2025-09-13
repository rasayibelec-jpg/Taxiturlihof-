# 📥 Taxi Türlihof WordPress Teması - İndirme ve Yükleme Rehberi

Bu rehber, Taxi Türlihof WordPress temasını nasıl indirip WordPress sitenize yükleyeceğinizi detaylı olarak açıklar.

---

## 🎯 1. TEMA DOSYALARINI İNDİRME

### Yöntem 1: Tek Tek Dosya İndirme

Şu anda tema dosyaları `/app/wordpress-theme/` klasöründe. Her dosyayı tek tek kopyalayarak bilgisayarınıza kaydetmeniz gerekiyor:

#### Adım 1: Ana Klasör Oluşturun
```
Bilgisayarınızda yeni klasör oluşturun:
📁 taxi-turlihof/
```

#### Adım 2: Ana Tema Dosyalarını Kaydedin
Bu dosyaları `taxi-turlihof/` klasörüne kaydedin:

**🔧 Ana Tema Dosyaları:**
1. `style.css` - Ana CSS dosyası
2. `index.php` - Ana sayfa şablonu
3. `header.php` - Header şablonu
4. `footer.php` - Footer şablonu  
5. `functions.php` - WordPress fonksiyonları
6. `single.php` - Blog post şablonu

**📄 Sayfa Şablonları:**
7. `page-preisrechner.php` - Fiyat hesaplayıcı sayfası
8. `page-buchen.php` - Rezervasyon sayfası
9. `page-flotte.php` - Filo galerisi sayfası
10. `page-flughafentransfer.php` - Havalimanı transfer sayfası
11. `page-taxi-luzern.php` - Luzern taksi sayfası
12. `page-taxi-schwyz.php` - Schwyz taksi sayfası
13. `page-taxi-zug.php` - Zug taksi sayfası
14. `page-kontakt.php` - İletişim sayfası
15. `page-blog.php` - Blog sayfası
16. `page-faq.php` - SSS sayfası

#### Adım 3: Alt Klasörleri Oluşturun
```
taxi-turlihof/
├── assets/
│   ├── js/
│   └── images/
```

#### Adım 4: JavaScript Dosyasını Kaydedin
- `assets/js/main.js` - Ana JavaScript dosyası

#### Adım 5: Dokümantasyon Dosyalarını Kaydedin (Opsiyonel)
- `README.md` - İngilizce dokümantasyon
- `KURULUM-REHBERI.md` - Türkçe kurulum rehberi
- `WORDPRESS-YUKLEME-REHBERI.md` - WordPress yükleme rehberi
- `KURULUM-SEMASI.md` - Kurulum şeması
- `HIZLI-BASLANGIC.md` - Hızlı başlangıç kılavuzu

---

## 📦 2. ZIP DOSYASI OLUŞTURMA

### Windows'ta ZIP Oluşturma:
```
1. taxi-turlihof klasörüne sağ tıklayın
2. "Sıkıştırılmış (zipped) klasöre gönder" seçin
3. taxi-turlihof.zip dosyası oluşur
```

### Mac'te ZIP Oluşturma:
```
1. taxi-turlihof klasörüne sağ tıklayın  
2. "Compress taxi-turlihof" seçin
3. taxi-turlihof.zip dosyası oluşur
```

### Linux'ta ZIP Oluşturma:
```bash
cd desktop
zip -r taxi-turlihof.zip taxi-turlihof/
```

**⚠️ ÖNEMLİ:** ZIP dosyası boyutu 10MB'den küçük olmalıdır!

---

## 🚀 3. WORDPRESS'E YÜKLEME

### Yöntem 1: WordPress Admin Paneli (Önerilen)

#### Adım 1: WordPress Admin Paneline Giriş
```
1. Tarayıcınızda sitenize gidin: https://sitenizadi.com/wp-admin
2. Kullanıcı adı ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın
```

#### Adım 2: Temalar Bölümüne Gidin
```
1. Sol menüden "Görünüm" (Appearance) menüsünü açın
2. "Temalar" (Themes) seçeneğine tıklayın
```

#### Adım 3: Yeni Tema Ekleyin
```
1. Sayfanın üst kısmında "Yeni Ekle" (Add New) butonuna tıklayın
2. "Tema Yükle" (Upload Theme) butonuna tıklayın
```

#### Adım 4: ZIP Dosyasını Yükleyin
```
1. "Dosya Seç" (Choose File) butonuna tıklayın
2. taxi-turlihof.zip dosyasını seçin
3. "Şimdi Yükle" (Install Now) butonuna tıklayın
```

#### Adım 5: Temayı Etkinleştirin
```
1. Yükleme tamamlandıktan sonra "Etkinleştir" (Activate) butonuna tıklayın
2. Başarı mesajını görün: "Yeni tema etkinleştirildi"
```

### Yöntem 2: FTP ile Manuel Yükleme

Eğer WordPress admin paneli yöntemi çalışmazsa FTP kullanın:

#### Adım 1: FTP Bilgilerinizi Hazırlayın
```
Hosting sağlayıcınızdan şu bilgileri alın:
- FTP Sunucu Adresi (örn: ftp.sitenizadi.com)
- FTP Kullanıcı Adı
- FTP Şifresi
- Port (genellikle 21)
```

#### Adım 2: FTP İstemcisi Kurun
**Ücretsiz FTP İstemcileri:**
- **FileZilla** (Windows/Mac/Linux) - En popüler
- **WinSCP** (Windows) - Güvenli ve basit
- **Cyberduck** (Mac/Windows) - Kullanıcı dostu

#### Adım 3: FTP'ye Bağlanın
```
1. FTP istemcisini açın
2. Sunucu bilgilerinizi girin:
   - Host: ftp.sitenizadi.com
   - Username: FTP kullanıcı adınız
   - Password: FTP şifreniz
   - Port: 21
3. "Bağlan" (Connect) butonuna tıklayın
```

#### Adım 4: Doğru Klasöre Gidin
```
1. Sunucu tarafında şu klasöre gidin:
   /public_html/wp-content/themes/
   
   veya
   
   /httpdocs/wp-content/themes/
   
   (hosting sağlayıcınıza göre değişir)
```

#### Adım 5: Tema Klasörünü Yükleyin
```
1. taxi-turlihof.zip dosyasını çıkarın
2. taxi-turlihof klasörünü tamamen FTP ile yükleyin
3. Tüm dosyaların yüklendiğinden emin olun
```

#### Adım 6: WordPress'ten Etkinleştirin
```
1. WordPress admin paneline gidin
2. Görünüm → Temalar
3. "Taxi Türlihof" temasını bulun
4. "Etkinleştir" butonuna tıklayın
```

---

## ✅ 4. KURULUM DOĞRULAMA

### Tema Başarıyla Yüklendi mi Kontrol Edin:

#### Kontrol 1: Tema Listesinde Görünmeli
```
WordPress Admin → Görünüm → Temalar
"Taxi Türlihof" teması listede olmalı
```

#### Kontrol 2: Site Önizlemesi Çalışmalı  
```
1. Temalar sayfasında "Taxi Türlihof" temasının altında
2. "Canlı Önizleme" (Live Preview) butonuna tıklayın
3. Site yeni tema ile görünmeli
```

#### Kontrol 3: Hata Mesajı Olmamalı
```
✅ "Fatal error" yok
✅ "Parse error" yok  
✅ Beyaz sayfa yok
✅ 500 internal server error yok
```

---

## 🛠️ 5. İLK YAPILANDIRMA

Tema başarıyla yüklendikten sonra:

### Adım 1: Tema Ayarlarına Gidin
```
WordPress Admin → Görünüm → Taxi Einstellungen
```

### Adım 2: Firma Bilgilerini Güncelleyin
```
WordPress Admin → Görünüm → Anpassen → Firmeninformationen

📞 Telefon: 076 611 31 31
📧 E-posta: info@taxiturlihof.ch
💬 WhatsApp: 41766113131
🔗 Backend URL: http://localhost:8001 (isteğe bağlı)
```

### Adım 3: Menü Oluşturun
```
WordPress Admin → Görünüm → Menüler

1. "Yeni menü oluştur" tıklayın
2. Menü adı: "Ana Menü" veya "Hauptmenü"
3. Şu sayfaları ekleyin:
   - Ana Sayfa
   - Preisrechner
   - Buchen
   - Taxi Luzern
   - Taxi Schwyz  
   - Taxi Zug
   - Flughafentransfer
   - Flotte
   - Kontakt
4. Menü konumu: "Hauptmenü" seçin
5. "Menüyü Kaydet" tıklayın
```

---

## 🚨 6. SORUN GİDERME

### Yaygın Sorunlar ve Çözümleri:

#### Sorun 1: "Dosya Çok Büyük" Hatası
```
Çözüm:
- ZIP dosyası 10MB'den küçük olmalı
- Gereksiz dosyaları çıkarın (README, dokümantasyon)
- FTP ile manuel yükleme yapın
```

#### Sorun 2: "Geçerli WordPress Teması Değil" Hatası
```
Çözüm:
- style.css dosyasının başında theme header olmalı:
  /*
  Theme Name: Taxi Türlihof
  Description: ...
  */
- Klasör yapısını kontrol edin
- index.php dosyası mevcut olmalı
```

#### Sorun 3: ZIP Yükleme Çalışmıyor
```
Çözüm:
- FTP ile manuel yükleme yapın
- Hosting sağlayıcısına dosya yükleme limitini sorun
- Web hosting kontrol panelinden File Manager kullanın
```

#### Sorun 4: Tema Etkinleştikten Sonra Site Bozuldu
```
Çözüm:
- FTP ile eski temanızı aktif edin
- functions.php dosyasında syntax hatası kontrol edin
- WordPress debug modunu açın
- Eklentileri devre dışı bırakın
```

#### Sorun 5: Sayfa Bulunamıyor (404) Hatası  
```
Çözüm:
- WordPress Admin → Ayarlar → Kalıcı Bağlantılar
- "Kaydet" butonuna tıklayın (değişiklik yapmadan)
- .htaccess dosyasını kontrol edin
```

---

## 📋 7. KURULUM KONTROL LİSTESİ

Kurulumdan sonra bu kontrolleri yapın:

### ✅ Temel Kontroller:
- [ ] Tema listesinde "Taxi Türlihof" görünüyor
- [ ] Tema aktif ve çalışıyor
- [ ] Ana sayfa düzgün yükleniyor
- [ ] Hata mesajı yok

### ✅ Sayfa Kontrolleri:
- [ ] /preisrechner sayfası açılıyor
- [ ] /buchen sayfası açılıyor
- [ ] /flotte sayfası açılıyor
- [ ] /kontakt sayfası açılıyor
- [ ] /taxi-luzern sayfası açılıyor

### ✅ Fonksiyon Kontrolleri:
- [ ] Menü çalışıyor
- [ ] WhatsApp butonu doğru numaraya gidiyor
- [ ] Telefon butonu çalışıyor
- [ ] Mobilde görünüm düzgün

### ✅ Admin Panel Kontrolleri:
- [ ] "Flottengalerie" menüsü var
- [ ] "Buchungen" menüsü var
- [ ] "Kontaktanfragen" menüsü var
- [ ] "Taxi Einstellungen" menüsü var

---

## 🎉 8. KURULUM TAMAMLANDI!

Eğer yukarıdaki tüm kontroller başarılıysa:

### ✅ BAŞARIYLA KURULDU!
```
🎯 WordPress temanız hazır
🚗 Taxi Türlihof sitesi çalışıyor
📱 Müşteriler online rezervasyon yapabilir
💰 Fiyat hesaplayıcısı çalışıyor
📧 İletişim formları çalışıyor
```

### 🚀 Sonraki Adımlar:
1. **İçerik Ekleyin:** Filo fotoğrafları, blog yazıları
2. **Test Edin:** Tüm formları ve özellikleri test edin
3. **SEO Yapın:** Arama motorları için optimize edin
4. **Yedekleyin:** Düzenli yedekleme sistemi kurun

---

**🎊 Tebrikler! Taxi Türlihof WordPress siteniz başarıyla kuruldu ve çalışıyor!**

Bu rehberi takip ederek temanızı sorunsuz yükleyebilirsiniz. Herhangi bir sorunla karşılaştığınızda sorun giderme bölümüne bakın.