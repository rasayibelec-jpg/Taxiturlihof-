"""
WhatsApp Service für Taxi Türlihof
Einfache Integration über WhatsApp-Links (keine API-Keys erforderlich)
"""
import urllib.parse
import logging

logger = logging.getLogger(__name__)

class WhatsAppService:
    def __init__(self):
        self.business_number = "41766113131"  # Taxi Türlihof Nummer (ohne + und Leerzeichen)
    
    def create_whatsapp_link(self, phone_number: str, message: str) -> str:
        """
        Erstellt einen WhatsApp-Link der automatisch Chat öffnet mit vorgefertigter Nachricht
        """
        # Telefonnummer formatieren (alle Sonderzeichen entfernen)
        clean_phone = phone_number.replace("+", "").replace(" ", "").replace("-", "")
        if clean_phone.startswith("0"):
            clean_phone = "41" + clean_phone[1:]  # Schweizer Nummer: 0XX -> 41XX
        
        # Nachricht URL-encode
        encoded_message = urllib.parse.quote(message)
        
        # WhatsApp-Link erstellen
        whatsapp_url = f"https://wa.me/{clean_phone}?text={encoded_message}"
        
        return whatsapp_url
    
    def send_booking_confirmation_message(self, booking_data: dict) -> str:
        """
        Erstellt WhatsApp-Nachricht für Buchungsbestätigung
        """
        message = f"""✅ *Taxi Türlihof - Buchung bestätigt*

📋 *Buchungsdetails:*
• Buchung Nr: #{booking_data.get('id', 'N/A')[:8]}
• Von: {booking_data.get('pickup_location', 'N/A')}
• Nach: {booking_data.get('destination', 'N/A')}
• Datum/Zeit: {booking_data.get('pickup_datetime', 'N/A')}
• Fahrzeugtyp: {booking_data.get('vehicle_type', 'Standard')}
• Preis: CHF {booking_data.get('total_fare', 'N/A')}

🚗 *Ihr Taxi wurde bestätigt!*
Unser Fahrer wird pünktlich bei Ihnen sein.

📞 Bei Fragen: +41 76 611 31 31
🌐 www.taxiturlihof.ch

Mit freundlichen Grüßen
Ihr Team von Taxi Türlihof"""

        return message
    
    def send_driver_update_message(self, booking_data: dict, status: str) -> str:
        """
        Erstellt WhatsApp-Nachricht für Fahrt-Updates
        """
        status_messages = {
            "in_progress": {
                "emoji": "🚗",
                "title": "Ihr Taxi ist unterwegs!",
                "message": "Unser Fahrer ist jetzt auf dem Weg zu Ihrem Abholort. Bitte halten Sie sich bereit."
            },
            "completed": {
                "emoji": "🎉",
                "title": "Fahrt erfolgreich abgeschlossen!",
                "message": "Vielen Dank für die Nutzung unseres Taxi-Service. Wir hoffen, Sie hatten eine angenehme Fahrt."
            },
            "cancelled": {
                "emoji": "❌",
                "title": "Buchung wurde storniert",
                "message": "Ihre Buchung wurde leider storniert. Bei Fragen kontaktieren Sie uns gerne."
            }
        }
        
        status_info = status_messages.get(status, {
            "emoji": "📱",
            "title": "Buchungs-Update",
            "message": f"Status Ihrer Buchung wurde auf '{status}' aktualisiert."
        })
        
        message = f"""{status_info['emoji']} *Taxi Türlihof - {status_info['title']}*

{status_info['message']}

📋 *Buchungsdetails:*
• Buchung Nr: #{booking_data.get('id', 'N/A')[:8]}
• Von: {booking_data.get('pickup_location', 'N/A')} 
• Nach: {booking_data.get('destination', 'N/A')}

📞 Kontakt: +41 76 611 31 31
🌐 www.taxiturlihof.ch

Ihr Team von Taxi Türlihof"""

        return message
    
    def send_review_reminder_message(self, booking_data: dict) -> str:
        """
        Erstellt WhatsApp-Nachricht für Bewertungserinnerung
        """
        message = f"""⭐ *Taxi Türlihof - Wie war Ihre Fahrt?*

Vielen Dank für Ihre Fahrt mit Taxi Türlihof!

🚗 *Fahrt:* {booking_data.get('pickup_location', 'N/A')} → {booking_data.get('destination', 'N/A')}
📅 *Datum:* {booking_data.get('pickup_datetime', 'N/A')}

Wenn Sie zufrieden waren, würden wir uns über eine Google-Bewertung freuen:

⭐⭐⭐⭐⭐ *Jetzt bewerten:*
https://www.google.com/search?q=Taxi+T%C3%BCrlihof+Bewertung

Oder direkt über Google suchen: "Taxi Türlihof"

Ihre Bewertung hilft anderen Kunden und unterstützt unser kleines Familienunternehmen! 💙

📞 +41 76 611 31 31
🌐 www.taxiturlihof.ch

Herzlichen Dank!
Ihr Team von Taxi Türlihof"""

        return message
    
    def get_customer_whatsapp_link(self, customer_phone: str, message: str) -> str:
        """
        Generiert WhatsApp-Link für Kundenansprache
        """
        return self.create_whatsapp_link(customer_phone, message)
    
    def get_business_whatsapp_link(self, message: str = None) -> str:
        """
        Generiert WhatsApp-Link für direkte Kontaktaufnahme mit dem Business
        """
        if not message:
            message = "Hallo Taxi Türlihof! Ich möchte gerne eine Fahrt buchen."
        
        return self.create_whatsapp_link(self.business_number, message)

# Service-Instance erstellen
whatsapp_service = WhatsAppService()