# 🐙 GitHub'a Yükleme - Git Komutları

## Yöntem 1: Klasör İçinden Git İle

```bash
# 1. WordPress theme klasörüne gidin
cd wordpress-theme

# 2. Git repository başlatın
git init

# 3. Tüm dosyaları ekleyin
git add .

# 4. İlk commit yapın
git commit -m "Initial Taxi Türlihof WordPress theme with React integration"

# 5. GitHub repository'nizi bağlayın
git remote add origin https://github.com/KULLANICI_ADINIZ/taxi-turlihof-wordpress.git

# 6. GitHub'a yükleyin
git push -u origin main
```

## Yöntem 2: Tüm Proje İle

```bash
# 1. Ana klasöre gidin
cd /app

# 2. Git repository başlatın
git init

# 3. Tüm dosyaları ekleyin
git add wordpress-theme/
git add frontend/
git add backend/

# 4. Commit yapın
git commit -m "Complete Taxi Türlihof project - WordPress + React + FastAPI"

# 5. GitHub'a bağlayın ve yükleyin
git remote add origin https://github.com/KULLANICI_ADINIZ/taxi-turlihof-complete.git
git push -u origin main
```

## Gelecek Güncellemeler İçin

```bash
# Değişiklik yaptıktan sonra
git add .
git commit -m "Update: açıklama buraya"
git push
```