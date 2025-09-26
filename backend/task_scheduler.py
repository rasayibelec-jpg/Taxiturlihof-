"""
Task Scheduler für automatische Bewertungserinnerungen
Sendet E-Mail und WhatsApp-Links 1 Stunde nach Fahrtende
"""
import asyncio
import logging
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
import os
from dotenv import load_dotenv

from email_service import email_service
from whatsapp_service import whatsapp_service

# Environment laden
load_dotenv(Path(__file__).parent / ".env")

logger = logging.getLogger(__name__)

class TaskScheduler:
    def __init__(self):
        self.mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
        self.db_name = os.environ.get('DB_NAME', 'taxi_luzern')
        self.client = None
        self.db = None
        self.running = False
    
    async def connect(self):
        """Verbindung zur Datenbank herstellen"""
        self.client = AsyncIOMotorClient(self.mongo_url)
        self.db = self.client[self.db_name]
        logger.info("Task Scheduler connected to database")
    
    async def disconnect(self):
        """Datenbankverbindung schließen"""
        if self.client:
            self.client.close()
            logger.info("Task Scheduler disconnected from database")
    
    async def start_scheduler(self):
        """Startet den Scheduler (läuft kontinuierlich)"""
        if not self.client:
            await self.connect()
        
        self.running = True
        logger.info("Task Scheduler started")
        
        while self.running:
            try:
                await self.check_review_reminders()
                await asyncio.sleep(300)  # Alle 5 Minuten prüfen
            except Exception as e:
                logger.error(f"Task Scheduler error: {str(e)}")
                await asyncio.sleep(60)  # Bei Fehler 1 Minute warten
    
    async def stop_scheduler(self):
        """Stoppt den Scheduler"""
        self.running = False
        await self.disconnect()
        logger.info("Task Scheduler stopped")
    
    async def check_review_reminders(self):
        """
        Prüft auf abgeschlossene Fahrten die eine Bewertungserinnerung benötigen
        """
        try:
            # Suche nach Buchungen die:
            # 1. Status "completed" haben
            # 2. Vor mindestens 1 Stunde abgeschlossen wurden
            # 3. Noch keine Bewertungserinnerung gesendet wurde
            
            one_hour_ago = datetime.utcnow() - timedelta(hours=1)
            
            completed_bookings = await self.db.bookings.find({
                "status": "completed",
                "updated_at": {"$lte": one_hour_ago},
                "review_reminder_sent": {"$ne": True}
            }).to_list(length=50)
            
            if completed_bookings:
                logger.info(f"Found {len(completed_bookings)} bookings ready for review reminders")
            
            for booking in completed_bookings:
                await self.send_review_reminder(booking)
                
        except Exception as e:
            logger.error(f"Error checking review reminders: {str(e)}")
    
    async def send_review_reminder(self, booking: dict):
        """
        Sendet Bewertungserinnerung per E-Mail und generiert WhatsApp-Link
        """
        try:
            booking_id = booking.get('id')
            customer_email = booking.get('customer_email')
            customer_name = booking.get('customer_name', 'Lieber Kunde')
            customer_phone = booking.get('customer_phone')
            
            # E-Mail-Bewertungserinnerung senden
            if customer_email:
                await self.send_review_email(booking)
            
            # WhatsApp-Link für Admin generieren (falls Telefonnummer vorhanden)
            whatsapp_link = None
            if customer_phone:
                whatsapp_message = whatsapp_service.send_review_reminder_message(booking)
                whatsapp_link = whatsapp_service.get_customer_whatsapp_link(
                    customer_phone, 
                    whatsapp_message
                )
                
                # WhatsApp-Link in der Datenbank speichern für Admin-Zugriff
                await self.db.bookings.update_one(
                    {"id": booking_id},
                    {
                        "$set": {
                            "review_whatsapp_link": whatsapp_link,
                            "review_reminder_generated_at": datetime.utcnow()
                        }
                    }
                )
            
            # Markiere als Erinnerung gesendet
            await self.db.bookings.update_one(
                {"id": booking_id},
                {
                    "$set": {
                        "review_reminder_sent": True,
                        "review_reminder_sent_at": datetime.utcnow()
                    }
                }
            )
            
            logger.info(f"Review reminder sent for booking {booking_id} to {customer_email}")
            
        except Exception as e:
            logger.error(f"Error sending review reminder for booking {booking.get('id')}: {str(e)}")
    
    async def send_review_email(self, booking: dict):
        """
        Sendet Bewertungserinnerung per E-Mail
        """
        customer_email = booking.get('customer_email')
        customer_name = booking.get('customer_name', 'Lieber Kunde')
        
        email_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">⭐ Wie war Ihre Fahrt mit Taxi Türlihof?</h2>
            
            <p>Hallo {customer_name},</p>
            
            <p>vielen Dank für Ihre Fahrt mit Taxi Türlihof! Wir hoffen, Sie hatten eine angenehme und sichere Reise.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">🚗 Ihre Fahrt:</h3>
                <p><strong>Von:</strong> {booking.get('pickup_location', 'N/A')}</p>
                <p><strong>Nach:</strong> {booking.get('destination', 'N/A')}</p>
                <p><strong>Datum:</strong> {booking.get('pickup_datetime', 'N/A')}</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">🌟 Waren Sie zufrieden?</h3>
                <p>Ihre Bewertung bei Google würde uns sehr helfen!</p>
                
                <a href="https://www.google.com/search?q=Taxi+T%C3%BCrlihof+Bewertung" 
                   style="display: inline-block; background: #059669; color: white; padding: 15px 30px; 
                          border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px;">
                    ⭐⭐⭐⭐⭐ Jetzt bewerten
                </a>
                
                <p style="font-size: 14px; color: #6b7280; margin-top: 15px;">
                    Oder suchen Sie einfach "Taxi Türlihof" bei Google
                </p>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;">
                Ihre Bewertung hilft anderen Kunden, unseren Service zu finden, und unterstützt unser kleines Familienunternehmen. 
                Vielen herzlichen Dank! 💙
            </p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 30px;">
                <p style="margin: 0;"><strong>📞 Kontakt:</strong> 076 611 31 31</p>
                <p style="margin: 5px 0 0 0;"><strong>🌐 Website:</strong> www.taxi-tuerlihof.ch</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #6b7280;">
                Mit freundlichen Grüßen<br>
                <strong>Ihr Team von Taxi Türlihof</strong><br>
                Zuverlässig • Pünktlich • Komfortabel
            </p>
        </div>
        """
        
        await email_service.send_email(
            to_email=customer_email,
            subject="⭐ Wie war Ihre Fahrt? - Taxi Türlihof",
            html_content=email_content,
            customer_name=customer_name
        )

# Globale Scheduler-Instance
task_scheduler = TaskScheduler()

# Hilfsfunktionen für den Server
async def start_background_tasks():
    """Startet Background Tasks (für main.py)"""
    await task_scheduler.start_scheduler()

async def stop_background_tasks():
    """Stoppt Background Tasks (für main.py)"""
    await task_scheduler.stop_scheduler()

if __name__ == "__main__":
    # Für direkten Test des Schedulers
    async def test_scheduler():
        await task_scheduler.connect()
        await task_scheduler.check_review_reminders()
        await task_scheduler.disconnect()
    
    asyncio.run(test_scheduler())