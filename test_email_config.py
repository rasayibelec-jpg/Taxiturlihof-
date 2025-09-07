#!/usr/bin/env python3
"""
Test email configuration
"""

import sys
from pathlib import Path
import os
from dotenv import load_dotenv

# Add backend directory to path for imports
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Load environment variables
ROOT_DIR = Path(__file__).parent / "backend"
load_dotenv(ROOT_DIR / '.env')

print("Email Configuration Test")
print("=" * 50)
print(f"SMTP_HOST: {os.getenv('SMTP_HOST')}")
print(f"SMTP_PORT: {os.getenv('SMTP_PORT')}")
print(f"SMTP_USERNAME: {os.getenv('SMTP_USERNAME')}")
print(f"SMTP_PASSWORD: {os.getenv('SMTP_PASSWORD')}")
print(f"EMAIL_FROM: {os.getenv('EMAIL_FROM')}")
print(f"EMAIL_FROM_NAME: {os.getenv('EMAIL_FROM_NAME')}")

# Test importing email service
try:
    from email_service import email_service
    print("\nEmail Service Configuration:")
    print(f"smtp_host: {email_service.smtp_host}")
    print(f"smtp_port: {email_service.smtp_port}")
    print(f"smtp_username: {email_service.smtp_username}")
    print(f"smtp_password: {email_service.smtp_password}")
    print(f"email_from: {email_service.email_from}")
    print(f"email_from_name: {email_service.email_from_name}")
except Exception as e:
    print(f"Error importing email service: {e}")