#!/usr/bin/env python3
"""
Verify the critical booking found - ID: 959acf7e-2e65-4c3a-887e-99144aeb14fd
"""

import asyncio
import aiohttp
import json

BACKEND_URL = "https://taxi-luzern-web.preview.emergentagent.com/api"

async def verify_booking():
    """Verify the specific booking found"""
    booking_id = "959acf7e-2e65-4c3a-887e-99144aeb14fd"
    
    print("🎯 CRITICAL BOOKING VERIFICATION")
    print("=" * 60)
    print(f"Verifying booking: {booking_id}")
    print("Expected: Yasar Celebi, yasar.cel@me.com, CHF 13.36")
    print("Route: Türlihof 4 Oberarth → Goldau, 25.09.2025 10:30")
    print("=" * 60)
    
    async with aiohttp.ClientSession() as session:
        
        # Get full booking details
        print(f"\n🔍 Getting full booking details...")
        try:
            async with session.get(f"{BACKEND_URL}/bookings/{booking_id}") as response:
                if response.status == 200:
                    booking = await response.json()
                    
                    print(f"✅ BOOKING FOUND AND VERIFIED:")
                    print(f"   📋 ID: {booking.get('id')}")
                    print(f"   👤 Customer: {booking.get('customer_name')}")
                    print(f"   📧 Email: {booking.get('customer_email')}")
                    print(f"   📞 Phone: {booking.get('customer_phone', 'N/A')}")
                    print(f"   🚗 Route: {booking.get('pickup_location')} → {booking.get('destination')}")
                    print(f"   📅 Date: {booking.get('pickup_datetime')}")
                    print(f"   💰 Amount: CHF {booking.get('total_fare')}")
                    print(f"   📊 Status: {booking.get('status')}")
                    print(f"   🕐 Created: {booking.get('created_at')}")
                    print(f"   🔄 Updated: {booking.get('updated_at')}")
                    
                    # Check if this matches user's report
                    matches = []
                    if booking.get('customer_name') == 'Yasar Celebi ':
                        matches.append("✅ Customer name matches")
                    else:
                        matches.append(f"❌ Customer name: expected 'Yasar Celebi', got '{booking.get('customer_name')}'")
                    
                    if booking.get('customer_email') == 'yasar.cel@me.com':
                        matches.append("✅ Email matches")
                    else:
                        matches.append(f"❌ Email: expected 'yasar.cel@me.com', got '{booking.get('customer_email')}'")
                    
                    if booking.get('total_fare') == 13.36:
                        matches.append("✅ Amount matches")
                    else:
                        matches.append(f"❌ Amount: expected CHF 13.36, got CHF {booking.get('total_fare')}")
                    
                    if 'Türlihof 4 Oberarth' in booking.get('pickup_location', ''):
                        matches.append("✅ Pickup location matches")
                    else:
                        matches.append(f"❌ Pickup: expected 'Türlihof 4 Oberarth', got '{booking.get('pickup_location')}'")
                    
                    if 'Goldau' in booking.get('destination', ''):
                        matches.append("✅ Destination matches")
                    else:
                        matches.append(f"❌ Destination: expected 'Goldau', got '{booking.get('destination')}'")
                    
                    if '2025-09-25T10:30:00' in booking.get('pickup_datetime', ''):
                        matches.append("✅ Date/time matches")
                    else:
                        matches.append(f"❌ Date/time: expected '2025-09-25T10:30:00', got '{booking.get('pickup_datetime')}'")
                    
                    print(f"\n📋 VERIFICATION RESULTS:")
                    for match in matches:
                        print(f"   {match}")
                    
                    # Check if booking appears in admin dashboard
                    print(f"\n🔍 Checking admin dashboard visibility...")
                    async with session.get(f"{BACKEND_URL}/bookings?limit=100") as admin_response:
                        if admin_response.status == 200:
                            admin_bookings = await admin_response.json()
                            found_in_admin = any(b.get('id') == booking_id for b in admin_bookings)
                            
                            if found_in_admin:
                                print(f"   ✅ BOOKING IS VISIBLE in admin dashboard")
                                
                                # Find position in list
                                for i, b in enumerate(admin_bookings):
                                    if b.get('id') == booking_id:
                                        print(f"   📍 Position in admin list: #{i+1} out of {len(admin_bookings)}")
                                        break
                            else:
                                print(f"   ❌ BOOKING NOT VISIBLE in admin dashboard")
                                print(f"   📊 Admin dashboard shows {len(admin_bookings)} bookings")
                        else:
                            print(f"   ⚠️ ERROR: Could not check admin dashboard (status {admin_response.status})")
                    
                    return True
                else:
                    print(f"❌ ERROR: Could not retrieve booking (status {response.status})")
                    return False
        except Exception as e:
            print(f"❌ ERROR: {str(e)}")
            return False

if __name__ == "__main__":
    asyncio.run(verify_booking())