#!/usr/bin/env python3
"""
Clear all test data from the database
"""

import asyncio
import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def clear_database():
    """Clear all test bookings and payment transactions"""
    print("🗑️ DATENBANK WIRD GELEERT...")
    print("=" * 50)
    
    # Load environment variables
    load_dotenv(backend_dir / ".env")
    
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Count current data
        bookings_count = await db.bookings.count_documents({})
        payments_count = await db.payment_transactions.count_documents({})
        
        print(f"📊 Aktuelle Datenbank:")
        print(f"   - Buchungen: {bookings_count}")
        print(f"   - Zahlungen: {payments_count}")
        print()
        
        # Clear all bookings
        print("🧹 Lösche alle Buchungen...")
        result = await db.bookings.delete_many({})
        print(f"   ✅ {result.deleted_count} Buchungen gelöscht")
        
        # Clear all payment transactions
        print("💳 Lösche alle Zahlungsdaten...")
        result = await db.payment_transactions.delete_many({})
        print(f"   ✅ {result.deleted_count} Zahlungen gelöscht")
        
        # Verify database is empty
        bookings_remaining = await db.bookings.count_documents({})
        payments_remaining = await db.payment_transactions.count_documents({})
        
        print()
        print("📊 Datenbank nach der Bereinigung:")
        print(f"   - Buchungen: {bookings_remaining}")
        print(f"   - Zahlungen: {payments_remaining}")
        
        if bookings_remaining == 0 and payments_remaining == 0:
            print()
            print("✅ DATENBANK ERFOLGREICH GELEERT!")
            print("🎉 Jetzt haben Sie ein sauberes Admin-Dashboard!")
        else:
            print()
            print("⚠️ Warnung: Einige Daten konnten nicht gelöscht werden")
            
    except Exception as e:
        print(f"❌ Fehler beim Leeren der Datenbank: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(clear_database())