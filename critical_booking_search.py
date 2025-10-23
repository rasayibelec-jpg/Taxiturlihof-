#!/usr/bin/env python3
"""
Critical Booking Search - Investigate missing booking #959acf7e for Yasar Celebi
"""

import asyncio
import aiohttp
import json
from datetime import datetime

BACKEND_URL = "https://nova-taxi-portal.preview.emergentagent.com/api"

async def search_critical_booking():
    """Search for the critical booking reported by user"""
    print("🚨 CRITICAL BOOKING SEARCH STARTED")
    print("=" * 60)
    print("Searching for: Booking #959acf7e, Yasar Celebi, yasar.cel@me.com")
    print("Route: Türlihof 4 Oberarth → Goldau, 25.09.2025 10:30, CHF 13.36")
    print("=" * 60)
    
    async with aiohttp.ClientSession() as session:
        
        # 1. Direct booking ID search
        print("\n1️⃣ Searching for booking ID #959acf7e...")
        try:
            async with session.get(f"{BACKEND_URL}/bookings/959acf7e") as response:
                if response.status == 200:
                    booking = await response.json()
                    print(f"   ✅ FOUND: {booking.get('customer_name')} - {booking.get('customer_email')}")
                    print(f"      Amount: CHF {booking.get('total_fare')}")
                    print(f"      Route: {booking.get('pickup_location')} → {booking.get('destination')}")
                    print(f"      Date: {booking.get('pickup_datetime')}")
                    return True
                elif response.status == 404:
                    print("   ❌ NOT FOUND: Booking #959acf7e does not exist")
                else:
                    print(f"   ⚠️ ERROR: API returned status {response.status}")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        # 2. Search all bookings for customer name/email
        print("\n2️⃣ Searching all bookings for 'Yasar' or 'yasar.cel@me.com'...")
        try:
            async with session.get(f"{BACKEND_URL}/bookings?limit=500") as response:
                if response.status == 200:
                    all_bookings = await response.json()
                    print(f"   📊 Total bookings in database: {len(all_bookings)}")
                    
                    # Search for Yasar
                    yasar_bookings = []
                    for booking in all_bookings:
                        customer_name = booking.get('customer_name', '').lower()
                        customer_email = booking.get('customer_email', '').lower()
                        
                        if ('yasar' in customer_name or 
                            'yasar.cel@me.com' in customer_email or
                            'celebi' in customer_name):
                            yasar_bookings.append(booking)
                    
                    if yasar_bookings:
                        print(f"   ✅ FOUND {len(yasar_bookings)} booking(s) for Yasar:")
                        for booking in yasar_bookings:
                            print(f"      - ID: {booking.get('id', 'N/A')}")
                            print(f"        Name: {booking.get('customer_name', 'N/A')}")
                            print(f"        Email: {booking.get('customer_email', 'N/A')}")
                            print(f"        Amount: CHF {booking.get('total_fare', 'N/A')}")
                            print(f"        Route: {booking.get('pickup_location', 'N/A')} → {booking.get('destination', 'N/A')}")
                            print(f"        Date: {booking.get('pickup_datetime', 'N/A')}")
                            print(f"        Status: {booking.get('status', 'N/A')}")
                            print()
                        return True
                    else:
                        print("   ❌ NOT FOUND: No bookings found for Yasar Celebi or yasar.cel@me.com")
                else:
                    print(f"   ⚠️ ERROR: Failed to retrieve bookings (status {response.status})")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        # 3. Search for similar routes (Oberarth → Goldau)
        print("\n3️⃣ Searching for similar routes (Oberarth/Goldau)...")
        try:
            async with session.get(f"{BACKEND_URL}/bookings?limit=500") as response:
                if response.status == 200:
                    all_bookings = await response.json()
                    
                    route_bookings = []
                    for booking in all_bookings:
                        pickup = booking.get('pickup_location', '').lower()
                        destination = booking.get('destination', '').lower()
                        
                        if (('oberarth' in pickup or 'türlihof' in pickup) and 
                            'goldau' in destination):
                            route_bookings.append(booking)
                    
                    if route_bookings:
                        print(f"   ✅ FOUND {len(route_bookings)} booking(s) with similar route:")
                        for booking in route_bookings:
                            print(f"      - ID: {booking.get('id', 'N/A')}")
                            print(f"        Customer: {booking.get('customer_name', 'N/A')} ({booking.get('customer_email', 'N/A')})")
                            print(f"        Amount: CHF {booking.get('total_fare', 'N/A')}")
                            print(f"        Route: {booking.get('pickup_location', 'N/A')} → {booking.get('destination', 'N/A')}")
                            print(f"        Date: {booking.get('pickup_datetime', 'N/A')}")
                            print()
                    else:
                        print("   ❌ NOT FOUND: No bookings found for Oberarth → Goldau route")
                else:
                    print(f"   ⚠️ ERROR: Failed to retrieve bookings (status {response.status})")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        # 4. Search for bookings around CHF 13.36
        print("\n4️⃣ Searching for bookings around CHF 13.36...")
        try:
            async with session.get(f"{BACKEND_URL}/bookings?limit=500") as response:
                if response.status == 200:
                    all_bookings = await response.json()
                    
                    price_bookings = []
                    target_price = 13.36
                    for booking in all_bookings:
                        total_fare = booking.get('total_fare', 0)
                        if isinstance(total_fare, (int, float)):
                            if abs(total_fare - target_price) <= 5.0:  # Within CHF 5
                                price_bookings.append(booking)
                    
                    if price_bookings:
                        print(f"   ✅ FOUND {len(price_bookings)} booking(s) with similar price (CHF 8-18):")
                        for booking in price_bookings:
                            print(f"      - ID: {booking.get('id', 'N/A')}")
                            print(f"        Customer: {booking.get('customer_name', 'N/A')} ({booking.get('customer_email', 'N/A')})")
                            print(f"        Amount: CHF {booking.get('total_fare', 'N/A')}")
                            print(f"        Route: {booking.get('pickup_location', 'N/A')} → {booking.get('destination', 'N/A')}")
                            print(f"        Date: {booking.get('pickup_datetime', 'N/A')}")
                            print()
                    else:
                        print("   ❌ NOT FOUND: No bookings found with similar price")
                else:
                    print(f"   ⚠️ ERROR: Failed to retrieve bookings (status {response.status})")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        # 5. Test route calculation for the reported route
        print("\n5️⃣ Testing route calculation for Türlihof 4 Oberarth → Goldau...")
        try:
            test_data = {
                "origin": "Türlihof 4 Oberarth",
                "destination": "Goldau",
                "departure_time": "2025-09-25T10:30:00"
            }
            
            async with session.post(f"{BACKEND_URL}/calculate-price", json=test_data) as response:
                if response.status == 200:
                    price_data = await response.json()
                    calculated_fare = price_data.get('total_fare', 0)
                    distance = price_data.get('distance_km', 0)
                    
                    print(f"   ✅ Route calculation successful:")
                    print(f"      - Distance: {distance}km")
                    print(f"      - Calculated fare: CHF {calculated_fare}")
                    print(f"      - Reported fare: CHF 13.36")
                    print(f"      - Difference: CHF {abs(calculated_fare - 13.36):.2f}")
                    
                    if abs(calculated_fare - 13.36) > 50:
                        print(f"   ⚠️ WARNING: Large price difference suggests different pricing or route")
                else:
                    print(f"   ❌ Route calculation failed: status {response.status}")
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
        
        print("\n" + "=" * 60)
        print("🔍 SEARCH COMPLETE")
        print("=" * 60)
        
        return False

if __name__ == "__main__":
    asyncio.run(search_critical_booking())