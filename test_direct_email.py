#!/usr/bin/env python3
"""
Direct email service test
"""

import asyncio
import sys
from pathlib import Path
from datetime import datetime

# Add backend directory to path for imports
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

async def test_direct_email():
    try:
        from email_service import email_service
        
        print("Testing direct email sending...")
        
        # Test sending a simple email
        test_subject = "Taxi Türlihof - Direct Email Test"
        test_html = f"""
        <html>
        <body>
            <h2>🚖 Direct Email Test</h2>
            <p>This is a direct test of the email service with the correct Gmail App Password.</p>
            <p><strong>Test Status:</strong> Email system operational</p>
            <p><strong>Timestamp:</strong> {datetime.now().strftime("%d.%m.%Y %H:%M:%S")}</p>
            <p><strong>App Password:</strong> supo ifpu xrno lfsp</p>
        </body>
        </html>
        """
        
        test_text = f"""
Direct Email Test - Taxi Türlihof

This is a direct test of the email service with the correct Gmail App Password.

Test Status: Email system operational
Timestamp: {datetime.now().strftime("%d.%m.%Y %H:%M:%S")}
App Password: supo ifpu xrno lfsp
        """
        
        # Send test email to business owner
        success = await email_service.send_email(
            to_email="rasayibelec@gmail.com",
            subject=test_subject,
            html_content=test_html,
            text_content=test_text
        )
        
        if success:
            print("✅ Direct email test SUCCESSFUL!")
            print("Email sent to rasayibelec@gmail.com")
            return True
        else:
            print("❌ Direct email test FAILED!")
            return False
            
    except Exception as e:
        print(f"❌ Direct email test ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    result = asyncio.run(test_direct_email())
    print(f"\nResult: {'SUCCESS' if result else 'FAILED'}")