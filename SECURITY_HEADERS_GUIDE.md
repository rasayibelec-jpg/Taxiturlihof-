# 🔒 Security Headers Implementation Guide - Taxi Türlihof

**Datum:** 03.12.2025
**Status:** ⚠️ ERFORDERT SERVER-KONFIGURATION

---

## ⚠️ WICHTIG

Diese Security Headers **können nicht im Frontend-Code** gesetzt werden.
Sie müssen auf **Server-Ebene** (Nginx, Apache, oder Kubernetes Ingress) konfiguriert werden.

**Kontaktieren Sie das Emergent Support Team** für die Implementierung.

---

## 📋 TASK 8 - Content Security Policy (CSP)

### Header Name:
```
Content-Security-Policy
```

### Empfohlener Wert:
```
default-src 'self'; 
img-src 'self' https: data:; 
script-src 'self' https://maps.googleapis.com https://www.googletagmanager.com 'unsafe-inline'; 
style-src 'self' https: 'unsafe-inline'; 
connect-src 'self' https: wss:; 
font-src 'self' https://fonts.gstatic.com; 
frame-src 'self' https://www.google.com;
```

### Was es tut:
- Blockiert unerlaubte externe Skripte
- Verhindert XSS (Cross-Site Scripting) Angriffe
- Erlaubt nur vertrauenswürdige Quellen

### Nginx Konfiguration:
```nginx
add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://maps.googleapis.com https://www.googletagmanager.com 'unsafe-inline'; style-src 'self' https: 'unsafe-inline'; connect-src 'self' https: wss:; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.google.com;" always;
```

---

## 📋 TASK 9 - Cross-Origin-Opener-Policy (COOP)

### Header Name:
```
Cross-Origin-Opener-Policy
```

### Empfohlener Wert:
```
same-origin
```

### Was es tut:
- Isoliert das Fenster von anderen Origins
- Verhindert Cross-Origin Angriffe
- Verbessert die Sicherheit bei window.open()

### Nginx Konfiguration:
```nginx
add_header Cross-Origin-Opener-Policy "same-origin" always;
```

---

## 📋 TASK 10 - Clickjacking Schutz (X-Frame-Options)

### Header Name:
```
X-Frame-Options
```

### Empfohlener Wert:
```
DENY
```

### Alternative (in CSP):
```
frame-ancestors 'none';
```

### Was es tut:
- Verhindert, dass die Seite in einem iframe eingebettet wird
- Schützt vor Clickjacking-Angriffen
- DENY = komplett blockieren

### Nginx Konfiguration:
```nginx
add_header X-Frame-Options "DENY" always;
```

---

## 📋 TASK 11 - HTTP Strict Transport Security (HSTS)

### Header Name:
```
Strict-Transport-Security
```

### Empfohlener Wert:
```
max-age=63072000; includeSubDomains; preload
```

### Was es tut:
- Erzwingt HTTPS für 2 Jahre (63072000 Sekunden)
- Gilt auch für alle Subdomains
- Kann in HSTS Preload Liste aufgenommen werden

### Nginx Konfiguration:
```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

---

## 🔧 KOMPLETTE NGINX KONFIGURATION

### Alle Headers zusammen:

```nginx
server {
    listen 443 ssl http2;
    server_name taxiturlihof.ch www.taxiturlihof.ch;

    # SSL Zertifikate
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security Headers
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://maps.googleapis.com https://www.googletagmanager.com 'unsafe-inline'; style-src 'self' https: 'unsafe-inline'; connect-src 'self' https: wss:; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.google.com;" always;
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header X-Frame-Options "DENY" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(self), microphone=(), camera=()" always;

    # Rest der Konfiguration...
    location / {
        proxy_pass http://frontend:3000;
    }
}
```

---

## 🐳 KUBERNETES INGRESS KONFIGURATION

### Für Emergent Platform (falls Kubernetes verwendet wird):

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: taxiturlihof-ingress
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |
      add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://maps.googleapis.com https://www.googletagmanager.com 'unsafe-inline'; style-src 'self' https: 'unsafe-inline'; connect-src 'self' https: wss:; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.google.com;" always;
      add_header Cross-Origin-Opener-Policy "same-origin" always;
      add_header X-Frame-Options "DENY" always;
      add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
      add_header X-Content-Type-Options "nosniff" always;
spec:
  rules:
  - host: taxiturlihof.ch
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 3000
```

---

## ✅ VERIFICATION (Nach Implementierung)

### Test mit curl:
```bash
curl -I https://www.taxiturlihof.ch/
```

### Erwartete Header in der Response:
```
Content-Security-Policy: default-src 'self'; ...
Cross-Origin-Opener-Policy: same-origin
X-Frame-Options: DENY
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Online Tools zum Testen:
- https://securityheaders.com/?q=taxiturlihof.ch
- https://observatory.mozilla.org/analyze/taxiturlihof.ch

---

## 📊 ERWARTETE VERBESSERUNGEN

**Vor der Implementierung:**
- Security Score: D oder F

**Nach der Implementierung:**
- Security Score: A oder A+
- Schutz vor: XSS, Clickjacking, Man-in-the-Middle
- Besseres Ranking bei Sicherheitsaudits

---

## 🆘 SUPPORT

**Wenden Sie sich an:**
- Emergent Platform Support Team
- Ticket erstellen mit Referenz: "Security Headers Implementation"
- Dieses Dokument als Anhang mitschicken

**Zeitaufwand für Emergent:**
- ~15-30 Minuten für die Konfiguration
- Sofort wirksam nach Deploy

---

**Status:** Dokumentation komplett ✅
**Nächster Schritt:** An Emergent Support weiterleiten
