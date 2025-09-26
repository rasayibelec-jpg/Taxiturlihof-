"""
Authentication Service - Admin Panel Security
"""
import hashlib
import secrets
import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict
import pytz
import os

# Admin credentials (you can change these later)
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD_HASH = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"  # sha256 of "TaxiTurlihof2025!"
JWT_SECRET_KEY = "taxi-turlihof-secret-key-2025-secure"
JWT_ALGORITHM = "HS256"
SESSION_EXPIRE_HOURS = 8

class AuthService:
    def __init__(self):
        self.swiss_tz = pytz.timezone('Europe/Zurich')
    
    def hash_password(self, password: str) -> str:
        """Hash password with SHA256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def verify_admin_credentials(self, username: str, password: str) -> bool:
        """Verify admin login credentials"""
        if username != ADMIN_USERNAME:
            return False
        
        password_hash = self.hash_password(password)
        return password_hash == ADMIN_PASSWORD_HASH
    
    def create_admin_token(self) -> str:
        """Create JWT token for admin session"""
        payload = {
            'username': ADMIN_USERNAME,
            'role': 'admin',
            'exp': datetime.now(self.swiss_tz) + timedelta(hours=SESSION_EXPIRE_HOURS),
            'iat': datetime.now(self.swiss_tz)
        }
        
        return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    
    def verify_admin_token(self, token: str) -> Optional[Dict]:
        """Verify and decode admin JWT token"""
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            
            # Check if token is expired
            exp = payload.get('exp')
            if exp and datetime.fromtimestamp(exp, self.swiss_tz) < datetime.now(self.swiss_tz):
                return None
            
            # Check if user is admin
            if payload.get('role') != 'admin':
                return None
                
            return payload
            
        except jwt.InvalidTokenError:
            return None
    
    def generate_customer_session_id(self) -> str:
        """Generate secure session ID for customer booking lookup"""
        return secrets.token_urlsafe(32)
    
    def verify_customer_booking_access(self, booking_id: str, email: str, booking_data: dict) -> bool:
        """Verify customer can access their booking"""
        if not booking_data:
            return False
        
        # Check if email matches
        booking_email = booking_data.get('customer_email', '').lower()
        provided_email = email.lower()
        
        # Check if booking ID matches (partial match for security)
        booking_full_id = booking_data.get('id', '')
        
        return (booking_email == provided_email and 
                booking_full_id.startswith(booking_id))

# Service instance
auth_service = AuthService()

# Helper function to change admin password (for later use)
def change_admin_password(new_password: str) -> str:
    """Generate new password hash for admin"""
    new_hash = hashlib.sha256(new_password.encode()).hexdigest()
    print(f"New password hash: {new_hash}")
    print("Update ADMIN_PASSWORD_HASH in auth_service.py with this value")
    return new_hash

if __name__ == "__main__":
    # Test the authentication
    print("=== ADMIN AUTH TEST ===")
    print(f"Admin Username: {ADMIN_USERNAME}")
    print("Admin Password: TaxiTurlihof2025!")
    print(f"Password Hash: {ADMIN_PASSWORD_HASH}")
    
    # Test password hashing first
    test_hash = auth_service.hash_password("TaxiTurlihof2025!")
    print(f"Test Hash: {test_hash}")
    print(f"Expected:  {ADMIN_PASSWORD_HASH}")
    print(f"Hash Match: {test_hash == ADMIN_PASSWORD_HASH}")
    
    # Test login
    is_valid = auth_service.verify_admin_credentials("admin", "TaxiTurlihof2025!")
    print(f"Login Test: {'✅ SUCCESS' if is_valid else '❌ FAILED'}")
    
    if is_valid:
        token = auth_service.create_admin_token()
        print(f"Generated Token: {token[:50]}...")
        
        # Verify token
        payload = auth_service.verify_admin_token(token)
        print(f"Token Verification: {'✅ SUCCESS' if payload else '❌ FAILED'}")
        if payload:
            print(f"Token Payload: {payload}")