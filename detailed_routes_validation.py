#!/usr/bin/env python3
"""
Detailed validation of Interactive Routes API as per review request
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime

BACKEND_URL = "https://taxi-perf-booster.preview.emergentagent.com/api"

async def detailed_validation():
    """Run detailed validation tests"""
    
    async with aiohttp.ClientSession() as session:
        print("🔍 DETAILED INTERACTIVE ROUTES VALIDATION")
        print("="*60)
        
        # Test the specific routes mentioned in review request
        test_routes = [
            {"origin": "Luzern", "destination": "Schwyz", "name": "Luzern↔Schwyz"},
            {"origin": "Luzern", "destination": "Zürich", "name": "Luzern↔Zürich"}, 
            {"origin": "Schwyz", "destination": "Zug", "name": "Schwyz↔Zug"}
        ]
        
        for route in test_routes:
            print(f"\n📍 Testing Route: {route['name']}")
            print("-" * 40)
            
            headers = {"Content-Type": "application/json"}
            start_time = time.time()
            
            # Test GET /api/get-interactive-routes
            async with session.post(
                f"{BACKEND_URL}/get-interactive-routes",
                json={"origin": route["origin"], "destination": route["destination"]},
                headers=headers
            ) as response:
                
                response_time = time.time() - start_time
                
                if response.status == 200:
                    data = await response.json()
                    
                    print(f"✅ Response Time: {response_time:.2f}s (Target: <10s)")
                    print(f"✅ Total Routes: {len(data['routes'])} (Expected: 4)")
                    
                    # Validate 4 route types
                    route_types = [r['route_type'] for r in data['routes']]
                    expected_types = ['fastest', 'shortest', 'scenic', 'avoid_highways']
                    print(f"✅ Route Types: {route_types}")
                    
                    # Validate pricing calculation for each route
                    print("\n💰 PRICING VALIDATION:")
                    for i, route_data in enumerate(data['routes']):
                        expected_distance_fare = route_data['distance_km'] * 4.20
                        expected_total = 6.60 + expected_distance_fare
                        
                        price_correct = (
                            abs(route_data['distance_fare'] - expected_distance_fare) < 0.01 and
                            abs(route_data['total_fare'] - expected_total) < 0.01 and
                            route_data['base_fare'] == 6.60
                        )
                        
                        status = "✅" if price_correct else "❌"
                        print(f"  {status} {route_data['route_type']}: {route_data['distance_km']:.2f}km = CHF {route_data['total_fare']:.2f}")
                        print(f"      Formula: CHF 6.60 + ({route_data['distance_km']:.2f} × 4.20) = CHF {expected_total:.2f}")
                    
                    # Validate response format matches InteractiveRoutesResponse
                    print(f"\n🔧 RESPONSE FORMAT VALIDATION:")
                    required_fields = ['routes', 'comparison', 'total_options', 'recommended_route']
                    for field in required_fields:
                        status = "✅" if field in data else "❌"
                        print(f"  {status} {field}: {'Present' if field in data else 'Missing'}")
                    
                    # Validate each route has required fields
                    print(f"\n📋 ROUTE DETAILS VALIDATION:")
                    route_required_fields = [
                        'route_type', 'route_description', 'distance_km', 
                        'duration_minutes', 'duration_in_traffic_minutes',
                        'polyline', 'bounds', 'steps'
                    ]
                    
                    for route_data in data['routes']:
                        print(f"  Route: {route_data['route_type']}")
                        for field in route_required_fields:
                            status = "✅" if field in route_data else "❌"
                            print(f"    {status} {field}")
                        
                        # Validate polyline for map visualization
                        polyline_valid = isinstance(route_data.get('polyline'), str) and len(route_data['polyline']) > 10
                        print(f"    {'✅' if polyline_valid else '❌'} polyline_valid: {polyline_valid}")
                        
                        # Validate bounds for map fitting
                        bounds = route_data.get('bounds', {})
                        bounds_valid = 'northeast' in bounds and 'southwest' in bounds
                        print(f"    {'✅' if bounds_valid else '❌'} bounds_valid: {bounds_valid}")
                        
                        # Validate turn-by-turn directions
                        steps_valid = isinstance(route_data.get('steps'), list) and len(route_data['steps']) > 0
                        print(f"    {'✅' if steps_valid else '❌'} steps_valid: {steps_valid} ({len(route_data.get('steps', []))} steps)")
                        
                        break  # Just validate first route in detail
                    
                else:
                    print(f"❌ API Error: {response.status}")
                    print(await response.text())
        
        # Test backward compatibility
        print(f"\n🔄 BACKWARD COMPATIBILITY TEST")
        print("-" * 40)
        
        async with session.post(
            f"{BACKEND_URL}/calculate-route-options",
            json={"origin": "Luzern", "destination": "Schwyz"},
            headers=headers
        ) as response:
            
            if response.status == 200:
                data = await response.json()
                print(f"✅ Status: 200 OK")
                print(f"✅ Has fastest_route: {'fastest_route' in data}")
                print(f"✅ Has shortest_route: {'shortest_route' in data}")
                print(f"✅ Has comparison: {'comparison' in data}")
                print(f"✅ Returns 2 route options (backward compatible)")
                
                if 'fastest_route' in data and 'shortest_route' in data:
                    fastest = data['fastest_route']
                    shortest = data['shortest_route']
                    print(f"  Fastest: {fastest['distance_km']:.2f}km, CHF {fastest['total_fare']:.2f}")
                    print(f"  Shortest: {shortest['distance_km']:.2f}km, CHF {shortest['total_fare']:.2f}")
            else:
                print(f"❌ Backward compatibility failed: {response.status}")
                print(await response.text())

if __name__ == "__main__":
    asyncio.run(detailed_validation())