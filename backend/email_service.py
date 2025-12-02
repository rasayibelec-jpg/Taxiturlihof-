import aiosmtplib
from email.message import EmailMessage
from jinja2 import Template
import os
from datetime import datetime
import logging
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.smtp_username = os.getenv('SMTP_USERNAME')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.email_from = os.getenv('EMAIL_FROM')
        self.email_from_name = os.getenv('EMAIL_FROM_NAME', 'Taxi Türlihof')

    async def send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None):
        """Send email using Gmail SMTP"""
        try:
            # Validate email parameters
            if not to_email or not subject or not html_content:
                logger.error("Missing required email parameters")
                return False
            
            message = EmailMessage()
            message["From"] = f"{self.email_from_name} <{self.email_from}>"
            message["To"] = to_email
            message["Subject"] = subject
            
            # Set proper encoding
            if text_content:
                message.set_content(text_content, charset='utf-8')
                message.add_alternative(html_content, subtype='html', charset='utf-8')
            else:
                message.set_content(html_content, subtype='html', charset='utf-8')
            
            # Send email
            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                start_tls=True,
                username=self.smtp_username,
                password=self.smtp_password,
                timeout=30
            )
            
            logger.info(f"Email sent successfully to {to_email} with subject: {subject}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False

    async def send_contact_form_email(self, name: str, email: str, phone: str, message: str):
        """Send contact form notification to business owner"""
        
        # Email to business owner
        owner_subject = f"Neue Kontaktanfrage von {name}"
        owner_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #FFA500; text-align: center;">📞 Neue Kontaktanfrage</h2>
                
                <div style="background-color: #FFF8DC; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #FF8C00;">Kundendaten:</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>E-Mail:</strong> <a href="mailto:{email}">{email}</a></p>
                    <p><strong>Telefon:</strong> <a href="tel:{phone}">{phone or 'Nicht angegeben'}</a></p>
                    <p><strong>Datum:</strong> {datetime.now().strftime('%d.%m.%Y %H:%M')}</p>
                </div>
                
                <div style="background-color: #F0F8FF; padding: 15px; border-radius: 5px;">
                    <h3 style="margin-top: 0; color: #1E90FF;">Nachricht:</h3>
                    <p style="background-color: white; padding: 10px; border-radius: 3px; border-left: 4px solid #FFA500;">
                        {message}
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #666; font-size: 14px;">
                        Diese E-Mail wurde automatisch über das Kontaktformular auf taxiturlihof.ch gesendet.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        owner_text = f"""
Neue Kontaktanfrage von {name}

Kundendaten:
Name: {name}
E-Mail: {email}
Telefon: {phone or 'Nicht angegeben'}
Datum: {datetime.now().strftime('%d.%m.%Y %H:%M')}

Nachricht:
{message}

Diese E-Mail wurde automatisch über das Kontaktformular auf taxiturlihof.ch gesendet.
        """
        
        # Send notification to business owner
        owner_success = await self.send_email(
            to_email=self.email_from,  # Send to business owner
            subject=owner_subject,
            html_content=owner_html,
            text_content=owner_text
        )
        
        # Send confirmation to customer
        customer_subject = "Bestätigung Ihrer Anfrage - Taxi Türlihof"
        customer_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #FFA500;">🚖 Taxi Türlihof</h2>
                    <p style="color: #666;">Ihr zuverlässiger Taxi-Service in der Zentralschweiz</p>
                </div>
                
                <h3 style="color: #FF8C00;">Liebe/r {name},</h3>
                
                <p>vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und werden uns so schnell wie möglich bei Ihnen melden.</p>
                
                <div style="background-color: #FFF8DC; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #FF8C00;">Ihre Anfrage:</h4>
                    <p style="background-color: white; padding: 10px; border-radius: 3px;">
                        {message}
                    </p>
                </div>
                
                <div style="background-color: #F0F8FF; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #1E90FF;">Für dringende Anfragen:</h4>
                    <p style="font-size: 18px; text-align: center;">
                        📞 <strong><a href="tel:076 611 31 31" style="color: #FFA500; text-decoration: none;">076 611 31 31</a></strong>
                    </p>
                    <p style="text-align: center; color: #666;">24 Stunden am Tag, 7 Tage die Woche</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="margin: 5px 0;"><strong>Taxi Türlihof</strong></p>
                    <p style="margin: 5px 0; color: #666;">Türlihof 4, 6414 Arth, Switzerland</p>
                    <p style="margin: 5px 0; color: #666;">
                        📧 <a href="mailto:rasayibelec@gmail.com" style="color: #FFA500;">rasayibelec@gmail.com</a> | 
                        🌐 <a href="https://www.taxiturlihof.ch" style="color: #FFA500;">www.taxiturlihof.ch</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        customer_text = f"""
Liebe/r {name},

vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und werden uns so schnell wie möglich bei Ihnen melden.

Ihre Anfrage:
{message}

Für dringende Anfragen:
Telefon: 076 611 31 31 (24/7)

Mit freundlichen Grüßen
Taxi Türlihof
Türlihof 4, 6414 Arth, Switzerland
rasayibelec@gmail.com | www.taxiturlihof.ch
        """
        
        customer_success = await self.send_email(
            to_email=email,
            subject=customer_subject,
            html_content=customer_html,
            text_content=customer_text
        )
        
        return owner_success and customer_success

# Global email service instance
email_service = EmailService()