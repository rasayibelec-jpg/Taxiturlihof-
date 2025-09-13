# 🚗 Taxi Türlihof WordPress Theme

Professional WordPress theme for **Taxi Türlihof** with React integration, online booking system, and price calculator.

![WordPress](https://img.shields.io/badge/WordPress-21759B?style=for-the-badge&logo=wordpress&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)

---

## 🎯 **Project Overview**

This repository contains a complete WordPress theme for **Taxi Türlihof**, a professional taxi service in Central Switzerland (Luzern, Schwyz, Zug).

### ✨ **Key Features**

- 🚗 **Professional Taxi Website** - Complete business website
- 💰 **Price Calculator** - Real-time fare calculation with Google Maps API
- 📅 **Online Booking System** - Customer reservation system
- 🚙 **Fleet Gallery** - Mercedes vehicle showcase
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🌐 **German Language** - Fully localized for German-speaking customers
- ⚡ **React Integration** - Modern dynamic components
- 🎨 **WordPress Admin** - Easy content management

---

## 🏗️ **Architecture**

### **Dual Approach:**

1. **Classic WordPress Theme** - Traditional WordPress pages
2. **React Integration** - Dynamic single-page application

### **Tech Stack:**

- **Frontend:** React 18, Tailwind CSS, Shadcn/ui
- **Backend:** WordPress PHP, Custom Post Types
- **API Integration:** Google Maps, Email Services
- **Build Tools:** CRACO, Webpack
- **Database:** WordPress MySQL + Custom Fields

---

## 📦 **Installation**

### **Quick Install (5 minutes):**

```bash
# 1. Download the ZIP
# 2. WordPress Admin → Appearance → Themes → Add New → Upload Theme
# 3. Upload taxi-turlihof.zip
# 4. Activate theme
# 5. Configure company information
```

### **Detailed Installation:**

See `/docs/KURULUM-REHBERI.md` for step-by-step instructions.

---

## 🚀 **Quick Start**

### **1. Basic WordPress Theme:**
- Upload and activate theme
- Configure company info in Customizer
- Ready to use!

### **2. React Integration:**
- Create new page in WordPress
- Select "React Taxi App" template  
- Full React application loads

---

## 📁 **Project Structure**

```
wordpress-theme/
├── style.css                    # Main theme file
├── index.php                   # Homepage template  
├── functions.php               # WordPress functions
├── page-react.php              # React integration template
├── static/                     # React build files
│   ├── js/main.040f0c1e.js    # React JavaScript
│   └── css/main.3622ae45.css  # React CSS
├── assets/
│   ├── js/main.js             # WordPress JavaScript
│   └── images/                # Theme images
├── page-*.php                 # Page templates
│   ├── page-preisrechner.php  # Price calculator
│   ├── page-buchen.php        # Booking page
│   ├── page-flotte.php        # Fleet gallery
│   └── ...                    # More pages
└── docs/                      # Documentation
    ├── KURULUM-REHBERI.md     # Installation guide (Turkish)
    ├── HIZLI-BASLANGIC.md     # Quick start (Turkish)
    └── WORDPRESS-YUKLEME-REHBERI.md
```

---

## 🎨 **Features Details**

### **🧮 Price Calculator**
- Real-time distance calculation via Google Maps API
- Transparent pricing structure
- Multiple vehicle types (Standard, Premium, Van)
- WhatsApp integration for booking

### **📅 Booking System**
- Online reservation form
- Email confirmations
- Admin management panel
- Customer communication tools

### **🚙 Fleet Gallery**
- Mercedes vehicle showcase
- Customizable via WordPress admin
- Responsive image gallery
- Vehicle specifications

### **📱 Contact Options**
- 24/7 phone support: 076 611 31 31
- WhatsApp integration
- Email contact forms
- Multiple communication channels

---

## 🛠️ **Development**

### **React Development:**
```bash
cd frontend
npm install
npm start                    # Development server
npm run build               # Production build
```

### **WordPress Development:**
```bash
# Edit PHP files directly
# Use WordPress Customizer for configuration
# Test with local WordPress installation
```

---

## 📋 **Configuration**

### **Required Settings:**

1. **Company Information:**
   - Phone: 076 611 31 31
   - Email: info@taxiturlihof.ch
   - WhatsApp: 41766113131

2. **Service Areas:**
   - Luzern (primary)
   - Schwyz 
   - Zug
   - Airport transfers

3. **Fleet Vehicles:**
   - Mercedes C/E-Class (Standard)
   - Mercedes S-Class (Premium)  
   - Mercedes V-Class (Van)

---

## 🌍 **Localization**

- **Primary Language:** German
- **Region:** Switzerland (Central)
- **Currency:** Swiss Francs (CHF)
- **Phone Format:** Swiss format
- **Business Hours:** 24/7 service

---

## 📊 **Performance**

- ⚡ **Fast Loading:** Optimized assets
- 📱 **Mobile First:** Responsive design
- 🔍 **SEO Ready:** Structured data, meta tags
- 💾 **Lightweight:** Minimal dependencies
- 🚀 **Production Ready:** Tested and stable

---

## 🤝 **Contributing**

This is a custom business theme for Taxi Türlihof. For modifications or customizations, please contact the development team.

---

## 📞 **Support**

### **Business Contact:**
- **Website:** taxiturlihof.ch
- **Phone:** 076 611 31 31
- **Email:** info@taxiturlihof.ch
- **WhatsApp:** +41 76 611 31 31

### **Technical Support:**
- **Documentation:** `/docs/` folder
- **Installation Help:** See installation guides
- **Issues:** Open GitHub issue for technical problems

---

## 📄 **License**

Custom proprietary theme for Taxi Türlihof. All rights reserved.

---

## 🎯 **Version History**

- **v1.0.0** - Initial WordPress theme
- **v1.1.0** - React integration added
- **v1.2.0** - Mobile optimization
- **v1.3.0** - Admin panel improvements

---

## 🚗 **About Taxi Türlihof**

Professional taxi service operating in Central Switzerland since 2010. Specializing in:

- Local city transport
- Airport transfers  
- Business transportation
- Group travel
- 24/7 availability

**Service Areas:** Luzern • Schwyz • Zug • Airport Transfers

---

**Made with ❤️ for Taxi Türlihof**

*Professional transportation solutions in Central Switzerland*