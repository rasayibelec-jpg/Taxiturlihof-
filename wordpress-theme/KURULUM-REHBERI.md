# Taxi Türlihof WordPress Teması - Kurulum Rehberi

Bu rehber, Taxi Türlihof WordPress temasının nasıl kurulacağını ve yapılandırılacağını açıklar.

## 📋 Gereksinimler

- WordPress 5.0 veya üzeri
- PHP 7.4 veya üzeri
- MySQL 5.6 veya üzeri
- HTTPS destekli hosting

## 🚀 Kurulum Adımları

### 1. Tema Dosyalarını Yükleme

1. Tema klasörünü (`taxi-turlihof`) WordPress sitenizin `/wp-content/themes/` dizinine yükleyin
2. WordPress yönetim paneline giriş yapın
3. **Görünüm > Temalar** menüsüne gidin
4. "Taxi Türlihof" temasını bulun ve **Etkinleştir** butonuna tıklayın

### 2. İlk Kurulum

Tema etkinleştirildikten sonra:

1. **Görünüm > Taxi Settings** menüsüne gidin
2. Kurulum talimatlarını takip edin
3. **Görünüm > Özelleştir** menüsünden şirket bilgilerini güncelleyin

## ⚙️ Yapılandırma

### Şirket Bilgileri (WordPress Özelleştirici)

**Görünüm > Özelleştir > Company Information** bölümünden:

```
Telefon Numarası: 076 611 31 31
E-posta: info@taxiturlihof.ch
WhatsApp: 41766113131
Backend API URL: http://localhost:8001 (gerekirse değiştirin)
```

### Menü Ayarları

1. **Görünüm > Menüler** menüsüne gidin
2. Yeni menü oluşturun: "Ana Menü"
3. Aşağıdaki sayfaları ekleyin:
   - Ana Sayfa
   - Preisrechner (Fiyat Hesaplayıcısı)
   - Buchen (Rezervasyon)
   - Taxi Luzern
   - Taxi Schwyz
   - Taxi Zug
   - Flughafentransfer
   - Flotte (Filo)
   - Kontakt
4. Menüyü "Primary Menu" konumuna atayın

### Filo Galerisi Kurulumu

1. **Fleet Gallery** menüsüne gidin
2. **Add New Image** butonuna tıklayın
3. Her araç için:
   - Başlık ekleyin (örn: "Mercedes V-Klasse Van")
   - Öne çıkan görsel yükleyin
   - Araç türünü seçin (Standard/Premium/Van)
   - Kapasite bilgisini girin
   - Açıklama yazın

**Önerilen Araç Görselleri:**
- Mercedes C/E-Klasse (Standard) - 4 kişi
- Mercedes S-Klasse (Premium) - 4 kişi
- Mercedes V-Klasse (Van) - 8 kişi

## 📱 Özellikler

### Ana Sayfa İçerikleri

Tema otomatik olarak şunları içerir:

- **Hero Bölümü**: Şirket logosu ve ana mesaj
- **Hizmetler**: 3 ana hizmet kartı
- **Filo Galerisi**: Araç görselleri ile dönen galeri
- **Fiyat Hesaplayıcısı CTA**: Hesaplayıcıya yönlendirme
- **İletişim Bilgileri**: Telefon, e-posta, WhatsApp

### Özel Sayfalar

Tema şu özel sayfaları içerir:

1. **Preisrechner** (`/preisrechner`): Canlı fiyat hesaplama
2. **Buchen** (`/buchen`): Online rezervasyon formu
3. **Flotte** (`/flotte`): Detaylı araç galerisi
4. **Flughafentransfer** (`/flughafentransfer`): Havalimanı transferi
5. **Taxi Luzern/Schwyz/Zug**: Şehir özel sayfaları
6. **Blog** (`/blog`): Haberler ve duyurular
7. **FAQ** (`/faq`): Sık sorulan sorular

### Rezervasyon Sistemi

**Admin Panelinde:**
- **Bookings**: Gelen rezervasyonları görüntüleme
- **Contact Messages**: İletişim form mesajları
- Otomatik e-posta bildirimleri

### Fiyat Hesaplayıcısı

- Gerçek zamanlı mesafe hesaplama (Backend API gerekli)
- Google Maps entegrasyonu
- WhatsApp ile rezervasyon yönlendirmesi

## 🔧 Backend Entegrasyonu

### API Bağlantısı

Fiyat hesaplama özelliği için backend API gereklidir:

1. **Özelleştir > Company Information** bölümünden Backend URL'i ayarlayın
2. Backend API'nin çalıştığından emin olun
3. Test edin: `/preisrechner` sayfasında hesaplama yapın

### E-posta Ayarları

WordPress e-posta ayarlarını yapılandırın:
- SMTP eklentisi kullanın (önerilir)
- Admin e-posta adresini ayarlayın
- E-posta bildirimleri test edin

## 📊 İçerik Yönetimi

### Filo Görsellerini Güncelleme

1. **Fleet Gallery > Add New Image**
2. Yüksek kaliteli Mercedes görselleri yükleyin
3. Araç detaylarını doldurun
4. Görsellerin boyutunu kontrol edin (800x400 px önerilir)

### Blog Yazıları

1. **Posts** bölümünden yeni yazılar ekleyin
2. Kategoriler oluşturun
3. SEO dostu başlıklar kullanın

### Rezervasyonları Yönetme

1. **Bookings** menüsünden rezervasyonları görüntüleyin
2. Durumlarını güncelleyin (Pending/Confirmed/Completed/Cancelled)
3. Müşterilerle iletişim kurun

## 🔍 SEO Optimizasyonu

Tema otomatik olarak şunları içerir:

- **Schema Markup**: Yerel işletme şeması
- **Meta Tags**: Open Graph, Twitter kartları
- **Yapılandırılmış Veri**: Hizmet alanları ve işletme bilgileri
- **Site Haritası**: WordPress SEO eklentisi ile uyumlu

### Önerilen SEO Eklentileri

- **Yoast SEO** veya **RankMath**
- **Google Site Kit**
- **W3 Total Cache** (performans için)

## 📱 Mobil Uyumluluk

Tema tam responsive tasarıma sahiptir:
- Mobil menü
- Dokunmatik galeri kontrolleri
- Mobil uyumlu formlar
- WhatsApp ve telefon butonları

## 🛠️ Sorun Giderme

### Yaygın Sorunlar

**1. Fiyat hesaplayıcısı çalışmıyor:**
- Backend URL'ini kontrol edin
- API'nin çalıştığından emin olun
- Hata konsolunu kontrol edin

**2. Rezervasyon e-postaları gitmiyor:**
- WordPress e-posta ayarlarını kontrol edin
- Admin e-posta adresini doğrulayın
- SMTP eklentisi kurun

**3. Filo görselleri görünmüyor:**
- Görsellerin doğru yüklendiğinden emin olun
- Dosya izinlerini kontrol edin
- Önbelleği temizleyin

### Debug Modu

Sorunları tespit etmek için:

```php
// wp-config.php dosyasına ekleyin
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## 📞 Destek

### Teknik Destek

- **Kurulum sorunları**: Hosting sağlayıcınızla iletişime geçin
- **Özelleştirmeler**: Geliştiricinizle iletişime geçin
- **WordPress genel sorunlar**: WordPress.org topluluk forumları

### Güncelleme ve Bakım

- WordPress'i düzenli güncelleyin
- Tema dosyalarını yedekleyin
- Rezervasyon işlevlerini test edin
- İletişim formlarını kontrol edin

## 📋 Kontrol Listesi

Kurulum sonrası kontrol edilecek:

- [ ] Tema aktif ve görsel görünüyor
- [ ] Menü kurulmuş ve çalışıyor
- [ ] Şirket bilgileri güncellendi
- [ ] Filo görselleri yüklendi
- [ ] Fiyat hesaplayıcısı test edildi
- [ ] Rezervasyon formu test edildi
- [ ] İletişim formu test edildi
- [ ] E-posta bildirimleri çalışıyor
- [ ] Mobil görünüm kontrol edildi
- [ ] SEO ayarları yapıldı

## 🎯 İleri Düzey Özelleştirmeler

### CSS Değişiklikleri

Özel CSS için **Görünüm > Özelleştir > Additional CSS** kullanın:

```css
/* Örnek: Ana renk değişikliği */
.btn-primary {
    background-color: #your-color;
}
```

### Renkler ve Fontlar

Tema varsayılan olarak şu renkleri kullanır:
- Ana renk: #f59e0b (amber)
- İkincil renk: #10b981 (emerald)
- Metin rengi: #374151 (gray)

## 📈 Performans Optimizasyonu

- **Görselleri optimize edin** (WebP formatı önerilir)
- **Önbellek eklentisi kullanın**
- **CDN hizmeti düşünün**
- **Gereksiz eklentileri kaldırın**

## 🔒 Güvenlik

- WordPress'i güncel tutun
- Güçlü şifreler kullanın
- Güvenlik eklentisi kurun
- Düzenli yedekleme yapın

---

**Not**: Bu tema özellikle Taxi Türlihof için geliştirilmiştir. Başka projeler için kullanım öncesinde geliştiricinizle görüşün.