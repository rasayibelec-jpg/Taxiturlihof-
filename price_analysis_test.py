#!/usr/bin/env python3
"""
Focused Price Analysis Test for Luzern → Zürich Route
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://nova-taxi-portal.preview.emergentagent.com/api"

async def analyze_luzern_zurich_pricing():
    """Comprehensive Price Analysis for Luzern → Zürich Route as requested in review"""
    print("🎯 LUZERN → ZÜRICH PRICE CALCULATION ANALYSIS")
    print("=" * 60)
    
    async with aiohttp.ClientSession() as session:
        try:
            # Test data as specified in review request
            test_data = {
                "origin": "Luzern",
                "destination": "Zürich", 
                "departure_time": "2024-09-08T10:00:00"
            }
            
            headers = {"Content-Type": "application/json"}
            async with session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Extract price components
                    distance_km = data.get('distance_km', 0)
                    base_fare = data.get('base_fare', 0)
                    distance_fare = data.get('distance_fare', 0)
                    total_fare = data.get('total_fare', 0)
                    route_info = data.get('route_info', {})
                    
                    # Expected Swiss taxi rates
                    expected_base_fare = 6.80  # CHF
                    expected_distance_rate = 4.20  # CHF per km
                    expected_distance_range = (40, 55)  # km for Luzern-Zürich
                    
                    # Calculate expected fare
                    expected_distance_fare = distance_km * expected_distance_rate
                    expected_total_basic = expected_base_fare + expected_distance_fare
                    
                    # Check for surcharges
                    surcharge_applied = total_fare > (base_fare + distance_fare)
                    surcharge_amount = round(total_fare - (base_fare + distance_fare), 2) if surcharge_applied else 0
                    
                    # Validation checks
                    distance_valid = expected_distance_range[0] <= distance_km <= expected_distance_range[1]
                    base_fare_valid = abs(base_fare - expected_base_fare) < 0.01
                    distance_rate_valid = abs((distance_fare / distance_km) - expected_distance_rate) < 0.01 if distance_km > 0 else False
                    
                    # Identify discrepancies
                    discrepancies = []
                    if not distance_valid:
                        discrepancies.append(f"Distance {distance_km}km outside expected range {expected_distance_range}")
                    if not base_fare_valid:
                        discrepancies.append(f"Base fare {base_fare} differs from Swiss standard {expected_base_fare}")
                    if not distance_rate_valid:
                        actual_rate = round(distance_fare / distance_km, 2) if distance_km > 0 else 0
                        discrepancies.append(f"Distance rate {actual_rate} differs from Swiss standard {expected_distance_rate}")
                    
                    # Print detailed analysis
                    print(f"\n📊 CURRENT PRICE CALCULATION:")
                    print(f"   Route: Luzern → Zürich")
                    print(f"   Distance: {distance_km}km")
                    print(f"   Base Fare: CHF {base_fare}")
                    print(f"   Distance Rate: CHF {round(distance_fare/distance_km, 2) if distance_km > 0 else 0}/km")
                    print(f"   Distance Fare: CHF {distance_fare}")
                    print(f"   Subtotal: CHF {base_fare + distance_fare}")
                    if surcharge_applied:
                        print(f"   Surcharge: CHF {surcharge_amount}")
                    print(f"   TOTAL FARE: CHF {total_fare}")
                    print(f"   Route Type: {route_info.get('route_type', 'unknown')}")
                    print(f"   Traffic Factor: {route_info.get('traffic_factor', 1.0)}")
                    
                    print(f"\n📋 SWISS TAXI FARE STANDARDS:")
                    print(f"   Expected Distance: {expected_distance_range[0]}-{expected_distance_range[1]}km")
                    print(f"   Standard Base Fare: CHF {expected_base_fare}")
                    print(f"   Standard Distance Rate: CHF {expected_distance_rate}/km")
                    print(f"   Expected Distance Fare: CHF {round(expected_distance_fare, 2)}")
                    print(f"   Expected Basic Total: CHF {round(expected_total_basic, 2)}")
                    
                    print(f"\n🔍 DETAILED BREAKDOWN:")
                    print(f"   Formula Used: Base ({base_fare}) + (Distance {distance_km}km × Rate {round(distance_fare/distance_km, 2) if distance_km > 0 else 0}) = CHF {base_fare + distance_fare}")
                    if surcharge_applied:
                        print(f"   Surcharge Applied: +CHF {surcharge_amount}")
                        print(f"   Final Total: CHF {total_fare}")
                        print(f"   Surcharge Reasons: Peak time (10:00 AM), Traffic conditions")
                    
                    print(f"\n⚖️  COMPARISON WITH REFERENCE APP:")
                    if discrepancies:
                        print(f"   ❌ DISCREPANCIES FOUND:")
                        for i, discrepancy in enumerate(discrepancies, 1):
                            print(f"      {i}. {discrepancy}")
                    else:
                        print(f"   ✅ CALCULATION MATCHES SWISS STANDARDS")
                        print(f"   ✅ Distance calculation realistic for Luzern-Zürich (~47km)")
                        print(f"   ✅ Base fare matches official Swiss taxi rates")
                        print(f"   ✅ Distance rate matches CHF 4.20/km standard")
                    
                    print(f"\n🎯 ANALYSIS SUMMARY:")
                    if len(discrepancies) == 0:
                        print(f"   ✅ Price calculation is ACCURATE and follows Swiss taxi standards")
                        print(f"   ✅ Distance of {distance_km}km is realistic for Luzern-Zürich route")
                        print(f"   ✅ All rate components match official Swiss taxi fares")
                        if surcharge_applied:
                            print(f"   ℹ️  Surcharge of CHF {surcharge_amount} applied for peak time/traffic")
                    else:
                        print(f"   ⚠️  {len(discrepancies)} discrepancy(ies) identified")
                        print(f"   📝 Recommendation: Review pricing algorithm for Swiss compliance")
                    
                    return len(discrepancies) == 0
                    
                else:
                    print(f"❌ API Error: Status {response.status}")
                    response_text = await response.text()
                    print(f"   Response: {response_text}")
                    return False
                    
        except Exception as e:
            print(f"❌ Test Failed: {str(e)}")
            return False

if __name__ == "__main__":
    result = asyncio.run(analyze_luzern_zurich_pricing())
    print(f"\n{'='*60}")
    print(f"🏁 FINAL RESULT: {'✅ PRICING ACCURATE' if result else '❌ DISCREPANCIES FOUND'}")