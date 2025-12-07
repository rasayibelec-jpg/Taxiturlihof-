# 🖼️ WebP Conversion Guide - Quick Reference

**Für TASK 2: Bilder optimieren**

## 🚀 SCHNELLSTE METHODE

### Online Tool (Empfohlen):
1. Gehe zu: **https://squoosh.app/**
2. Drag & Drop dein Bild
3. Rechts wähle: **WebP**
4. Qualität: **80-85**
5. Download
6. Fertig!

### Batch-Konvertierung:
- **CloudConvert.com** - Mehrere Bilder auf einmal

---

## 📋 BILDER ZU KONVERTIEREN

**Logo (Priorität: HOCH):**
```
/app/frontend/public/nova-taxi-logo.jpg (202KB → Ziel: <50KB)
```

**Hero Images (11 Stück):**
- Von customer-assets URLs
- Aktuell: ~300-500 KB/Bild
- Ziel: ~80-120 KB/Bild

**Fleet Images (11 Stück):**
- Von customer-assets URLs  
- Aktuell: ~200-400 KB/Bild
- Ziel: ~60-100 KB/Bild

---

## ⚡ ERWARTETE EINSPARUNG

- **Logo:** 202KB → 30KB (-85%)
- **Alle Bilder:** ~6MB → ~2MB (-70%)
- **LCP Verbesserung:** 3-5s → 1-2s (-50%)

---

## 📝 CODE-ÄNDERUNG (Beispiel)

**Vorher:**
```jsx
<img src="/nova-taxi-logo.jpg" alt="Logo" />
```

**Nachher:**
```jsx
<img src="/nova-taxi-logo.webp" alt="Logo" width="48" height="48" />
```

---

**Tool:** https://squoosh.app/
**Zeit:** ~2-3 Minuten pro Bild
**Gesamt:** ~1 Stunde für alle Bilder
