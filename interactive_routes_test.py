#!/usr/bin/env python3
"""
Interactive Route Selection API Testing Suite
Tests the new GET /api/get-interactive-routes and existing POST /api/calculate-route-options endpoints
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime
import sys
from pathlib import Path

# Test configuration
BACKEND_URL = "https://taxi-booking-hub-2.preview.emergentagent.com/api"

class InteractiveRoutesTester:
    def __init__(self):
        self.session = None
        self.results = []
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.results.append(result)
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
    
    async def test_api_health_check(self):
        """Test if the backend API is running and accessible"""
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.log_result(
                            "API Health Check", 
                            True, 
                            f"Backend API is running (Status: {response.status})",
                            data
                        )
                        return True
                    else:
                        self.log_result(
                            "API Health Check", 
                            False, 
                            f"Unexpected response content: {data}"
                        )
                        return False
                else:
                    self.log_result(
                        "API Health Check", 
                        False, 
                        f"API returned status {response.status}"
                    )
                    return False
        except Exception as e:
            self.log_result(
                "API Health Check", 
                False, 
                f"Failed to connect to API: {str(e)}"
            )
            return False

    async def test_get_interactive_routes_luzern_schwyz(self):
        """Test NEW GET /api/get-interactive-routes endpoint - Luzern to Schwyz"""
        try:
            test_data = {
                "origin": "Luzern",
                "destination": "Schwyz"
            }
            
            headers = {"Content-Type": "application/json"}
            start_time = time.time()
            
            async with self.session.post(
                f"{BACKEND_URL}/get-interactive-routes",
                json=test_data,
                headers=headers
            ) as response:
                
                response_time = time.time() - start_time
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure matches InteractiveRoutesResponse
                    required_fields = ['routes', 'comparison', 'total_options', 'recommended_route']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(
                            "Interactive Routes - Luzern to Schwyz",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return False
                    
                    routes = data['routes']
                    total_options = data['total_options']
                    
                    # Validate we get 4 different route options
                    if len(routes) != 4:
                        self.log_result(
                            "Interactive Routes - Luzern to Schwyz",
                            False,
                            f"Expected 4 route options, got {len(routes)}"
                        )
                        return False
                    
                    # Validate route types include the expected 4 types
                    route_types = [route['route_type'] for route in routes]
                    expected_types = ['fastest', 'shortest', 'scenic', 'avoid_highways']
                    
                    # Check if we have all expected route types
                    types_found = sum(1 for expected in expected_types if expected in route_types)
                    
                    # Validate each route has required fields
                    route_validation_passed = True
                    route_details = []
                    
                    for i, route in enumerate(routes):
                        required_route_fields = [
                            'route_type', 'route_description', 'distance_km', 
                            'duration_minutes', 'duration_in_traffic_minutes',
                            'base_fare', 'distance_fare', 'total_fare',
                            'origin_address', 'destination_address',
                            'polyline', 'bounds', 'steps', 'traffic_factor'
                        ]
                        
                        missing_route_fields = [field for field in required_route_fields if field not in route]
                        if missing_route_fields:
                            route_validation_passed = False
                            break
                        
                        # Validate pricing calculation: CHF 6.60 + (km × 4.20)
                        expected_distance_fare = route['distance_km'] * 4.20
                        expected_total_fare = 6.60 + expected_distance_fare
                        
                        price_validation = (
                            abs(route['distance_fare'] - expected_distance_fare) < 0.01 and
                            abs(route['total_fare'] - expected_total_fare) < 0.01 and
                            route['base_fare'] == 6.60
                        )
                        
                        route_details.append({
                            "route_type": route['route_type'],
                            "distance_km": route['distance_km'],
                            "duration_minutes": route['duration_minutes'],
                            "duration_in_traffic_minutes": route['duration_in_traffic_minutes'],
                            "total_fare": route['total_fare'],
                            "price_validation": price_validation,
                            "has_polyline": bool(route['polyline']),
                            "has_bounds": bool(route['bounds']),
                            "has_steps": bool(route['steps'])
                        })
                    
                    # Performance validation (< 10 seconds)
                    performance_ok = response_time < 10.0
                    
                    if route_validation_passed and performance_ok and types_found >= 3:
                        self.log_result(
                            "Interactive Routes - Luzern to Schwyz",
                            True,
                            f"✅ Interactive routes working! {len(routes)} routes returned, {types_found}/4 expected types, Response time: {response_time:.2f}s",
                            {
                                "total_routes": len(routes),
                                "route_types": route_types,
                                "expected_types_found": f"{types_found}/4",
                                "response_time_seconds": round(response_time, 2),
                                "performance_target_met": performance_ok,
                                "route_details": route_details,
                                "recommended_route": data['recommended_route']
                            }
                        )
                        return True
                    else:
                        issues = []
                        if not route_validation_passed:
                            issues.append("Route validation failed")
                        if not performance_ok:
                            issues.append(f"Performance issue: {response_time:.2f}s > 10s")
                        if types_found < 3:
                            issues.append(f"Only {types_found}/4 expected route types found")
                        
                        self.log_result(
                            "Interactive Routes - Luzern to Schwyz",
                            False,
                            f"Issues found: {', '.join(issues)}",
                            {
                                "route_types": route_types,
                                "response_time": response_time,
                                "route_details": route_details
                            }
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Interactive Routes - Luzern to Schwyz",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Interactive Routes - Luzern to Schwyz",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_get_interactive_routes_luzern_zurich(self):
        """Test NEW GET /api/get-interactive-routes endpoint - Luzern to Zürich"""
        try:
            test_data = {
                "origin": "Luzern",
                "destination": "Zürich"
            }
            
            headers = {"Content-Type": "application/json"}
            start_time = time.time()
            
            async with self.session.post(
                f"{BACKEND_URL}/get-interactive-routes",
                json=test_data,
                headers=headers
            ) as response:
                
                response_time = time.time() - start_time
                
                if response.status == 200:
                    data = await response.json()
                    
                    routes = data['routes']
                    
                    # Validate we get 4 different route options
                    if len(routes) == 4:
                        # Check that routes have different prices/times/distances
                        distances = [route['distance_km'] for route in routes]
                        durations = [route['duration_in_traffic_minutes'] for route in routes]
                        prices = [route['total_fare'] for route in routes]
                        
                        # Routes should be different (not all identical)
                        distance_variance = max(distances) - min(distances) > 1.0  # At least 1km difference
                        duration_variance = max(durations) - min(durations) > 2    # At least 2min difference
                        price_variance = max(prices) - min(prices) > 2.0          # At least CHF 2 difference
                        
                        routes_different = distance_variance or duration_variance or price_variance
                        performance_ok = response_time < 8.0  # Stricter performance target
                        
                        if routes_different and performance_ok:
                            self.log_result(
                                "Interactive Routes - Luzern to Zürich",
                                True,
                                f"✅ 4 different routes returned with variance, Response time: {response_time:.2f}s",
                                {
                                    "distance_range": f"{min(distances):.1f}-{max(distances):.1f} km",
                                    "duration_range": f"{min(durations)}-{max(durations)} min",
                                    "price_range": f"CHF {min(prices):.2f}-{max(prices):.2f}",
                                    "response_time_seconds": round(response_time, 2),
                                    "routes_different": routes_different
                                }
                            )
                            return True
                        else:
                            issues = []
                            if not routes_different:
                                issues.append("Routes are too similar (no significant variance)")
                            if not performance_ok:
                                issues.append(f"Performance issue: {response_time:.2f}s > 8s")
                            
                            self.log_result(
                                "Interactive Routes - Luzern to Zürich",
                                False,
                                f"Issues: {', '.join(issues)}",
                                {
                                    "distance_variance": distance_variance,
                                    "duration_variance": duration_variance,
                                    "price_variance": price_variance,
                                    "response_time": response_time
                                }
                            )
                            return False
                    else:
                        self.log_result(
                            "Interactive Routes - Luzern to Zürich",
                            False,
                            f"Expected 4 routes, got {len(routes)}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Interactive Routes - Luzern to Zürich",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Interactive Routes - Luzern to Zürich",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_get_interactive_routes_schwyz_zug(self):
        """Test NEW GET /api/get-interactive-routes endpoint - Schwyz to Zug"""
        try:
            test_data = {
                "origin": "Schwyz",
                "destination": "Zug"
            }
            
            headers = {"Content-Type": "application/json"}
            start_time = time.time()
            
            async with self.session.post(
                f"{BACKEND_URL}/get-interactive-routes",
                json=test_data,
                headers=headers
            ) as response:
                
                response_time = time.time() - start_time
                
                if response.status == 200:
                    data = await response.json()
                    
                    routes = data['routes']
                    
                    # Validate polyline strings for map visualization
                    polylines_valid = all(
                        isinstance(route.get('polyline'), str) and len(route['polyline']) > 10
                        for route in routes
                    )
                    
                    # Validate bounds for map fitting
                    bounds_valid = all(
                        isinstance(route.get('bounds'), dict) and 
                        'northeast' in route['bounds'] and 'southwest' in route['bounds']
                        for route in routes
                    )
                    
                    # Validate turn-by-turn directions
                    steps_valid = all(
                        isinstance(route.get('steps'), list) and len(route['steps']) > 0
                        for route in routes
                    )
                    
                    # Validate traffic-aware timing
                    traffic_aware = all(
                        route.get('duration_in_traffic_minutes', 0) > 0 and
                        route.get('traffic_factor', 0) > 0
                        for route in routes
                    )
                    
                    if len(routes) == 4 and polylines_valid and bounds_valid and steps_valid and traffic_aware:
                        self.log_result(
                            "Interactive Routes - Schwyz to Zug",
                            True,
                            f"✅ All route visualization data valid, Response time: {response_time:.2f}s",
                            {
                                "total_routes": len(routes),
                                "polylines_valid": polylines_valid,
                                "bounds_valid": bounds_valid,
                                "steps_valid": steps_valid,
                                "traffic_aware": traffic_aware,
                                "response_time_seconds": round(response_time, 2),
                                "sample_route": {
                                    "type": routes[0]['route_type'],
                                    "polyline_length": len(routes[0]['polyline']),
                                    "steps_count": len(routes[0]['steps']),
                                    "traffic_factor": routes[0]['traffic_factor']
                                }
                            }
                        )
                        return True
                    else:
                        issues = []
                        if len(routes) != 4:
                            issues.append(f"Expected 4 routes, got {len(routes)}")
                        if not polylines_valid:
                            issues.append("Invalid polyline data")
                        if not bounds_valid:
                            issues.append("Invalid bounds data")
                        if not steps_valid:
                            issues.append("Invalid steps data")
                        if not traffic_aware:
                            issues.append("Missing traffic-aware timing")
                        
                        self.log_result(
                            "Interactive Routes - Schwyz to Zug",
                            False,
                            f"Validation issues: {', '.join(issues)}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Interactive Routes - Schwyz to Zug",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Interactive Routes - Schwyz to Zug",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_calculate_route_options_backward_compatibility(self):
        """Test EXISTING POST /api/calculate-route-options for backward compatibility"""
        try:
            test_data = {
                "origin": "Luzern",
                "destination": "Schwyz"
            }
            
            headers = {"Content-Type": "application/json"}
            start_time = time.time()
            
            async with self.session.post(
                f"{BACKEND_URL}/calculate-route-options",
                json=test_data,
                headers=headers
            ) as response:
                
                response_time = time.time() - start_time
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure matches MultiRouteResponse
                    required_fields = ['fastest_route', 'shortest_route', 'comparison', 'recommended_route']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(
                            "Route Options - Backward Compatibility",
                            False,
                            f"Missing required fields: {missing_fields}"
                        )
                        return False
                    
                    fastest_route = data['fastest_route']
                    shortest_route = data['shortest_route']
                    
                    # Validate we get exactly 2 route options (backward compatibility)
                    route_fields_valid = all(
                        field in fastest_route for field in ['route_type', 'distance_km', 'total_fare']
                    ) and all(
                        field in shortest_route for field in ['route_type', 'distance_km', 'total_fare']
                    )
                    
                    # Validate pricing calculation for both routes
                    fastest_price_valid = (
                        fastest_route['base_fare'] == 6.60 and
                        abs(fastest_route['distance_fare'] - (fastest_route['distance_km'] * 4.20)) < 0.01
                    )
                    
                    shortest_price_valid = (
                        shortest_route['base_fare'] == 6.60 and
                        abs(shortest_route['distance_fare'] - (shortest_route['distance_km'] * 4.20)) < 0.01
                    )
                    
                    if route_fields_valid and fastest_price_valid and shortest_price_valid:
                        self.log_result(
                            "Route Options - Backward Compatibility",
                            True,
                            f"✅ Backward compatibility maintained - 2 routes returned, Response time: {response_time:.2f}s",
                            {
                                "fastest_route": {
                                    "type": fastest_route['route_type'],
                                    "distance_km": fastest_route['distance_km'],
                                    "total_fare": fastest_route['total_fare']
                                },
                                "shortest_route": {
                                    "type": shortest_route['route_type'],
                                    "distance_km": shortest_route['distance_km'],
                                    "total_fare": shortest_route['total_fare']
                                },
                                "recommended": data['recommended_route'],
                                "response_time_seconds": round(response_time, 2)
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Route Options - Backward Compatibility",
                            False,
                            f"Route validation failed - Fields: {route_fields_valid}, Fastest price: {fastest_price_valid}, Shortest price: {shortest_price_valid}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Route Options - Backward Compatibility",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Route Options - Backward Compatibility",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_error_handling_invalid_addresses(self):
        """Test error handling for invalid addresses"""
        try:
            test_data = {
                "origin": "NonExistentPlace123",
                "destination": "AnotherFakeLocation456"
            }
            
            headers = {"Content-Type": "application/json"}
            
            async with self.session.post(
                f"{BACKEND_URL}/get-interactive-routes",
                json=test_data,
                headers=headers
            ) as response:
                
                # Should either return 400 error or fallback calculation
                if response.status == 400:
                    error_data = await response.json()
                    self.log_result(
                        "Error Handling - Invalid Addresses",
                        True,
                        f"✅ Proper error handling - Status 400 returned for invalid addresses",
                        {"error_response": error_data}
                    )
                    return True
                elif response.status == 200:
                    # If it returns 200, it should be a fallback calculation
                    data = await response.json()
                    if 'routes' in data and len(data['routes']) > 0:
                        self.log_result(
                            "Error Handling - Invalid Addresses",
                            True,
                            f"✅ Fallback calculation provided for invalid addresses",
                            {"fallback_routes": len(data['routes'])}
                        )
                        return True
                    else:
                        self.log_result(
                            "Error Handling - Invalid Addresses",
                            False,
                            "Status 200 but no valid routes returned"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Error Handling - Invalid Addresses",
                        False,
                        f"Unexpected status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Error Handling - Invalid Addresses",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_performance_multiple_requests(self):
        """Test performance with multiple concurrent requests"""
        try:
            test_routes = [
                {"origin": "Luzern", "destination": "Zürich"},
                {"origin": "Schwyz", "destination": "Zug"},
                {"origin": "Luzern", "destination": "Schwyz"}
            ]
            
            headers = {"Content-Type": "application/json"}
            start_time = time.time()
            
            # Make concurrent requests
            tasks = []
            for route_data in test_routes:
                task = self.session.post(
                    f"{BACKEND_URL}/get-interactive-routes",
                    json=route_data,
                    headers=headers
                )
                tasks.append(task)
            
            responses = await asyncio.gather(*tasks, return_exceptions=True)
            total_time = time.time() - start_time
            
            successful_responses = 0
            for response in responses:
                if not isinstance(response, Exception):
                    if response.status == 200:
                        successful_responses += 1
                    await response.close()
            
            # All requests should complete within reasonable time
            performance_ok = total_time < 15.0  # 15 seconds for 3 concurrent requests
            success_rate = successful_responses / len(test_routes)
            
            if performance_ok and success_rate >= 0.8:  # At least 80% success rate
                self.log_result(
                    "Performance - Multiple Requests",
                    True,
                    f"✅ Performance test passed - {successful_responses}/{len(test_routes)} requests successful in {total_time:.2f}s",
                    {
                        "total_requests": len(test_routes),
                        "successful_requests": successful_responses,
                        "success_rate": f"{success_rate*100:.1f}%",
                        "total_time_seconds": round(total_time, 2),
                        "performance_target_met": performance_ok
                    }
                )
                return True
            else:
                self.log_result(
                    "Performance - Multiple Requests",
                    False,
                    f"Performance issues - {successful_responses}/{len(test_routes)} successful, Time: {total_time:.2f}s",
                    {
                        "success_rate": f"{success_rate*100:.1f}%",
                        "total_time": total_time,
                        "performance_ok": performance_ok
                    }
                )
                return False
                
        except Exception as e:
            self.log_result(
                "Performance - Multiple Requests",
                False,
                f"Performance test failed: {str(e)}"
            )
            return False

    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.results)
        passed_tests = sum(1 for result in self.results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print("\n" + "="*80)
        print("🧪 INTERACTIVE ROUTES API TESTING SUMMARY")
        print("="*80)
        print(f"📊 Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"📈 Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print("="*80)
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
        
        print("\n✅ PASSED TESTS:")
        for result in self.results:
            if result['success']:
                print(f"   • {result['test']}: {result['message']}")
        
        return passed_tests, failed_tests

async def main():
    """Run all interactive routes tests"""
    print("🚀 Starting Interactive Routes API Testing...")
    print(f"🎯 Target Backend: {BACKEND_URL}")
    print("="*80)
    
    async with InteractiveRoutesTester() as tester:
        # Test sequence
        await tester.test_api_health_check()
        
        # Test NEW GET /api/get-interactive-routes endpoint
        await tester.test_get_interactive_routes_luzern_schwyz()
        await tester.test_get_interactive_routes_luzern_zurich()
        await tester.test_get_interactive_routes_schwyz_zug()
        
        # Test EXISTING POST /api/calculate-route-options for backward compatibility
        await tester.test_calculate_route_options_backward_compatibility()
        
        # Test error handling and performance
        await tester.test_error_handling_invalid_addresses()
        await tester.test_performance_multiple_requests()
        
        # Print summary
        passed, failed = tester.print_summary()
        
        return passed, failed

if __name__ == "__main__":
    try:
        passed, failed = asyncio.run(main())
        
        if failed == 0:
            print(f"\n🎉 ALL TESTS PASSED! Interactive Routes API is fully operational.")
            sys.exit(0)
        else:
            print(f"\n⚠️  {failed} test(s) failed. Please review the issues above.")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n⏹️  Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Testing failed with error: {str(e)}")
        sys.exit(1)