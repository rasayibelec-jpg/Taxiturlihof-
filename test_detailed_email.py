#!/usr/bin/env python3
"""
Detailed email service test with debugging
"""

import asyncio
import sys
from pathlib import Path
from datetime import datetime
import aiosmtplib
from email.message import EmailMessage

# Add backend directory to path for imports
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

async def test_detailed_email():
    try:
        print("Testing detailed email sending...")
        
        # Direct SMTP test with correct credentials
        smtp_config = {
            "hostname": "smtp.gmail.com",
            "port": 587,
            "username": "rasayibelec@gmail.com",
            "password": "supo ifpu xrno lfsp"
        }
        
        print(f"SMTP Config: {smtp_config}")
        
        # Create a test message
        message = EmailMessage()
        message["From"] = f"Taxi Türlihof <{smtp_config['username']}>"
        message["To"] = "rasayibelec@gmail.com"
        message["Subject"] = "Detailed Email Test - Taxi Türlihof"
        
        html_content = f"""
        <html>
        <body>
            <h2>🚖 Detailed Email Test</h2>
            <p>This is a detailed test of the Gmail SMTP system.</p>
            <p><strong>Test Status:</strong> Email system operational</p>
            <p><strong>Timestamp:</strong> {datetime.now().strftime("%d.%m.%Y %H:%M:%S")}</p>
            <p><strong>App Password:</strong> supo ifpu xrno lfsp</p>
            <p><strong>SMTP Server:</strong> smtp.gmail.com:587</p>
        </body>
        </html>
        """
        
        text_content = f"""
Detailed Email Test - Taxi Türlihof

This is a detailed test of the Gmail SMTP system.

Test Status: Email system operational
Timestamp: {datetime.now().strftime("%d.%m.%Y %H:%M:%S")}
App Password: supo ifpu xrno lfsp
SMTP Server: smtp.gmail.com:587
        """
        
        message.set_content(text_content)
        message.add_alternative(html_content, subtype='html')
        
        print("Sending email...")
        
        # Send email using aiosmtplib
        await aiosmtplib.send(
            message,
            hostname=smtp_config["hostname"],
            port=smtp_config["port"],
            start_tls=True,
            username=smtp_config["username"],
            password=smtp_config["password"],
        )
        
        print("✅ Detailed email test SUCCESSFUL!")
        print("Email sent to rasayibelec@gmail.com")
        return True
        
    except Exception as e:
        print(f"❌ Detailed email test ERROR: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        return False

if __name__ == "__main__":
    result = asyncio.run(test_detailed_email())
    print(f"\nResult: {'SUCCESS' if result else 'FAILED'}")