"""
Password Reset Service für Admin Panel
"""
import hashlib
import secrets
import smtplib
from datetime import datetime, timedelta
from typing import Optional
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
import pytz
import os

# Temporary reset tokens storage (in production use Redis/Database)
reset_tokens = {}

class PasswordResetService:
    def __init__(self):
        self.swiss_tz = pytz.timezone('Europe/Zurich')
        self.admin_email = "info@taxiturlihof.ch"  # Admin E-Mail
        
    def generate_reset_token(self) -> str:
        """Generate secure reset token"""
        return secrets.token_urlsafe(32)
    
    def create_reset_request(self, email: str) -> Optional[str]:
        """Create password reset request"""
        if email.lower() != self.admin_email.lower():
            return None
            
        token = self.generate_reset_token()
        expires_at = datetime.now(self.swiss_tz) + timedelta(minutes=30)
        
        reset_tokens[token] = {
            'email': email,
            'expires_at': expires_at,
            'used': False
        }
        
        return token
    
    def verify_reset_token(self, token: str) -> bool:
        """Verify if reset token is valid"""
        if token not in reset_tokens:
            return False
            
        token_data = reset_tokens[token]
        now = datetime.now(self.swiss_tz)
        
        if token_data['used'] or now > token_data['expires_at']:
            return False
            
        return True
    
    def use_reset_token(self, token: str) -> bool:
        """Mark reset token as used"""
        if not self.verify_reset_token(token):
            return False
            
        reset_tokens[token]['used'] = True
        return True
    
    def send_reset_email(self, token: str) -> bool:
        """Send password reset email (mock implementation)"""
        try:
            reset_link = f"https://www.taxiturlihof.ch/admin-reset?token={token}"
            
            print("=" * 50)
            print("🔐 ADMIN PASSWORD RESET")
            print("=" * 50)
            print(f"Reset-Link: {reset_link}")
            print(f"Token: {token}")
            print(f"Gültig für: 30 Minuten")
            print("=" * 50)
            
            # In production: send actual email
            return True
            
        except Exception as e:
            print(f"Email sending failed: {str(e)}")
            return False
    
    def hash_new_password(self, password: str) -> str:
        """Hash new password"""
        return hashlib.sha256(password.encode()).hexdigest()
        
# Global instance
password_reset_service = PasswordResetService()