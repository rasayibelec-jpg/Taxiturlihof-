#!/usr/bin/env python3
"""
Focused Backend Tests for Review Request
Tests the corrected distance calculation and removed weekend surcharges
"""

import asyncio
import aiohttp
import json
from datetime import datetime

# Test configuration
BACKEND_URL = "https://ride-manager-7.preview.emergentagent.com/api"

class ReviewTester:
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
    
    async def test_reference_route_luzern_zurich_verification(self):
        """Test the reference route Luzern → Zürich as specified in review request"""
        try:
            # Exact test case from review request
            test_data = {
                "origin": "Luzern",
                "destination": "Zürich", 
                "departure_time": "2024-09-08T10:00:00"  # Sunday as specified in review
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
                    total_fare = data['total_fare']
                    base_fare = data.get('base_fare', 6.80)
                    distance_fare = data['distance_fare']
                    route_type = data['route_info'].get('route_type', 'unknown')
                    
                    # Expected results from review request: ~51km, CHF 220.41
                    expected_distance = 51.0
                    expected_total_fare = 220.41
                    
                    # Validate distance accuracy (allow ±1km tolerance)
                    distance_accurate = abs(distance - expected_distance) <= 1.0
                    
                    # Validate total fare (allow ±5 CHF tolerance)
                    fare_accurate = abs(total_fare - expected_total_fare) <= 5.0
                    
                    # Validate no surcharge applied (base + distance only)
                    calculated_total = base_fare + distance_fare
                    no_surcharge = abs(total_fare - calculated_total) < 0.01
                    
                    # Validate highway route type for long distance
                    route_type_correct = route_type == "highway"
                    
                    if distance_accurate and fare_accurate and no_surcharge and route_type_correct:
                        self.log_result(
                            "Reference Route Luzern → Zürich Verification",
                            True,
                            f"✅ REFERENCE ROUTE VERIFIED: {distance}km, CHF {total_fare}, Highway route, No surcharge (Sunday)",
                            {
                                "actual_distance_km": distance,
                                "expected_distance_km": expected_distance,
                                "distance_accuracy": f"±{abs(distance - expected_distance):.1f}km",
                                "actual_total_fare": total_fare,
                                "expected_total_fare": expected_total_fare,
                                "fare_accuracy": f"±CHF {abs(total_fare - expected_total_fare):.2f}",
                                "base_fare": base_fare,
                                "distance_fare": distance_fare,
                                "route_type": route_type,
                                "no_weekend_surcharge": no_surcharge,
                                "sunday_pricing": "Same as weekday pricing",
                                "reference_match": "Matches review expectations"
                            }
                        )
                        return True
                    else:
                        issues = []
                        if not distance_accurate:
                            issues.append(f"Distance {distance}km vs expected {expected_distance}km")
                        if not fare_accurate:
                            issues.append(f"Fare CHF {total_fare} vs expected CHF {expected_total_fare}")
                        if not no_surcharge:
                            issues.append(f"Surcharge detected: {total_fare} ≠ {calculated_total}")
                        if not route_type_correct:
                            issues.append(f"Route type {route_type} vs expected highway")
                        
                        self.log_result(
                            "Reference Route Luzern → Zürich Verification",
                            False,
                            f"❌ REFERENCE ROUTE ISSUES: {'; '.join(issues)}",
                            {
                                "actual_distance_km": distance,
                                "expected_distance_km": expected_distance,
                                "actual_total_fare": total_fare,
                                "expected_total_fare": expected_total_fare,
                                "route_type": route_type,
                                "issues": issues
                            }
                        )
                        return False
                else:
                    response_text = await response.text()
                    self.log_result(
                        "Reference Route Luzern → Zürich Verification",
                        False,
                        f"API returned status {response.status}: {response_text}"
                    )
                    return False
                    
        except Exception as e:
            self.log_result(
                "Reference Route Luzern → Zürich Verification",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_weekend_surcharge_removal_verification(self):
        """Test that weekend surcharges have been completely removed - Sunday vs Monday pricing should be identical"""
        try:
            # Test same route on Sunday vs Monday
            sunday_data = {
                "origin": "Luzern",
                "destination": "Zürich",
                "departure_time": "2024-09-08T10:00:00"  # Sunday
            }
            
            monday_data = {
                "origin": "Luzern", 
                "destination": "Zürich",
                "departure_time": "2024-09-09T10:00:00"  # Monday
            }
            
            headers = {"Content-Type": "application/json"}
            
            # Get Sunday pricing
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=sunday_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    sunday_result = await response.json()
                else:
                    self.log_result(
                        "Weekend Surcharge Removal - Sunday Test",
                        False,
                        f"Sunday API call failed with status {response.status}"
                    )
                    return False
            
            # Get Monday pricing
            async with self.session.post(
                f"{BACKEND_URL}/calculate-price",
                json=monday_data,
                headers=headers
            ) as response:
                
                if response.status == 200:
                    monday_result = await response.json()
                else:
                    self.log_result(
                        "Weekend Surcharge Removal - Monday Test",
                        False,
                        f"Monday API call failed with status {response.status}"
                    )
                    return False
            
            # Compare pricing - should be identical
            sunday_fare = sunday_result['total_fare']
            monday_fare = monday_result['total_fare']
            sunday_distance = sunday_result['distance_km']
            monday_distance = monday_result['distance_km']
            
            # Prices should be identical (no weekend surcharge)
            prices_identical = abs(sunday_fare - monday_fare) < 0.01
            distances_identical = abs(sunday_distance - monday_distance) < 0.01
            
            if prices_identical and distances_identical:
                self.log_result(
                    "Weekend Surcharge Removal Verification",
                    True,
                    f"✅ UNIFORM PRICING CONFIRMED: Sunday CHF {sunday_fare} = Monday CHF {monday_fare} (No weekend surcharge)",
                    {
                        "sunday_total_fare": sunday_fare,
                        "monday_total_fare": monday_fare,
                        "price_difference": abs(sunday_fare - monday_fare),
                        "sunday_distance_km": sunday_distance,
                        "monday_distance_km": monday_distance,
                        "weekend_surcharge_removed": True,
                        "uniform_pricing": "Confirmed - same price regardless of day"
                    }
                )
                return True
            else:
                self.log_result(
                    "Weekend Surcharge Removal Verification",
                    False,
                    f"❌ PRICING INCONSISTENCY: Sunday CHF {sunday_fare} ≠ Monday CHF {monday_fare} (Weekend surcharge still present?)",
                    {
                        "sunday_total_fare": sunday_fare,
                        "monday_total_fare": monday_fare,
                        "price_difference": abs(sunday_fare - monday_fare),
                        "prices_identical": prices_identical,
                        "distances_identical": distances_identical,
                        "issue": "Weekend surcharge may still be applied"
                    }
                )
                return False
                
        except Exception as e:
            self.log_result(
                "Weekend Surcharge Removal Verification",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def test_additional_swiss_routes_consistency(self):
        """Test additional Swiss routes for consistency: Zug → Basel, Schwyz → Luzern, Luzern → Zürich Flughafen"""
        try:
            test_routes = [
                {
                    "name": "Zug → Basel (Inter-city route factor)",
                    "origin": "Zug",
                    "destination": "Basel",
                    "expected_route_type": "highway",
                    "expected_distance_min": 80,
                    "expected_distance_max": 120
                },
                {
                    "name": "Schwyz → Luzern (Suburban route factor)",
                    "origin": "Schwyz", 
                    "destination": "Luzern",
                    "expected_route_type": "inter_city",
                    "expected_distance_min": 25,
                    "expected_distance_max": 40
                },
                {
                    "name": "Luzern → Zürich Flughafen (Highway route factor)",
                    "origin": "Luzern",
                    "destination": "Zürich Flughafen", 
                    "expected_route_type": "highway",
                    "expected_distance_min": 50,
                    "expected_distance_max": 65
                }
            ]
            
            headers = {"Content-Type": "application/json"}
            all_routes_passed = True
            route_results = []
            
            for route in test_routes:
                test_data = {
                    "origin": route["origin"],
                    "destination": route["destination"],
                    "departure_time": "2024-09-09T10:00:00"  # Monday to ensure no surcharge
                }
                
                async with self.session.post(
                    f"{BACKEND_URL}/calculate-price",
                    json=test_data,
                    headers=headers
                ) as response:
                    
                    if response.status == 200:
                        data = await response.json()
                        
                        distance = data['distance_km']
                        route_type = data['route_info'].get('route_type', 'unknown')
                        total_fare = data['total_fare']
                        base_fare = data.get('base_fare', 6.80)
                        distance_fare = data['distance_fare']
                        
                        # Validate distance range
                        distance_valid = route["expected_distance_min"] <= distance <= route["expected_distance_max"]
                        
                        # Validate route type (allow some flexibility)
                        route_type_valid = route_type in [route["expected_route_type"], "inter_city", "highway"]
                        
                        # Validate pricing calculation (base + distance, no surcharges)
                        expected_total = base_fare + distance_fare
                        pricing_valid = abs(total_fare - expected_total) < 0.01
                        
                        route_passed = distance_valid and route_type_valid and pricing_valid
                        
                        if not route_passed:
                            all_routes_passed = False
                        
                        route_results.append({
                            "route": route["name"],
                            "distance_km": distance,
                            "route_type": route_type,
                            "total_fare": total_fare,
                            "base_fare": base_fare,
                            "distance_fare": distance_fare,
                            "distance_valid": distance_valid,
                            "route_type_valid": route_type_valid,
                            "pricing_valid": pricing_valid,
                            "passed": route_passed
                        })
                    else:
                        all_routes_passed = False
                        route_results.append({
                            "route": route["name"],
                            "error": f"API returned status {response.status}",
                            "passed": False
                        })
            
            if all_routes_passed:
                self.log_result(
                    "Additional Swiss Routes Consistency",
                    True,
                    f"✅ ALL ROUTES CONSISTENT: {len(route_results)}/3 routes passed with accurate distances and uniform pricing",
                    {
                        "routes_tested": len(route_results),
                        "routes_passed": len([r for r in route_results if r.get("passed", False)]),
                        "route_details": route_results,
                        "uniform_pricing_confirmed": True,
                        "route_factors_accurate": True
                    }
                )
                return True
            else:
                failed_routes = [r for r in route_results if not r.get("passed", False)]
                self.log_result(
                    "Additional Swiss Routes Consistency",
                    False,
                    f"❌ ROUTE INCONSISTENCIES: {len(failed_routes)}/3 routes failed validation",
                    {
                        "routes_tested": len(route_results),
                        "routes_passed": len([r for r in route_results if r.get("passed", False)]),
                        "failed_routes": failed_routes,
                        "all_route_details": route_results
                    }
                )
                return False
                
        except Exception as e:
            self.log_result(
                "Additional Swiss Routes Consistency",
                False,
                f"Request failed: {str(e)}"
            )
            return False

    async def run_review_tests(self):
        """Run all review-specific tests"""
        print("🎯 REVIEW REQUEST TESTING - Distance Correction & Weekend Surcharge Removal")
        print("=" * 80)
        
        # Test 1: Reference Route Verification (Luzern → Zürich)
        print("\n1️⃣ Reference Route Luzern → Zürich Verification")
        print("-" * 50)
        await self.test_reference_route_luzern_zurich_verification()
        
        # Test 2: Weekend Surcharge Removal Verification
        print("\n2️⃣ Weekend Surcharge Removal Verification")
        print("-" * 50)
        await self.test_weekend_surcharge_removal_verification()
        
        # Test 3: Additional Swiss Routes Consistency
        print("\n3️⃣ Additional Swiss Routes Consistency")
        print("-" * 50)
        await self.test_additional_swiss_routes_consistency()
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 REVIEW TEST SUMMARY")
        print("=" * 80)
        
        passed_tests = [r for r in self.results if r["success"]]
        failed_tests = [r for r in self.results if not r["success"]]
        
        print(f"✅ Passed: {len(passed_tests)}")
        print(f"❌ Failed: {len(failed_tests)}")
        print(f"📈 Success Rate: {len(passed_tests)}/{len(self.results)} ({len(passed_tests)/len(self.results)*100:.1f}%)")
        
        if failed_tests:
            print("\n🔍 FAILED TESTS:")
            for test in failed_tests:
                print(f"   • {test['test']}: {test['message']}")
        
        print("\n📋 KEY FINDINGS:")
        
        # Check specific review requirements
        reference_test = next((r for r in self.results if "Reference Route" in r["test"]), None)
        if reference_test and reference_test["success"]:
            print("   ✅ Reference route Luzern → Zürich: ~51km, CHF 220.41 verified")
        
        surcharge_test = next((r for r in self.results if "Weekend Surcharge" in r["test"]), None)
        if surcharge_test and surcharge_test["success"]:
            print("   ✅ Weekend surcharges completely removed - uniform pricing confirmed")
        
        routes_test = next((r for r in self.results if "Additional Swiss Routes" in r["test"]), None)
        if routes_test and routes_test["success"]:
            print("   ✅ All Swiss routes consistent with corrected route factors")
        
        # Overall assessment
        all_passed = len(failed_tests) == 0
        if all_passed:
            print("\n🎉 REVIEW REQUIREMENTS FULLY SATISFIED!")
            print("   • Distance calculations corrected and accurate")
            print("   • Weekend surcharges completely removed")
            print("   • Uniform pricing across all days confirmed")
            print("   • Route factors provide realistic Swiss distances")
        else:
            print("\n⚠️  REVIEW REQUIREMENTS PARTIALLY SATISFIED")
            print("   • Some issues remain that need attention")
        
        return all_passed

async def main():
    """Main test runner"""
    async with ReviewTester() as tester:
        success = await tester.run_review_tests()
        return success

if __name__ == "__main__":
    asyncio.run(main())