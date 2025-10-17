#!/usr/bin/env python3
"""
Route Options Endpoint Test - Debug /api/calculate-route-options
Testing the dual route calculation feature that's not working in frontend
"""

import asyncio
import aiohttp
import json
import sys
from datetime import datetime
from pathlib import Path

# Test configuration
BACKEND_URL = "https://ride-manager-7.preview.emergentagent.com/api"

class RouteOptionsDebugger:
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
            print(f"   Details: {json.dumps(details, indent=2)}")
    
    async def test_route_options_endpoint_registration(self):
        """Test 1: Check if the endpoint is properly registered and accessible"""
        try:
            # Test with user's specific route: Schwyz to Goldau
            test_data = {
                "origin": "Schwyz",
                "destination": "Goldau"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-route-options",
                json=test_data,
                headers=headers
            ) as response:
                
                response_text = await response.text()
                
                if response.status == 200:
                    try:
                        data = await response.json()
                        self.log_result(
                            "Route Options Endpoint Registration",
                            True,
                            f"Endpoint is accessible and responding (Status: {response.status})",
                            {
                                "response_status": response.status,
                                "response_data": data,
                                "test_route": "Schwyz → Goldau"
                            }
                        )
                        return True, data
                    except json.JSONDecodeError:
                        self.log_result(
                            "Route Options Endpoint Registration",
                            False,
                            f"Endpoint accessible but returned invalid JSON: {response_text}"
                        )
                        return False, None
                elif response.status == 404:
                    self.log_result(
                        "Route Options Endpoint Registration",
                        False,
                        "Endpoint not found (404) - routing issue or endpoint not registered"
                    )
                    return False, None
                elif response.status == 422:
                    self.log_result(
                        "Route Options Endpoint Registration",
                        False,
                        f"Validation error (422): {response_text}"
                    )
                    return False, None
                elif response.status == 500:
                    self.log_result(
                        "Route Options Endpoint Registration",
                        False,
                        f"Internal server error (500): {response_text}"
                    )
                    return False, None
                else:
                    self.log_result(
                        "Route Options Endpoint Registration",
                        False,
                        f"Unexpected status {response.status}: {response_text}"
                    )
                    return False, None
                    
        except Exception as e:
            self.log_result(
                "Route Options Endpoint Registration",
                False,
                f"Request failed: {str(e)}"
            )
            return False, None
    
    async def test_route_options_response_format(self, response_data):
        """Test 2: Validate response format matches expected structure"""
        if not response_data:
            self.log_result(
                "Route Options Response Format",
                False,
                "No response data to validate"
            )
            return False
        
        try:
            # Expected response structure
            expected_fields = [
                'fastest_route',
                'shortest_route', 
                'comparison',
                'recommended_route'
            ]
            
            # Check top-level fields
            missing_fields = [field for field in expected_fields if field not in response_data]
            
            if missing_fields:
                self.log_result(
                    "Route Options Response Format",
                    False,
                    f"Missing required fields: {missing_fields}",
                    {"response_data": response_data}
                )
                return False
            
            # Validate route objects structure
            route_fields = ['distance_km', 'duration_minutes', 'total_fare', 'route_type']
            
            fastest_route = response_data.get('fastest_route', {})
            shortest_route = response_data.get('shortest_route', {})
            
            fastest_missing = [field for field in route_fields if field not in fastest_route]
            shortest_missing = [field for field in route_fields if field not in shortest_route]
            
            if fastest_missing or shortest_missing:
                self.log_result(
                    "Route Options Response Format",
                    False,
                    f"Route objects missing fields - Fastest: {fastest_missing}, Shortest: {shortest_missing}",
                    {
                        "fastest_route": fastest_route,
                        "shortest_route": shortest_route
                    }
                )
                return False
            
            # Validate comparison object
            comparison = response_data.get('comparison', {})
            comparison_fields = ['time_savings_minutes', 'distance_savings_km']
            comparison_missing = [field for field in comparison_fields if field not in comparison]
            
            if comparison_missing:
                self.log_result(
                    "Route Options Response Format",
                    False,
                    f"Comparison object missing fields: {comparison_missing}",
                    {"comparison": comparison}
                )
                return False
            
            self.log_result(
                "Route Options Response Format",
                True,
                "Response format is valid and complete",
                {
                    "fastest_route": {
                        "distance_km": fastest_route.get('distance_km'),
                        "duration_minutes": fastest_route.get('duration_minutes'),
                        "total_fare": fastest_route.get('total_fare')
                    },
                    "shortest_route": {
                        "distance_km": shortest_route.get('distance_km'),
                        "duration_minutes": shortest_route.get('duration_minutes'),
                        "total_fare": shortest_route.get('total_fare')
                    },
                    "recommended_route": response_data.get('recommended_route')
                }
            )
            return True
            
        except Exception as e:
            self.log_result(
                "Route Options Response Format",
                False,
                f"Error validating response format: {str(e)}"
            )
            return False
    
    async def test_google_maps_integration(self):
        """Test 3: Check Google Maps service integration"""
        try:
            # Test Google Maps API connection endpoint
            async with self.session.get(f"{BACKEND_URL}/test-google-maps") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('status') == 'success':
                        self.log_result(
                            "Google Maps Integration",
                            True,
                            "Google Maps API connection is working",
                            data
                        )
                        return True
                    else:
                        self.log_result(
                            "Google Maps Integration",
                            False,
                            f"Google Maps API connection failed: {data.get('message')}"
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Google Maps Integration",
                        False,
                        f"Google Maps test endpoint error {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Google Maps Integration",
                False,
                f"Google Maps integration test failed: {str(e)}"
            )
            return False
    
    async def test_route_options_validation(self):
        """Test 4: Test endpoint validation with invalid data"""
        test_cases = [
            {
                "name": "Missing Origin",
                "data": {"destination": "Goldau"},
                "expected_status": 422
            },
            {
                "name": "Missing Destination", 
                "data": {"origin": "Schwyz"},
                "expected_status": 422
            },
            {
                "name": "Empty Origin",
                "data": {"origin": "", "destination": "Goldau"},
                "expected_status": 422
            },
            {
                "name": "Empty Destination",
                "data": {"origin": "Schwyz", "destination": ""},
                "expected_status": 422
            }
        ]
        
        validation_results = []
        
        for test_case in test_cases:
            try:
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-route-options",
                    json=test_case["data"],
                    headers=headers
                ) as response:
                    
                    if response.status == test_case["expected_status"]:
                        validation_results.append(f"✅ {test_case['name']}")
                    else:
                        response_text = await response.text()
                        validation_results.append(f"❌ {test_case['name']} (got {response.status}, expected {test_case['expected_status']}) - {response_text}")
                        
            except Exception as e:
                validation_results.append(f"❌ {test_case['name']} (error: {str(e)})")
        
        all_passed = all("✅" in result for result in validation_results)
        self.log_result(
            "Route Options Validation",
            all_passed,
            f"Validation tests: {len([r for r in validation_results if '✅' in r])}/{len(validation_results)} passed",
            validation_results
        )
        
        return all_passed
    
    async def test_compare_with_single_route(self):
        """Test 5: Compare route options with single route calculation"""
        try:
            # Test same route with both endpoints
            test_data = {
                "origin": "Schwyz",
                "destination": "Goldau"
            }
            
            headers = {"Content-Type": "application/json"}
            
            # Get single route calculation
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as single_response:
                
                if single_response.status != 200:
                    self.log_result(
                        "Compare with Single Route",
                        False,
                        f"Single route endpoint failed: {single_response.status}"
                    )
                    return False
                
                single_data = await single_response.json()
                
                # Get route options calculation
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-route-options",
                    json=test_data,
                    headers=headers
                ) as options_response:
                    
                    if options_response.status != 200:
                        self.log_result(
                            "Compare with Single Route",
                            False,
                            f"Route options endpoint failed: {options_response.status}"
                        )
                        return False
                    
                    options_data = await options_response.json()
                    
                    # Compare results
                    single_distance = single_data.get('distance_km', 0)
                    single_fare = single_data.get('total_fare', 0)
                    
                    fastest_distance = options_data.get('fastest_route', {}).get('distance_km', 0)
                    fastest_fare = options_data.get('fastest_route', {}).get('total_fare', 0)
                    
                    shortest_distance = options_data.get('shortest_route', {}).get('distance_km', 0)
                    shortest_fare = options_data.get('shortest_route', {}).get('total_fare', 0)
                    
                    # Check if values are reasonable
                    distance_reasonable = (
                        abs(single_distance - fastest_distance) <= single_distance * 0.5 and
                        abs(single_distance - shortest_distance) <= single_distance * 0.5
                    )
                    
                    fare_reasonable = (
                        abs(single_fare - fastest_fare) <= single_fare * 0.5 and
                        abs(single_fare - shortest_fare) <= single_fare * 0.5
                    )
                    
                    if distance_reasonable and fare_reasonable:
                        self.log_result(
                            "Compare with Single Route",
                            True,
                            "Route options results are consistent with single route calculation",
                            {
                                "single_route": {
                                    "distance_km": single_distance,
                                    "total_fare": single_fare
                                },
                                "fastest_route": {
                                    "distance_km": fastest_distance,
                                    "total_fare": fastest_fare
                                },
                                "shortest_route": {
                                    "distance_km": shortest_distance,
                                    "total_fare": shortest_fare
                                }
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Compare with Single Route",
                            False,
                            "Route options results are inconsistent with single route calculation",
                            {
                                "single_route": {
                                    "distance_km": single_distance,
                                    "total_fare": single_fare
                                },
                                "fastest_route": {
                                    "distance_km": fastest_distance,
                                    "total_fare": fastest_fare
                                },
                                "shortest_route": {
                                    "distance_km": shortest_distance,
                                    "total_fare": shortest_fare
                                },
                                "distance_reasonable": distance_reasonable,
                                "fare_reasonable": fare_reasonable
                            }
                        )
                        return False
                        
        except Exception as e:
            self.log_result(
                "Compare with Single Route",
                False,
                f"Comparison test failed: {str(e)}"
            )
            return False
    
    async def test_additional_swiss_routes(self):
        """Test 6: Test additional Swiss routes to verify functionality"""
        test_routes = [
            {"origin": "Luzern", "destination": "Zürich", "name": "Luzern → Zürich"},
            {"origin": "Zug", "destination": "Basel", "name": "Zug → Basel"},
            {"origin": "Bern", "destination": "Genève", "name": "Bern → Genève"}
        ]
        
        successful_routes = 0
        
        for route in test_routes:
            try:
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-route-options",
                    json={"origin": route["origin"], "destination": route["destination"]},
                    headers=headers
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        
                        # Basic validation
                        if ('fastest_route' in data and 'shortest_route' in data and 
                            data['fastest_route'].get('distance_km', 0) > 0 and
                            data['shortest_route'].get('distance_km', 0) > 0):
                            successful_routes += 1
                            
                            self.log_result(
                                f"Additional Route Test - {route['name']}",
                                True,
                                f"Route calculated successfully",
                                {
                                    "fastest_distance": data['fastest_route'].get('distance_km'),
                                    "shortest_distance": data['shortest_route'].get('distance_km'),
                                    "recommended": data.get('recommended_route')
                                }
                            )
                        else:
                            self.log_result(
                                f"Additional Route Test - {route['name']}",
                                False,
                                f"Invalid route data returned: {data}"
                            )
                    else:
                        response_text = await response.text()
                        self.log_result(
                            f"Additional Route Test - {route['name']}",
                            False,
                            f"Route calculation failed ({response.status}): {response_text}"
                        )
                        
            except Exception as e:
                self.log_result(
                    f"Additional Route Test - {route['name']}",
                    False,
                    f"Route test failed: {str(e)}"
                )
        
        success_rate = (successful_routes / len(test_routes)) * 100
        
        self.log_result(
            "Additional Swiss Routes",
            successful_routes == len(test_routes),
            f"Swiss routes test: {successful_routes}/{len(test_routes)} successful ({success_rate}%)",
            {"successful_routes": successful_routes, "total_routes": len(test_routes)}
        )
        
        return successful_routes == len(test_routes)
    
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.results)
        passed_tests = len([r for r in self.results if r['success']])
        failed_tests = total_tests - passed_tests
        
        print("\n" + "="*80)
        print("ROUTE OPTIONS ENDPOINT DEBUG SUMMARY")
        print("="*80)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print("="*80)
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.results:
                if not result['success']:
                    print(f"❌ {result['test']}: {result['message']}")
        
        print("\nDEBUG RECOMMENDATIONS:")
        if failed_tests == 0:
            print("✅ All tests passed - endpoint is working correctly")
        else:
            print("🔍 Check backend logs for detailed error information")
            print("🔍 Verify Google Maps API key and quota")
            print("🔍 Check if google_maps_service.calculate_route_options() method exists")
            print("🔍 Verify endpoint routing in FastAPI server.py")

async def main():
    """Run all route options debug tests"""
    print("Starting Route Options Endpoint Debug Tests...")
    print(f"Testing endpoint: {BACKEND_URL}/calculate-route-options")
    print("User reported route: Schwyz → Goldau")
    print("-" * 80)
    
    async with RouteOptionsDebugger() as debugger:
        # Test 1: Check endpoint registration
        endpoint_working, response_data = await debugger.test_route_options_endpoint_registration()
        
        # Test 2: Validate response format (only if endpoint is working)
        if endpoint_working:
            await debugger.test_route_options_response_format(response_data)
        
        # Test 3: Check Google Maps integration
        await debugger.test_google_maps_integration()
        
        # Test 4: Test validation
        await debugger.test_route_options_validation()
        
        # Test 5: Compare with single route (only if endpoint is working)
        if endpoint_working:
            await debugger.test_compare_with_single_route()
        
        # Test 6: Test additional routes (only if endpoint is working)
        if endpoint_working:
            await debugger.test_additional_swiss_routes()
        
        # Print summary
        debugger.print_summary()

if __name__ == "__main__":
    asyncio.run(main())