#!/usr/bin/env python3
"""
Check payment status for the critical booking
"""

import asyncio
import aiohttp
import json
import sys
from pathlib import Path

# Add backend directory to path for imports
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

BACKEND_URL = "https://taxi-dashboard.preview.emergentagent.com/api"

async def check_payment_status():
    """Check payment status for the critical booking"""
    booking_id = "959acf7e-2e65-4c3a-887e-99144aeb14fd"
    
    print("💳 PAYMENT STATUS CHECK")
    print("=" * 60)
    print(f"Checking payment for booking: {booking_id}")
    print("=" * 60)
    
    async with aiohttp.ClientSession() as session:
        
        # Try to initiate a payment to see if one already exists
        print(f"\n1️⃣ Checking if payment already exists...")
        try:
            payment_data = {
                "booking_id": booking_id,
                "payment_method": "stripe"
            }
            
            async with session.post(f"{BACKEND_URL}/payments/initiate", json=payment_data) as response:
                response_text = await response.text()
                
                if response.status == 200:
                    payment_response = await response.json()
                    print(f"   ✅ Payment can be initiated:")
                    print(f"      Session ID: {payment_response.get('session_id', 'N/A')}")
                    print(f"      Payment URL exists: {bool(payment_response.get('payment_url'))}")
                elif response.status == 400 and "bereits vorhanden" in response_text:
                    print(f"   ✅ PAYMENT ALREADY EXISTS for this booking")
                    print(f"      Response: {response_text}")
                else:
                    print(f"   ⚠️ Payment initiation response: {response.status}")
                    print(f"      Response: {response_text}")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        # Check MongoDB directly for payment transactions
        print(f"\n2️⃣ Checking MongoDB for payment transactions...")
        try:
            from motor.motor_asyncio import AsyncIOMotorClient
            import os
            from dotenv import load_dotenv
            
            # Load environment variables
            load_dotenv(Path(__file__).parent / "backend" / ".env")
            
            mongo_url = os.environ['MONGO_URL']
            client = AsyncIOMotorClient(mongo_url)
            db = client[os.environ['DB_NAME']]
            
            # Search for payment transactions for this booking
            payment_transactions = await db.payment_transactions.find({"booking_id": booking_id}).to_list(100)
            
            if payment_transactions:
                print(f"   ✅ FOUND {len(payment_transactions)} payment transaction(s):")
                for i, transaction in enumerate(payment_transactions, 1):
                    print(f"      Transaction #{i}:")
                    print(f"         ID: {transaction.get('id', 'N/A')}")
                    print(f"         Amount: CHF {transaction.get('amount', 'N/A')}")
                    print(f"         Method: {transaction.get('payment_method', 'N/A')}")
                    print(f"         Status: {transaction.get('payment_status', 'N/A')}")
                    print(f"         Session ID: {transaction.get('session_id', 'N/A')}")
                    print(f"         Created: {transaction.get('created_at', 'N/A')}")
                    print()
            else:
                print(f"   ❌ NO payment transactions found for this booking")
            
            # Check all payment transactions for this customer email
            print(f"\n3️⃣ Checking all payments for yasar.cel@me.com...")
            customer_payments = await db.payment_transactions.find({"customer_email": "yasar.cel@me.com"}).to_list(100)
            
            if customer_payments:
                print(f"   ✅ FOUND {len(customer_payments)} payment(s) for this customer:")
                for i, payment in enumerate(customer_payments, 1):
                    print(f"      Payment #{i}:")
                    print(f"         Booking ID: {payment.get('booking_id', 'N/A')}")
                    print(f"         Amount: CHF {payment.get('amount', 'N/A')}")
                    print(f"         Status: {payment.get('payment_status', 'N/A')}")
                    print(f"         Method: {payment.get('payment_method', 'N/A')}")
                    print(f"         Created: {payment.get('created_at', 'N/A')}")
                    print()
            else:
                print(f"   ❌ NO payments found for yasar.cel@me.com")
            
            client.close()
            
        except Exception as e:
            print(f"   ❌ ERROR accessing MongoDB: {str(e)}")
        
        # Check booking status in database
        print(f"\n4️⃣ Checking booking payment status...")
        try:
            async with session.get(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                if response.status == 200:
                    booking = await response.json()
                    payment_status = booking.get('payment_status', 'not_set')
                    print(f"   📊 Booking payment status: {payment_status}")
                    
                    if payment_status == 'confirmed':
                        print(f"   ✅ PAYMENT IS CONFIRMED for this booking")
                    elif payment_status == 'pending':
                        print(f"   ⏳ Payment is pending")
                    else:
                        print(f"   ❌ Payment not confirmed (status: {payment_status})")
                else:
                    print(f"   ⚠️ Could not retrieve booking (status {response.status})")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")

if __name__ == "__main__":
    asyncio.run(check_payment_status())