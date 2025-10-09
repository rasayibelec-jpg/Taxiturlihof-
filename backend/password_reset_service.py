"""
Password Reset Service für Admin Panel - E-Mail und SMS Integration
"""
import hashlib
import secrets
import random
from datetime import datetime, timedelta
from typing import Optional, Dict, Literal
import pytz
import os
from dotenv import load_dotenv

# E-Mail Integration
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# SMS Integration  
from twilio.rest import Client as TwilioClient

# Load environment variables
load_dotenv()

# Temporary reset tokens storage (in production use Redis/Database)
reset_tokens = {}
sms_codes = {}

class PasswordResetService:
    def __init__(self):
        self.swiss_tz = pytz.timezone('Europe/Zurich')
        self.admin_email = "info@taxiturlihof.ch"  # Admin E-Mail
        self.admin_phone = "+41766113131"  # Admin Telefonnummer (Swiss format)
        
        # SendGrid Configuration
        self.sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
        self.sender_email = os.getenv('SENDER_EMAIL', 'admin@taxiturlihof.ch')
        
        # Twilio Configuration
        self.twilio_account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.twilio_auth_token = os.getenv('TWILIO_AUTH_TOKEN') 
        self.twilio_phone_number = os.getenv('TWILIO_PHONE_NUMBER')
        
        # Initialize clients
        self.sendgrid_client = None
        self.twilio_client = None
        
        if self.sendgrid_api_key:
            self.sendgrid_client = SendGridAPIClient(self.sendgrid_api_key)
        
        if self.twilio_account_sid and self.twilio_auth_token:
            self.twilio_client = TwilioClient(self.twilio_account_sid, self.twilio_auth_token)
        
    def generate_reset_token(self) -> str:
        """Generate secure reset token"""
        return secrets.token_urlsafe(32)
    
    def generate_sms_code(self) -> str:
        """Generate 6-digit SMS verification code"""
        return str(random.randint(100000, 999999))
    
    def create_email_reset_request(self, email: str) -> Optional[str]:
        """Create email-based password reset request"""
        if email.lower() != self.admin_email.lower():
            return None
            
        token = self.generate_reset_token()
        expires_at = datetime.now(self.swiss_tz) + timedelta(minutes=30)
        
        reset_tokens[token] = {
            'email': email,
            'expires_at': expires_at,
            'used': False,
            'method': 'email'
        }
        
        return token
    
    def create_sms_reset_request(self, phone: str) -> Optional[str]:
        """Create SMS-based password reset request"""
        if phone != self.admin_phone:
            return None
            
        code = self.generate_sms_code()
        expires_at = datetime.now(self.swiss_tz) + timedelta(minutes=10)  # SMS codes expire faster
        
        sms_codes[code] = {
            'phone': phone,
            'expires_at': expires_at,
            'used': False,
            'method': 'sms'
        }
        
        return code
    
    def verify_reset_token(self, token: str) -> bool:
        """Verify if email reset token is valid"""
        if token not in reset_tokens:
            return False
            
        token_data = reset_tokens[token]
        now = datetime.now(self.swiss_tz)
        
        if token_data['used'] or now > token_data['expires_at']:
            return False
            
        return True
    
    def verify_sms_code(self, code: str) -> bool:
        """Verify if SMS code is valid"""
        if code not in sms_codes:
            return False
            
        code_data = sms_codes[code]
        now = datetime.now(self.swiss_tz)
        
        if code_data['used'] or now > code_data['expires_at']:
            return False
            
        return True
    
    def use_reset_token(self, token: str) -> bool:
        """Mark email reset token as used"""
        if not self.verify_reset_token(token):
            return False
            
        reset_tokens[token]['used'] = True
        return True
    
    def use_sms_code(self, code: str) -> bool:
        """Mark SMS code as used"""
        if not self.verify_sms_code(code):
            return False
            
        sms_codes[code]['used'] = True
        return True
    
    def send_reset_email(self, token: str) -> bool:
        """Send password reset email via SendGrid"""
        try:
            if not self.sendgrid_client:
                # Fallback to console output for development
                return self._send_mock_email(token)
            
            reset_link = f"https://www.taxiturlihof.ch/admin-reset?token={token}"
            
            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; border-bottom: 2px solid #1f2937; padding-bottom: 20px; margin-bottom: 30px;">
                    <h1 style="color: #1f2937; margin: 0;">🔐 Taxi Türlihof</h1>
                    <p style="color: #6b7280; margin: 5px 0 0 0;">Admin Passwort Reset</p>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 30px;">
                    <h2 style="color: #92400e; margin-top: 0;">Passwort-Reset angefordert</h2>
                    <p style="color: #92400e; margin-bottom: 0;">
                        Eine Anfrage zum Zurücksetzen des Admin-Passworts wurde für Ihr Konto gestellt.
                    </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_link}" 
                       style="background: #1f2937; color: white; padding: 12px 30px; text-decoration: none; 
                              border-radius: 6px; font-weight: bold; display: inline-block;">
                        ✅ Passwort zurücksetzen
                    </a>
                </div>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h3 style="color: #1f2937; margin-top: 0;">⚠️ Sicherheitshinweise:</h3>
                    <ul style="color: #374151; margin: 0; padding-left: 20px;">
                        <li>Dieser Link ist nur 30 Minuten gültig</li>
                        <li>Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail</li>
                        <li>Der Link kann nur einmal verwendet werden</li>
                        <li>Teilen Sie diesen Link niemals mit anderen</li>
                    </ul>
                </div>
                
                <div style="background: #dcfce7; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #166534;">
                        <strong>📞 Support:</strong> Bei Fragen kontaktieren Sie uns unter 076 611 31 31
                    </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                
                <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                    Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht darauf.<br>
                    © 2025 Taxi Türlihof - Zuverlässig • Pünktlich • Komfortabel
                </p>
            </div>
            """
            
            message = Mail(
                from_email=self.sender_email,
                to_emails=self.admin_email,
                subject="🔐 Admin Passwort Reset - Taxi Türlihof",
                html_content=html_content
            )
            
            response = self.sendgrid_client.send(message)
            return response.status_code == 202
            
        except Exception as e:
            print(f"SendGrid email sending failed: {str(e)}")
            return self._send_mock_email(token)
    
    def send_sms_code(self, code: str) -> bool:
        """Send SMS verification code via Twilio"""
        try:
            if not self.twilio_client or not self.twilio_phone_number:
                # Fallback to console output for development
                return self._send_mock_sms(code)
            
            message_body = f"""🔐 Taxi Türlihof Admin

Ihr Passwort-Reset Code:
{code}

Gültig für 10 Minuten.
Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese Nachricht.

Support: 076 611 31 31"""
            
            message = self.twilio_client.messages.create(
                body=message_body,
                from_=self.twilio_phone_number,
                to=self.admin_phone
            )
            
            return message.status in ['queued', 'sent', 'sending']
            
        except Exception as e:
            print(f"Twilio SMS sending failed: {str(e)}")
            return self._send_mock_sms(code)
    
    def _send_mock_email(self, token: str) -> bool:
        """Mock email sending for development"""
        reset_link = f"https://www.taxiturlihof.ch/admin-reset?token={token}"
        
        print("\n" + "=" * 60)
        print("📧 ADMIN PASSWORD RESET EMAIL (MOCK)")
        print("=" * 60)
        print(f"An: {self.admin_email}")
        print(f"Betreff: 🔐 Admin Passwort Reset - Taxi Türlihof")
        print("-" * 60)
        print(f"Reset-Link: {reset_link}")
        print(f"Token: {token}")
        print(f"Gültig für: 30 Minuten")
        print("-" * 60)
        print("⚠️ Sicherheitshinweise:")
        print("- Link ist nur 30 Minuten gültig")
        print("- Link kann nur einmal verwendet werden")
        print("- Teilen Sie den Link niemals mit anderen")
        print("=" * 60 + "\n")
        
        return True
    
    def _send_mock_sms(self, code: str) -> bool:
        """Mock SMS sending for development"""
        print("\n" + "=" * 50)
        print("📱 ADMIN PASSWORD RESET SMS (MOCK)")
        print("=" * 50)
        print(f"An: {self.admin_phone}")
        print("-" * 50)
        print(f"🔐 Taxi Türlihof Admin")
        print(f"Ihr Passwort-Reset Code: {code}")
        print(f"Gültig für: 10 Minuten")
        print("-" * 50)
        print("Falls Sie diese Anfrage nicht gestellt haben,")
        print("ignorieren Sie diese Nachricht.")
        print("Support: 076 611 31 31")
        print("=" * 50 + "\n")
        
        return True
    
    def hash_new_password(self, password: str) -> str:
        """Hash new password"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def update_admin_password(self, new_password: str) -> bool:
        """Update admin password in auth_service.py file"""
        try:
            new_hash = self.hash_new_password(new_password)
            
            # Read current auth_service.py
            auth_service_path = os.path.join(os.path.dirname(__file__), 'auth_service.py')
            with open(auth_service_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace the password hash
            import re
            pattern = r'ADMIN_PASSWORD_HASH = "[^"]*"'
            replacement = f'ADMIN_PASSWORD_HASH = "{new_hash}"'
            
            new_content = re.sub(pattern, replacement, content)
            
            # Write back to file
            with open(auth_service_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ Admin password updated successfully!")
            print(f"New password hash: {new_hash}")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to update admin password: {str(e)}")
            return False
    
    def get_reset_method_status(self) -> Dict[str, bool]:
        """Check which reset methods are available"""
        return {
            'email_available': bool(self.sendgrid_api_key),
            'sms_available': bool(self.twilio_client and self.twilio_phone_number),
            'mock_mode': not (self.sendgrid_api_key or (self.twilio_client and self.twilio_phone_number))
        }
        
# Global instance
password_reset_service = PasswordResetService()