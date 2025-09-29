#!/usr/bin/env python3
"""
Zurich Airport Distance Calculation Test
Focused test for the specific user-reported issue with "Zürich Flughafen" calculations
"""

import asyncio
import aiohttp
import json
from datetime import datetime
import sys
from pathlib import Path

# Test configuration
BACKEND_URL = "https://smarttaxi-system.preview.emergentagent.com/api"

class ZurichAirportTester:
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
    
    async def test_rothenthurm_to_zurich_airport_main(self):
        """CRITICAL TEST: Rothenthurm to Zürich Flughafen - User's main reported issue"""
        try:
            test_data = {
                "origin": "Ausserschwingerstrasse 2, 6418 Rothenthurm, Schweiz",
                "destination": "Zürich Flughafen"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    distance = data['distance_km']
                    origin_resolved = data.get('origin', 'Unknown')
                    destination_resolved = data.get('destination', 'Unknown')
                    calculation_source = data.get('calculation_source', 'unknown')
                    
                    # Expected distance should be ~52-55km (user reported this range)
                    distance_acceptable = 50 <= distance <= 60
                    
                    # Check if destination is properly resolved (not just "Schweiz")
                    destination_properly_resolved = "flughafen" in destination_resolved.lower() or "airport" in destination_resolved.lower()
                    
                    if distance_acceptable and destination_properly_resolved:
                        self.log_result(
                            "CRITICAL - Rothenthurm to Zürich Flughafen",
                            True,
                            f"✅ Distance calculation CORRECT: {distance}km (expected 52-55km range)",
                            {
                                "distance_km": distance,
                                "origin_resolved": origin_resolved,
                                "destination_resolved": destination_resolved,
                                "calculation_source": calculation_source,
                                "total_fare": data.get('total_fare'),
                                "duration_minutes": data.get('estimated_duration_minutes'),
                                "route_info": data.get('route_info', {})
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "CRITICAL - Rothenthurm to Zürich Flughafen",
                            False,
                            f"❌ ISSUE CONFIRMED: Distance {distance}km (expected 52-55km), Destination: '{destination_resolved}'",
                            {
                                "distance_km": distance,
                                "distance_acceptable": distance_acceptable,
                                "destination_resolved": destination_resolved,
                                "destination_properly_resolved": destination_properly_resolved,
                                "calculation_source": calculation_source,
                                "expected_range": "52-55km",
                                "user_issue": "Distance calculation still incorrect"
                            }
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "CRITICAL - Rothenthurm to Zürich Flughafen",
                        False,
                        f"❌ API ERROR: Status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "CRITICAL - Rothenthurm to Zürich Flughafen",
                False,
                f"❌ REQUEST FAILED: {str(e)}"
            )
            return False

    async def test_airport_destination_variations(self):
        """Test various Zurich Airport destination name variations"""
        airport_variations = [
            "Zürich Flughafen",
            "Zurich Airport", 
            "ZUR Airport",
            "Flughafen Zürich",
            "Zurich International Airport"
        ]
        
        origin = "Rothenthurm"
        successful_tests = 0
        test_results = []
        
        for variation in airport_variations:
            try:
                test_data = {
                    "origin": origin,
                    "destination": variation
                }
                
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-price",
                    json=test_data,
                    headers=headers
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        
                        distance = data['distance_km']
                        destination_resolved = data.get('destination', 'Unknown')
                        
                        # Check if distance is in acceptable range (50-60km)
                        distance_ok = 50 <= distance <= 60
                        
                        test_result = {
                            "variation": variation,
                            "distance_km": distance,
                            "destination_resolved": destination_resolved,
                            "distance_acceptable": distance_ok,
                            "status": "✅ PASS" if distance_ok else "❌ FAIL"
                        }
                        test_results.append(test_result)
                        
                        if distance_ok:
                            successful_tests += 1
                            
                        await asyncio.sleep(0.5)  # Brief pause between requests
                        
                    else:
                        test_result = {
                            "variation": variation,
                            "error": f"API Error {response.status}",
                            "status": "❌ FAIL"
                        }
                        test_results.append(test_result)
                        
            except Exception as e:
                test_result = {
                    "variation": variation,
                    "error": str(e),
                    "status": "❌ FAIL"
                }
                test_results.append(test_result)
        
        success_rate = (successful_tests / len(airport_variations)) * 100
        
        if successful_tests >= 3:  # At least 3 out of 5 should work
            self.log_result(
                "Airport Destination Variations",
                True,
                f"✅ {successful_tests}/{len(airport_variations)} airport variations working ({success_rate:.1f}%)",
                {
                    "successful_tests": successful_tests,
                    "total_tests": len(airport_variations),
                    "success_rate": f"{success_rate:.1f}%",
                    "test_results": test_results
                }
            )
            return True
        else:
            self.log_result(
                "Airport Destination Variations",
                False,
                f"❌ Only {successful_tests}/{len(airport_variations)} airport variations working ({success_rate:.1f}%)",
                {
                    "successful_tests": successful_tests,
                    "total_tests": len(airport_variations),
                    "success_rate": f"{success_rate:.1f}%",
                    "test_results": test_results,
                    "issue": "Multiple airport destination formats not resolving correctly"
                }
            )
            return False

    async def test_various_origins_to_zurich_airport(self):
        """Test various Swiss origins to Zurich Airport to verify API consistency"""
        test_origins = [
            {"origin": "Luzern", "expected_range": (45, 70)},
            {"origin": "Zug", "expected_range": (25, 40)},
            {"origin": "Basel", "expected_range": (80, 100)},
            {"origin": "Bern", "expected_range": (100, 130)},
            {"origin": "Schwyz", "expected_range": (40, 60)}
        ]
        
        destination = "Zürich Flughafen"
        successful_tests = 0
        test_results = []
        
        for test_case in test_origins:
            try:
                test_data = {
                    "origin": test_case["origin"],
                    "destination": destination
                }
                
                headers = {"Content-Type": "application/json"}
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-price",
                    json=test_data,
                    headers=headers
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        
                        distance = data['distance_km']
                        min_expected, max_expected = test_case["expected_range"]
                        distance_ok = min_expected <= distance <= max_expected
                        
                        test_result = {
                            "origin": test_case["origin"],
                            "distance_km": distance,
                            "expected_range": f"{min_expected}-{max_expected}km",
                            "distance_acceptable": distance_ok,
                            "destination_resolved": data.get('destination', 'Unknown'),
                            "calculation_source": data.get('calculation_source', 'unknown'),
                            "status": "✅ PASS" if distance_ok else "❌ FAIL"
                        }
                        test_results.append(test_result)
                        
                        if distance_ok:
                            successful_tests += 1
                            
                        await asyncio.sleep(0.5)  # Brief pause between requests
                        
                    else:
                        test_result = {
                            "origin": test_case["origin"],
                            "error": f"API Error {response.status}",
                            "status": "❌ FAIL"
                        }
                        test_results.append(test_result)
                        
            except Exception as e:
                test_result = {
                    "origin": test_case["origin"],
                    "error": str(e),
                    "status": "❌ FAIL"
                }
                test_results.append(test_result)
        
        success_rate = (successful_tests / len(test_origins)) * 100
        
        if successful_tests >= 4:  # At least 4 out of 5 should work
            self.log_result(
                "Various Origins to Zurich Airport",
                True,
                f"✅ {successful_tests}/{len(test_origins)} origin routes working ({success_rate:.1f}%)",
                {
                    "successful_tests": successful_tests,
                    "total_tests": len(test_origins),
                    "success_rate": f"{success_rate:.1f}%",
                    "test_results": test_results
                }
            )
            return True
        else:
            self.log_result(
                "Various Origins to Zurich Airport",
                False,
                f"❌ Only {successful_tests}/{len(test_origins)} origin routes working ({success_rate:.1f}%)",
                {
                    "successful_tests": successful_tests,
                    "total_tests": len(test_origins),
                    "success_rate": f"{success_rate:.1f}%",
                    "test_results": test_results,
                    "issue": "Multiple origin routes to airport showing inconsistent results"
                }
            )
            return False

    async def test_google_maps_api_key_validation(self):
        """Test if Google Maps API key is working and not rate-limited"""
        try:
            # Test with a simple, well-known route
            test_data = {
                "origin": "Luzern",
                "destination": "Zürich"
            }
            
            headers = {"Content-Type": "application/json"}
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=test_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    calculation_source = data.get('calculation_source', 'unknown')
                    route_info = data.get('route_info', {})
                    
                    # Check if it's using Google Maps API (not fallback)
                    using_google_maps = 'google' in calculation_source.lower()
                    has_traffic_info = 'traffic_factor' in route_info
                    
                    if using_google_maps and has_traffic_info:
                        self.log_result(
                            "Google Maps API Key Validation",
                            True,
                            f"✅ Google Maps API working correctly - Source: {calculation_source}",
                            {
                                "calculation_source": calculation_source,
                                "route_info": route_info,
                                "distance_km": data.get('distance_km'),
                                "api_status": "operational"
                            }
                        )
                        return True
                    else:
                        self.log_result(
                            "Google Maps API Key Validation",
                            False,
                            f"❌ Google Maps API may not be working - Source: {calculation_source}",
                            {
                                "calculation_source": calculation_source,
                                "using_google_maps": using_google_maps,
                                "has_traffic_info": has_traffic_info,
                                "route_info": route_info,
                                "possible_issue": "API key invalid or rate limited"
                            }
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Google Maps API Key Validation",
                        False,
                        f"❌ API ERROR: Status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Google Maps API Key Validation",
                False,
                f"❌ REQUEST FAILED: {str(e)}"
            )
            return False

    async def test_direct_google_maps_api_endpoint(self):
        """Test the direct Google Maps API test endpoint"""
        try:
            async with self.session.get(f"{BACKEND_URL}/test-google-maps") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('status') == 'success':
                        self.log_result(
                            "Direct Google Maps API Test",
                            True,
                            f"✅ Google Maps API connection successful: {data.get('message')}",
                            data
                        )
                        return True
                    else:
                        self.log_result(
                            "Direct Google Maps API Test",
                            False,
                            f"❌ Google Maps API connection failed: {data.get('message')}",
                            data
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Direct Google Maps API Test",
                        False,
                        f"❌ API ERROR: Status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Direct Google Maps API Test",
                False,
                f"❌ REQUEST FAILED: {str(e)}"
            )
            return False

    async def run_all_tests(self):
        """Run all Zurich Airport related tests"""
        print("🔍 ZURICH AIRPORT DISTANCE CALCULATION TESTING")
        print("=" * 60)
        print("Testing user-reported issue: Rothenthurm to Zürich Flughafen showing incorrect results")
        print()
        
        # Test results tracking
        test_functions = [
            self.test_direct_google_maps_api_endpoint,
            self.test_google_maps_api_key_validation,
            self.test_rothenthurm_to_zurich_airport_main,
            self.test_airport_destination_variations,
            self.test_various_origins_to_zurich_airport
        ]
        
        passed_tests = 0
        total_tests = len(test_functions)
        
        for test_func in test_functions:
            try:
                result = await test_func()
                if result:
                    passed_tests += 1
                print()  # Add spacing between tests
            except Exception as e:
                print(f"❌ Test {test_func.__name__} failed with exception: {str(e)}")
                print()
        
        # Summary
        print("=" * 60)
        print("🎯 ZURICH AIRPORT TESTING SUMMARY")
        print("=" * 60)
        
        success_rate = (passed_tests / total_tests) * 100
        
        print(f"Tests Passed: {passed_tests}/{total_tests} ({success_rate:.1f}%)")
        print()
        
        # Detailed results
        critical_issues = []
        for result in self.results:
            if not result['success']:
                if 'CRITICAL' in result['test'] or 'Rothenthurm' in result['test']:
                    critical_issues.append(result)
        
        if critical_issues:
            print("🚨 CRITICAL ISSUES FOUND:")
            for issue in critical_issues:
                print(f"   ❌ {issue['test']}: {issue['message']}")
            print()
        
        if passed_tests == total_tests:
            print("✅ ALL TESTS PASSED - Zurich Airport distance calculations working correctly")
        elif passed_tests >= total_tests * 0.8:
            print("⚠️  MOSTLY WORKING - Some minor issues detected")
        else:
            print("❌ MAJOR ISSUES DETECTED - Zurich Airport distance calculations need attention")
        
        return passed_tests, total_tests, self.results

async def main():
    """Main test execution"""
    async with ZurichAirportTester() as tester:
        passed, total, results = await tester.run_all_tests()
        
        # Return results for further processing
        return {
            "passed_tests": passed,
            "total_tests": total,
            "success_rate": (passed / total) * 100,
            "results": results
        }

if __name__ == "__main__":
    asyncio.run(main())